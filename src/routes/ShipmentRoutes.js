const express = require("express");
const router = express.Router();

const fetchAllShipments= require("../controllers/ShipmentController.js").fetchAllShipments;
const fetchShipment= require("../controllers/ShipmentController.js").fetchShipment;


router.get("/shipments",fetchAllShipments);
router.get("/shipment/:shipmentId",fetchShipment);



module.exports=router;
