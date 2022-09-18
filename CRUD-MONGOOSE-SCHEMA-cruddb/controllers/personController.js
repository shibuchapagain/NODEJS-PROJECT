import { Person } from "../modal/person.js";

const getAllRecord = async (req, res) => {
  const person = await Person.find();
  res.status(200).send({
    status: true,
    message: "Here is your data",
    data: person,
  });
};

const getSpecificId = async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  if (!person) {
    res.status(400).send({
      status: false,
      message: "Couldnot get id",
    });
  } else {
    res.status(200).send({
      satus: true,
      data: person,
    });
  }
};

const createNewRecord = async (req, res) => {
  const person = new Person(req.body);
  person
    .save()
    .then((data) => {
      res.status(201).send({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        satus: false,
        message: err,
      });
    });
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body);
  await Person.findByIdAndUpdate(id, req.body)
    .then((data) => {
      res.status(201).send({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err,
      });
    });
};

export { getAllRecord, getSpecificId, createNewRecord, updateRecord };
