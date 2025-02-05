const express = require("express");
const router = express.Router();

const fetchAllShipments= require("../controllers/ShipmentController.js").fetchAllShipments;
const fetchShipment= require("../controllers/ShipmentController.js").fetchShipment;
const createShipment= require("../controllers/ShipmentController.js").createShipment;
const updateShipmentLocation= require("../controllers/ShipmentController.js").updateShipmentLocation;
const retrieveEstimatedTime= require("../controllers/ShipmentController.js").retrieveEstimatedTime;

router.get("/shipments",fetchAllShipments);
router.get("/shipment/:shipmentId",fetchShipment);
router.post("/shipment",createShipment);
router.patch("/shipment/:shipmentId/update-location",updateShipmentLocation);
router.get("/shipment/:shipmentId/eta",retrieveEstimatedTime);


module.exports=router;
