import mongoose from "mongoose";

// connect to mongoDB database
mongoose
  .connect(`mongodb://localhost:27017/cruddb`)
  .then(() => console.log("Connected to Mongodb server"))
  .catch((err) => console.log("Unable to connect Mongodb server", err));

// creating Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

// creating model
const Person = mongoose.model("Person", personSchema);

export { Person };
