const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
  },
  containerId: {
    type: String,
    required: true,
  },
  route: [
    {
      locationName: { type: String, required: true },
    },
  ],
  currentLocation: {
    locationName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  eta: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered", "Delayed", "Cancelled"],
    default: "Pending",
  },
  origin: {
    locationName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  destination: {
    locationName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  departureTime: {
    type: Date,
    required: true,
  },
  transportMode: {
    type: String,
    enum: ["Air", "Sea", "Rail", "Road"],
    required: true,
  },
  alerts: [
    {
      type: {
        type: String,
        enum: ["Delay", "Route Change", "Custom"],
        required: true,
      },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
