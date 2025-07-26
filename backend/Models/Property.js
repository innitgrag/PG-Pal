const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    type: { type: String, enum: ["PG", "Flat"], required: true },
    genderPreference: {
      type: String,
      enum: ["male", "female", "both"],
      required: true,
    },
    roomType: { type: String, enum: ["single", "double","triple"], required: true },
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    location: {
      address: String,
      pincode: String,
      city: String,
      state: String,
      extraInfo: String,
    },
    amenities: {
      food: Boolean,
      ac: Boolean,
      wifi: Boolean,
      washingMachine: Boolean,
      attachedWashroom: Boolean,
      fridge: Boolean,
      powerBackup: Boolean,
      geyser: Boolean,
      parking: Boolean,
      housekeeping: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
