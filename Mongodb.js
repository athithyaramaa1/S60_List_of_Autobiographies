const mongo = require("mongoose");
const autobiographyData = require("./AutobiographyData");
const dotenv = require('dotenv')
dotenv.config()

function server(){
  mongo
  .connect(
    process.env.MONGODB_CONNECTION_STRING
  )
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Error");
  });
}


const autobiographySchema = mongo.Schema({
  bookName: String,
  author: String,
  publicationYear: String,
  image: String,
  description: String,
  rating: String,
});


const Datacenter = mongo.model("database", autobiographySchema);
module.exports = {model:Datacenter, connectdb: server};
