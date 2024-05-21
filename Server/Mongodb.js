const mongo = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function server() {
  mongo
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected");
    })
    .catch(() => {
      console.log("Error");
    });
}

const autobiographySchema = new mongo.Schema({
  bookName: String,
  author: String,
  publicationYear: String,
  image: String,
  description: String,
  rating: String,
  user: {
    type: mongo.Types.ObjectId,
    required: true,
    ref: "User Information",
  },
});

const userSchema = mongo.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
});

const Datacenter = mongo.model("database", autobiographySchema);
const userModel = mongo.model("User Information", userSchema);
module.exports = { model: Datacenter, connectdb: server, usermodel: userModel };
