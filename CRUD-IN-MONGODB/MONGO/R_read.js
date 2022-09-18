const dbConnect = require("./mongodb");
let getData = async () => {
  let result = await dbConnect();
  let data = await result.find().toArray();
  console.log(data);
};
getData();
