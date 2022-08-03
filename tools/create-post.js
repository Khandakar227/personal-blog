//@ts-check
const fs = require("fs");
const path = require("path");

const post_title = process.argv[2];
const post_dir = path.join(process.cwd(), "src/pages/post");
const public_posts_dir = path.join(process.cwd(), "public/posts");

const content = 
`---
layout: ../../layouts/PostLayout.astro
title: ${post_title}
description:
author: Khandakar Shakib
date: ${(new Date()).toLocaleDateString()}
image: 
category: 
tags:
draft: false
---
`

//Create a page...
console.log("Creating a markdown page ", `${post_title.replace(/[" "]/g, "-")}.md`);
//Check if the directories exist
if (!fs.existsSync(post_dir)) {
  console.log("Error: post directory does not exist inside ./src/pages");
  process.exit(1);
}
if (!fs.existsSync(public_posts_dir)) {
    console.log("Error: public directory does not exist");
    process.exit(1);
}

//Check if the same post exist
const post_path = path.join(post_dir, `${post_title.replace(/[" "]/g, "-")}.md`);
if (fs.existsSync(post_path)) {
    console.log("Error: post with same title already exist!")
    process.exit(1);
}

/**
 * @type {import("fs").WriteFileOptions}
 */
const options = {}

fs.writeFileSync(post_path, content, options);

console.log("Created", `${post_title.replace(/[" "]/g, "-")}.md`)


//Create posts assets folder on public directory...
console.log("Creating an asset folder ", `${post_title.replace(/[" "]/g, "-")}`);

fs.mkdirSync(path.join(public_posts_dir,`${post_title.replace(/[" "]/g, "-")}`));

console.log("Created an asset folder ", `${post_title.replace(/[" "]/g, "-")}`);
