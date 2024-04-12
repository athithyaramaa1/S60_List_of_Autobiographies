const express = require("express");
const app = express();
const { model } = require("./Mongodb");
const cors = require("cors");
app.use(cors());
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

app.put("/putdata/:id", (request, response) => {
  const id = request.params.id;
  model
    .findByIdAndUpdate(
      { _id: id },
      {
        bookName: request.body.bookName,
        author: request.body.author,
        publicationYear: request.body.publicationYear,
        image: request.body.image,
        description: request.body.description,
        rating: request.body.rating,
      }
    )
    .then((data) => response.json(data))
    .catch((err) => response.status(500).json({ error: err }));
});

app.post("/postdata", (request, response) => {
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

module.exports = app;
