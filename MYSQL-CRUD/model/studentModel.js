const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    maxLength: 15,
    minLength: 4,
  },
  email: {
    type: String,
    trim: true,
    minLength: 8,
    unique: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
