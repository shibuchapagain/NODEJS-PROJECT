const dbConnect = require("./mongodb");

const dbDelete = async () => {
  let result = await dbConnect();
  //   console.log(result);
  let data = await result.deleteOne({ name: "cbu" });
  console.log(data);
};
dbDelete();
