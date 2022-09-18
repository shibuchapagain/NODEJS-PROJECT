const dbConnect = require("./mongodb");
const update = async () => {
  let result = await dbConnect();
  //   console.log(result);
  let data = await result.updateOne(
    { name: "cbu chapagain" },
    { $set: { name: "shawan chapagain", email: "shawan@gmail.com" } }
  );
  console.log(data);
};
update();
