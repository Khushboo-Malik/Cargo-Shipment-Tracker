const express = require("express");
const router = express.Router();

const fetchAllShipments= require("../controllers/ShipmentController.js").fetchAllShipments;


router.get("/shipments",fetchAllShipments);

module.exports=router;
