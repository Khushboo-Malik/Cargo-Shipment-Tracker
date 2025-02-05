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

async function createShipment(req, res) {
    try {
        const {
            shipmentId,
            containerId,
            route,
            currentLocation,
            eta,
            status,
            origin,
            destination,
            departureTime,
            transportMode,
            alerts
        } = req.body;

        const existingShipment = await Shipment.findOne({ shipmentId });
        if (existingShipment) {
            return res.status(400).json({ message: "Shipment with this ID already exists" });
        }

        const newShipment = await Shipment.create({
            shipmentId,
            containerId,
            route,
            currentLocation,
            eta,
            status,
            origin,
            destination,
            departureTime,
            transportMode,
            alerts
        });

        res.status(201).json({
            message: "Shipment created successfully",
            shipment: newShipment
        });

    } catch (error) {
        console.error("Error in creating shipment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateShipmentLocation(req, res) {
    try {
        const { shipmentId } = req.params; // Fetch shipmentId from URL
        const { locationName, latitude, longitude } = req.body; // Extract new location details

        // Validate input
        if (!locationName || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Please provide all location details" });
        }

        // Find shipment by shipmentId and update location
        const shipment = await Shipment.findOneAndUpdate(
            { shipmentId },  // Query to match shipmentId field
            {
                $set: {
                    "currentLocation.locationName": locationName,
                    "currentLocation.latitude": latitude,
                    "currentLocation.longitude": longitude,
                    "currentLocation.updatedAt": Date.now(),
                }
            },
            { new: true } // Return updated document
        );

        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" });
        }

        res.status(200).json({
            message: "Shipment location updated successfully",
            shipment
        });

    } catch (error) {
        console.error("Error updating shipment location:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function retrieveEstimatedTime(req, res) {
    try {
        const id = req.params.shipmentId; 
        
        const shipment= await Shipment.findOne({"shipmentId":id});

        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" });
        }
        const eta=shipment.eta;

        if(!eta){
            return res.status(404).json({message:"No eta for the shipment found"});
        }
        res.status(200).json({
            message: "Shipment eta fetched successfully",
            eta
        });
    } catch (error) {
        console.error("Error fetching shipment eta details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports={
    fetchAllShipments,fetchShipment,createShipment,updateShipmentLocation,retrieveEstimatedTime
};