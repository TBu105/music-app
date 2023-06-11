require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//database connect
const connectDB = require("./Database/db");

// route
const userRouter = require("./Route/userRoute");
const authRouter = require("./Route/authRoute");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

//TODO: Ghi console log thông báo cho kết nối DB thành công

const port = 3000 || process.env.PORT;
const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening in ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startApp();
