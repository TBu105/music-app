require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const path = require("path");

console.log(cloudinary.config().cloud_name);
console.log(path.resolve("./Bo.jpg"));

const imagePath = path.join("../res/image" + )

cloudinary.uploader
  .upload(path.resolve("./image/Bo.jpg"), {
    resource_type: "image",
  })
  .then((result) => console.log("success", JSON.stringify(result, null, 2)))
  .catch((error) => {
    console.log("error", JSON.stringify(error, null, 2));
  });
