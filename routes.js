const express = require("express");
const app = express();

app.get("/getdata", (request, response) => {
  response.send("Get request is done successfully");
});

app.put("/putdata/:id", (request, response) => {
  response.send("Put request is done successfully");
});

app.post("/postdata", (request, response) => {
  response.status(201).send("Post request is done successfully");
});

app.delete("/deletedata/:id", (request, response) => {
  response.send("Delete request is done successfully");
});

module.exports = app;