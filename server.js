const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routes = require('./routes')

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log('connected to DB');
  } catch (err) {
    console.log('error on connecting', err.message);
  }
};
app.get("/", (req, res) => {
  res.send("Go to the ping route!");
});

app.get("/ping", (req, res) => {
  res.send("Hello List of Autobiographies!!");
});

app.use('/', routes)

app.listen(3000, async () => {
  console.log("We're in port 3000");
  await ConnectDB()
});