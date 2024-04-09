const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const routes = require("./routes");
const { connectdb, model } = require("./Mongodb");

app.use("/", routes);

function getStatus() {
  return mongoose.connection.readyState === 1;
}

app.get("/", (req, res) => {
  const checkconnection = getStatus();
  let condition = checkconnection
    ? "Connected Correctly"
    : "You failed to connect";
  res.send("Go to the ping route! " + condition);
});

app.get("/ping", (req, res) => {
  res.send("Hello List of Autobiographies!!");
});

app.listen(3000, () => {
  console.log("We're in port 3000");
  connectdb();
}); 
