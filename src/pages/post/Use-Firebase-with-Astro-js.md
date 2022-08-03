---
layout: ../../layouts/PostLayout.astro
title: Use Firebase with Astro js
description:
author: Khandakar Shakib
date: 03/08/2022
image: /posts/Use-Firebase-with-Astro-js/Cover.png
category: Web dev
tags:
  - Firebase
  - Astro
  - noSSR
draft: false
---

## Introduction

Firebase is a cloud-hosted database that makes it easy to build apps with realtime features like push notifications and authentication.
Astro is a static site generator that allows you to quickly create sites with your favourite framework (React, Vue, Angular, Svelte etc.).
It tries to ship less javascript as much as possible giving your end user a blazingly fast website. We can use firebase to add authentication feature like log in, sign up
to our astro site. Astro leverages server-side rendering. However, the Firebase module (not admin-sdk) does not work well when server-side rendered. In this tutorial I am going to show you how to integrate Firebase with Astro.

## Table of contents
1. [Prerequisites](#prerquisites)
2. [Set up your firebase project.](#set-up-your-firebase-project)
3. [Set up your Astro site](#set-up-your-astro-site)
4. [Configure `astro.config.js`](#configure-astroconfigmjs)
5. [Write some code](#write-some-code)



## Prerquisites
1. Basic understanding of Firebase. (Check [Firebase](https://firebase.google.com/docs/) documentation)
2. Some basic idea about Astro. (Visit: [Astro's official documentation](https://docs.astro.build/))


## Set up your Firebase project
Go to https://firebase.google.com create an account if you don't have one already. Go to console and create a new project.
Click on **Preoject Settings** and copy your **firebaseConfig**.


## Set up your Astro site


## Configure `astro.config.mjs`


## Write some code
