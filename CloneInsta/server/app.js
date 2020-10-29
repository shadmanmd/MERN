const express = require("express");
const app = express();
const PORT = 5000;

const customMiddleware = (req, res, next) => {
  console.log("Middleware executed!");
  next();
};

// app.use(customMiddleware);

app.get("/", customMiddleware, (req, res) => {
  console.log("Inside GET route");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
