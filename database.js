import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

mongoose.connect(mongodb_uri);

const database = mongoose.connection;

database.on("error", () => console.log("connection error:"));

database.once("connected", () => {
  console.log("Connected to MongoDB");
});
