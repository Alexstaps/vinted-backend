const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const signupRoutes = require("./Routes/signup");
const loginRoutes = require("./Routes/login");
const publishRoutes = require("./Routes/publish")

app.use(signupRoutes);
app.use(loginRoutes);
app.use(publishRoutes);


app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
    console.log("serveur started");
});

