const dbConnect = require("./mongodb");

const insert = async () => {
  let result = await dbConnect();
  let data = await result.insertOne({
    name: "cbu",
    email: "cbu@gmail.com",
  });
  console.log(data);
};
insert();
