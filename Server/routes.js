const express = require("express");
const app = express();
const { model, usermodel } = require("./Mongodb");
const joiSchema = require("./Schema");
const joi = require("joi");
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

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

app.get("/getid/:id", async (request, response) => {
  const id = request.params.id;
  try {
    let data = await model.find({ _id: id });
    console.log(data);
    return response.send(data);
  } catch (er) {
    response.status(500).json({ error: er.message });
  }
});

app.put("/putdata/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const updatedData = await model.findByIdAndUpdate(
      id,
      {
        bookName: request.body.bookName,
        author: request.body.author,
        publicationYear: request.body.publicationYear,
        image: request.body.image,
        description: request.body.description,
        rating: request.body.rating,
      },
      { new: true }
    );
    response.json(updatedData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/postdata", (request, response) => {
  const { error, value } = joiSchema.validate(request.body);
  if (error) {
    console.log(error.message);
    return response.json({
      error: "Error!!! Validation failed. Data cannot be posted",
    });
  }
  model
    .create(request.body)
    .then((data) => response.json(data))
    .catch((err) => response.status(500).json({ error: err }));
});

app.delete("/deletedata/:id", (request, response) => {
  const id = request.params.id;
  model
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        return response.status(404).json({ error: "Document not found" });
      }
      response.json(data);
    })
    .catch((error) => response.status(500).json({ error: error }));
});

app.post("/signup", (request, response) => {
  usermodel
    .create(request.body)
    .then((users) => response.json(users))
    .catch((err) => response.json(err.message));
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  console.log(email, password, "temp");

  try {
    const user = await usermodel.findOne({ email });

    if (!user) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    if (password !== user.password) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    return response.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
});
module.exports = app;
