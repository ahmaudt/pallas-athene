# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

To install, clone the repository to your device and then run `npm install` to install all dependencies.

## Available Scripts

Before starting the application, you should create a db.json file in the root directory that has the following structure:

```
    {
        "students": [],
        "plans": []
    }

```

Once you have created this file, run the following commands to start the app.

```
npm run server
npm start

```

I run Mozilla Developer Edition as my development browser of choice. So, if you prefer Chrome--or another browser--you'll need to change the following line in `package.json`. 

```

"start": "BROWSER='firefox developer edition' react-scripts start",

```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The json server is set to run on port `6001`.

The page will reload when you make changes.\
You may also see any lint errors in the console.

