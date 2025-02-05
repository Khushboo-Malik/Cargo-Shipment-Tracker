require("dotenv").config();
const Shipment = require("../models/ShipmentModel");

async function fetchAllShipments(req, res) {
    try {
        const shipment = await Shipment.find();

        if (!shipment) {
            return res.status(404).json({ message: "No shipment/s found" });
        }

        res.status(200).json({
            message: "All shipment Details fetched successfully",shipment});

    } catch (error) {
        console.error("Error in fetching shipments", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function fetchShipment(req, res) {
    try {
        const id=req.params.shipmentId;
        const shipment = await Shipment.findOne({"shipmentId":id});

        if (!shipment) {
            return res.status(404).json({ message: "No such shipment found" });
        }

        res.status(200).json({
            message: "Shipment Details fetched successfully",shipment});

    } catch (error) {
        console.error("Error in fetching shipment details", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports={
    fetchAllShipments,fetchShipment
};