const express = require("express");
const app = express();
const { model } = require("./Mongodb");

app.use(express.json());

app.get("/getdata", (request, response) => {
  model
    .find({})
    .then((arr) => {
      response.json({ arr }); 
    })
    .catch((err) => {
      response.status(500).json({ error: err }); 
    });
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
