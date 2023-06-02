const express = require("express");
const app = express();

//install package to replace try catch
require("express-async-errors");

//database connect
const connectDB = require("./Database/db");

//taking .env variable
require("dotenv").config();

const port = 3000 || process.env.PORT;

const startApp = async () => {
  //TODO: Viết console log kết nối DB thành công cho mongoose
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening in ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startApp();
