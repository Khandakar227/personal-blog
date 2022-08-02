---
layout: ../../layouts/PostLayout.astro
title: Full text search API using google sheets
author: Khandakar Shakib
date: 03/08/2022
image: /posts/Full-text-search.png
category: Web dev
tags:
- googlesheet
- express
- api
draft: false
---

## Introduction

Full-text search usually refers to the technique of searching a single table, or an index created from one or more tables, of text data. For example, a user may be looking for all documents that contain the word "dog" but not the word "cat". It is a very essential feature for most websites and apps (Mostly ecommerce and blogging platform).
You can use google sheet as your database and and full text search feature with the power of google's query language feature. Number one benefit is that it's **free**.
It supports millions of rows. The API limit is **400 request per 100 seconds**. If you need more you can always increase your quota. It's great for small and medium scale application.

## Table of contents
1. [Authenticating your google sheet API](#authenticating-your-google-sheet-api)
2. [Create a spreadsheet in google sheets](#create-a-spreadsheet-in-google-sheets)
3. [Setup your project structures and install dependencies](#setup-your-project-structures-and-install-dependencies)
4. [Write some codes](#write-some-codes)



## Authenticating your google sheet API

1. Go to [google cloud console](https://console.cloud.google.com). In the navigation menu go to **IAM & Admin** > **Service Accounts**

![Go to IAM & Admin > Service Accounts](/posts/go_to_iam&admin.png)

2. Create a Service Account by going to the Create service account key page in GCP console.
A service account is an identity with permission scopes that you can use to access GCP resources from your apps.

![Create a service account](/posts/create_sa.png).

You can create this service account inside of an existing project or choose one of your existing projects here. For now, click on Select a project, then enter your desired project name and make sure you are using a G Suite domain email address, then click on Create. Leave **JSON as the Key type**, then click on **Create.**

3. Search for Google Sheet API. **Enable** it and wait for a few seconds it will redirect you to **api & services**.
<!-- 
![Search for Google sheet api](/posts/search_gsa.png) -->

![Enabling Sheet API](/posts/enable.png)

4. From there go to Credentials. Click on your service account.

![Select a service account](/posts/click_sa.png)

5. Click **on add key** > **Create new key**. Your authentication credentials will be downloaded (which is a JSON file).
Your credentials file (JSON) will be downloaded to your computer, remember where you saved it for later use.
***Keep it private.*** It is a super secret file that should not be in public. 

![Add a key](/posts/add_key.png)

6. Copy the **client_email** and **private_key** value to your ***.env***  file.


```
CLIENT_EMAIL = YOUR GSA CLIENT EMAIL
PRIVATE_KEY = YOUR GSA PRIVATE KEY
```

## Create a spreadsheet in google sheets

1. Go to [https://docs.google.com/spreadsheets/](https://docs.google.com/spreadsheets/).
2. Create a blank spreadsheet add some data in to your sheet. (You can use **[this](https://github.com/khandakar227/)** as sample data. It is a csv file of some bengali movies collected from IMDB ).
3. Copy the **spreadsheet id** from the **URL** and add it to your **.env** file.
Spreadsheet id is something like this `https://docs.google.com/spreadsheets/d/`***SPREADSHEET ID***`/edit#gid=`***SHEET ID***`

```
SPREADSHEETID = ID of the spreadsheet
```

**Example:** `https://docs.google.com/spreadsheets/d/10pTx2OV7a80GrhZUQM_bxN3VST5Nd2yEGvEDCO/edit#gid=0`
4. Click on **Share** Button. Add your **CLIENT EMAIL** with the role of **Editor** (Default is viewer). Then click on **Done**.


## Setup your project structures and install dependencies

You can follow along the tutorial or clone this **[repo](https://github.com/Khandakar227/Google-sheet-API-full-text-search)**.
1. Create a new directory (eg: ***full-text-search-api***).
2. Open up your terminal. run **`npm init -y`**.
3. Create **`index.js`**.
4. Create directory named **`handlers`**, **`api`** and **`lib`**.
5. In your `lib` directory add **`index.js`**. Add **`movies.js`** in **`api`** and **`movieHandler.js`** inside **`handlers`**.
6. Install these dependencies.
```
npm i express googleapis axios cors dotenv papaparse
npm i -D  nodemon
```

## Write some codes
1. Firstly add `"type": "module",` in your package.json in order to use ES6 syntax. It's totally optional. If you don't make sure you change import with **require** syntax.
2. Open your **index.js**. This will be our main entry point. Setup your express server.
```js
import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
//For using environmentlib/index.js variables
config();

const app = express();
app.use(json());
app.use(cors());

const port = process.env.API_PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```
3. In the **lib/index.js**, we are going to create a function that will retrieve documents from a sheet. Let's call it `getSheetData`. Firstly, import all required modules.

```js
import { google } from "googleapis";
import axios from "axios";
import Papa from "papaparse";

//GOOGLE API SETUP
const spreadsheetId = process.env.SPREADSHEETID;
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY?
.replace(/\\n/g, "\n"); //Don't forget to replace stringified \n
```
The function will take two arguements `tableQuery` and `googleSheetOptions`. `tableQuery` is a query language string. Quite similar to SQL queries.


example: `Select A, B, C Where A contains 'cat' or C contains 'cat'`

`A`, `B` and `C` are column ids in Google sheet. `Limit` is a reserved keyword in query language.

To add dynamic parameters:
`Select A, B, C Where A contains '${params}' or C contains '${params}'`

`googleSheetOptions` is an object consisting `spreadsheetId`, `clientEmail`, `privateKey` and `sheetId`.

For more information about google sheets query language: **[visit](https://developers.google.com/chart/interactive/docs/querylanguage)**

```js
export const getSheetData = async (tableQuery = 'Select A, B, C Limit 10',
    googleSheetOptions = { spreadsheetId: spreadsheetId, clientEmail: clientEmail, privateKey: privateKey, sheetId: 2067756176 }) => {
        // Rest of  the code
    }
```

Inside of the function authorize your spreadsheet using `google.auth.JWT()`.

```js
const gAuth = new google.auth.JWT(
        googleSheetOptions.clientEmail,
        undefined,
        googleSheetOptions.privateKey,
        ["https://www.googleapis.com/auth/spreadsheets"] //Scopes as an array
        );
```

Then get the authorization header using `getRequestHeaders` method.

```js

const authorization = await gAuth.getRequestHeaders();

```

Now send a request to your spreadSheet URL using axios.request.

```js
let options = {
    url: `https://docs.google.com/spreadsheets/d/${googleSheetOptions.spreadsheetId}/gviz/tq`,
    params: {
        tq: tableQuery,
        gid: googleSheetOptions.sheetId,
        tqx: "out:csv" //Returns csv formatted data
    },
    method: "get",
    headers: authorization
};

const { data } = await axios.request(options);
```
**tqx** is a set of colon-delimited key/value pairs for standard or custom parameters. Pairs are separated by semicolons. 
`"out:csv"` is string describing the format for the returned data which is csv.

parse the csv data with `Papa.parse()`.
```js
const { data: parsedData, errors } = Papa.parse(data, { dynamicTyping: true, header: true })
```

Here's a full written, polished function.

```js
/**
 * 
 * @param {string} tableQuery Query language string. Quite similar to SQL queries.
 * example: \
 ``` Select A, B, C Limit 10 ``` \
 * A, B & C are column ids in Google sheet. Limit is a reserved keyword in google query language. \
 For adding parameters dynamically: \
 ``` Select A, B, C Where A contains '${params}' or C contains '${params}' ``` \
 ``` Where B contains '${params}' ``` \
 * For more information: [https://developers.google.com/chart/interactive/docs/querylanguage](https://developers.google.com/chart/interactive/docs/querylanguage)
 * 
 * @param {any} googleSheetOptions 
 * @returns {Promise<any>}
 */

export const getSheetData = async (tableQuery = 'Select A, B, C Limit 10',
    googleSheetOptions = { spreadsheetId: spreadsheetId, clientEmail: clientEmail, privateKey: privateKey, sheetId: 2067756176 }) => {
    // Authorize your spreadsheet with the given credentials
    const gAuth = new google.auth.JWT(
        googleSheetOptions.clientEmail,
        undefined,
        googleSheetOptions.privateKey,
        ["https://www.googleapis.com/auth/spreadsheets",])

    const authorization = await gAuth.getRequestHeaders();

    let options = {
        url: `https://docs.google.com/spreadsheets/d/${googleSheetOptions.spreadsheetId}/gviz/tq`,
        params: {
            tq: tableQuery,
            gid: googleSheetOptions.sheetId,
            tqx: "out:csv" //Returns csv formatted data
        },
        method: "get",
        headers: authorization
    };

    try {
        const { data } = await axios.request(options);
        if (data.length) {
            //Parse csv data to json
            const { data: parsedData, errors } = Papa.parse(data, { dynamicTyping: true, header: true })

            if (errors) {
                console.log(errors);
            }
            return parsedData
        }
        else {
            return data
        }
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}
```

4. Go to **handlers/movieHandlers.js**. Use the **getSheetData** function to retrieve data inside route handler.

```js
import { getSheetData } from "../lib/index.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
const handler = (req, res, next) => {
    try {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

        //searched keyword
        const { search } = req.query;
        // A, B, C are the column id from google spreadsheet. You can add more or less according to your data.
        const query = `Select A, B, C Where LOWER(A) contains LOWER('${search}') or LOWER(C) contains LOWER('${search}') `;

        getSheetData(query).then((data) => {
            res.status(200).json( data );
        });

    } catch (error) {
        console.log(error);
        res.json({ error: err.message }).status(500);
    }
}

export default handler;
```

5. We're almost done. import movieHandler inside of **api/movies.js** and add movies route in yourentry point **index.js**.

```js
//api/movies.js
import express from 'express';
import handler from "../handlers/moviesHandler.js";

const router = express.Router();

router.get("/", handler);

export default router;
```
Index.js

```js
// /index.js
import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
```

```diff
+import product from "./api/movies.js";
```
```js
config();

const app = express();
app.use(json());
app.use(cors());

const port = process.env.API_PORT || 8080;
```
```diff
+app.use("/api/movies", product);
```
```js
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

7. Finally add `"main": "index.js",` and `"start": "nodemon ."` inside `scripts` property.
8. Run `npm run start` in your terminal.
9. Open your browser. Go to `http://localhost:8080/movies?keyword=`**`ANY KEYWORD`**

## Conclusion
That's it. Congradulation, with this you finally got the idea of how to build full text search API with google sheets.
