const mongo = require("mongoose");
const autobiographyData = require("./AutobiographyData");

mongo
  .connect(
    "mongodb+srv://athithyaramaa:athithya1@asapmongodb.qnsnqcs.mongodb.net/?retryWrites=true&w=majority&appName=ASAPMongoDB"
  )
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Error");
  });

const autobiographySchema = mongo.Schema({
  bookName: String,
  author: String,
  publicationYear: String,
  image: String,
  description: String,
  rating: String,
});


const Datacenter = mongo.model("database", autobiographySchema);
module.exports = Datacenter;
