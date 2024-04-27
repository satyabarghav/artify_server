const Product = require("../models/Product");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const uploadImage = require("../upload");
const { default: mongoose } = require("mongoose");
const fs = require("fs").promises;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Use original filename with a timestamp
  },
});

// Initialize Multer upload
const upload = multer({ storage: storage }).single("image"); // Use single file upload

const listItems = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(400).json({ message: "Error uploading image" });
      }

      // Check if req.file exists and contains the uploaded file
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { name, artist, price, description, category, subcategory } =
        req.body;
      const email = req.body.email;
      console.log(req.body);
      console.log(email);
      const user = await User.findOne({ email: email });

      const imageUrlInCloud = await uploadImage(
        req.file.path,
        "Artify",
        req.file.name
      ); // Path of the uploaded image

      const product = await new Product({
        name: name,
        artist: artist,
        price: price,
        image: imageUrlInCloud,
        description: description,
        category: category,
        subcategory: subcategory,
        user: user._id,
      }).save();
      await fs.unlink(req.file.path);

      res.status(200).json({ message: "Product created successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const getItems = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get products" });
  }
}

module.exports = { listItems,getItems };
