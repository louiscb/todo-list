# To-do list application

This is a straight forward to-do list app.

## Installation

The app requires node, npm and mongoDB.

You can install node and npm [here](https://www.npmjs.com/get-npm).

Install mongoDB [here](https://docs.mongodb.com/manual/installation/).

## How to run

First the mongo daemon needs to running.

On UNIX systems this is accomplished with `mongod --config /usr/local/etc/mongod.conf`

The app assumes the use of the default mongoDB port 27017. This can be changed in the `app.js` file.

Then run `npm install` to install all the appropriate packages.

Once everything is installed run `npm start` or `nodemon start` to begin the application. Then navigate to `localhost:3000` to use the application.

## How to test

To test type `npm test`. The app will run through several tests for the RESTful API.

## Logging

This application uses [Winston](https://github.com/winstonjs/winston) for the logging. Logs appear in the `logs/app.log` file. The verboseness of the logs and amount can be configured in the `config/winston.js` file.

## Debugging

In order to debug the API a useful application is [Postman](https://www.getpostman.com/). Allows you to send custom HTTP requests to the application.