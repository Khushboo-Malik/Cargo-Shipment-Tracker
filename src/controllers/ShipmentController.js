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

module.exports={
    fetchAllShipments
};