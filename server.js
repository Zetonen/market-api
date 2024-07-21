import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST } = process.env;
console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Example app listening on port 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
