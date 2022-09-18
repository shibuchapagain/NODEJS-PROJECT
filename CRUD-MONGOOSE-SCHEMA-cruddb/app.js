import express from "express";
import router from "./routes/personRoutes.js";
const app = express();

// middlewares
app.use(express.json());

// routes middleware
app.use("/", router);

// listening
app.listen(8000, () => {
  console.log("Server at 8000");
});
