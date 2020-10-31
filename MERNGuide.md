# Step by step MERN Guide by Md Shadman

From your terminal, go to the folder in which you want to create the backend app and execute the following

```javascript
npm init
```

Just press enter in all that comes, for further details refer to this [tutorial](http://expressjs.com/en/starter/installing.html).

## Express

In the same terminal, now execute the following

```javascript
npm install express --save
```

This installs express in the app.

To check whether everything is working fine we will run a Hello World from our Node + Express server, we are following the steps mentioned [here](http://expressjs.com/en/starter/hello-world.html), but you can follow along with this tutorial as well.

Just create a file named app.js inside the same folder you were in and type or copy paste the following

```javascript
const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
```

## Understanding Middlewares

We will design a simple middleware for understanding how it works.

_Middleware is some code which takes the incoming request and modifies it before it reaches the actual route handler._
Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next function in the application's request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

An example of a simple middleware which can be written with the _hello world_ code above is shown here

```javascript
const customMiddleware = (req, res, next) => {
  console.log("Middleware executed!");
  next();
};
```

If we want to execute the middleware whenever we go to any page we can write this _after middleware_ and _before an route_.

```javascript
app.use(customMiddleware);
```

Generally, we don't want the middleware to work for all routes, so for specific routes we can just write the name of the middleware as a second argument in the route handler.

```javascript
app.get("/", customMiddleware, (req, res) => {
  console.log("Inside GET route");
  res.send("Hello World");
});
```

The output in the console would be

```
Server is running on 5000
Middleware executed!
Inside GET route
```

## MongoDB Cloud

We will use [MongoDB Atlas](cloud.mongodb.com) as our database backend.

- Sign in
- Create a New Project
- Create a New cluster
- Click on "Connect"
- Set Connection Security as "Allow access from anywhere"
- Choose the 2nd connection method i.e. "Connect your application to your cluster using MongoDB's native drivers"
- Copy the URL
- Store this URL as an environment variable or in a file which you must 'gitignore' (I've used keys.js as the ignored file)

From the terminal install a package

```
npm install mongoose
```

Now use the below code for establishing a connection between the database server and the Node server.

```javascript
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting", err);
});
```

For a clear idea of the MONGOURI variable in the above code, here is the keys.js file

```javascript
module.exports = {
  MONGOURI: "Paste your URI from MongoDB Atlas here",
};
```
