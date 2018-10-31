# bipolar-mood-tracker

Track your daily mood, sleep patterns, medications, self-care and diet related to bipolar 1 and 2 plus depression and anxiety.

## How to use on localhost

$: npm install

[Create Firestore project](https://firebase.google.com/docs/firestore/quickstart)

Update Firebase config in firebase/firebase-project-config.js

$: npm start

## How to deploy to firebaseapp.com

$: npm run firebase-init

**Which Firebase CLI features do you want to setup for this folder?**
(*) Hosting: Configure and deploy Firebase Hosting Sites

**What do you want to use as your public directory? (public)**
dist

**Configure as a single-page app?**
y

$: npm run deploy