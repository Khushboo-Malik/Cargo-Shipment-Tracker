require("dotenv").config();

const cors = require("cors");
const mongoose=require("mongoose");
const express = require("express");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const shipmentRoutes = require("./src/routes/ShipmentRoutes.js");

connectMongoDb(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"));


app.use("/",shipmentRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}!`));