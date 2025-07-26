const propertyValidationSchema = require("../utils/propertyValidationSchema.js");
const Property = require("../Models/Property.js");
const User = require("../Models/User.js");

const profile = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const info = await User.findById(ownerId); // ownerId not key

    return res
      .status(200)
      .json({ message: "Profile shown successfully", info });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching profile details" });
  }
};

const dashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const allProperty = await Property.find({ ownerId });
    return res.status(200).json({
      message: "All properties fetched successfully",
      properties: allProperty,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching properties" });
  }
};

const addProperty = async (req, res) => {
  try {
    const { error } = propertyValidationSchema.validate(req.body);
    if (error) {
      console.log("Validation Error:", error.details);
      return res.status(400).json({ message: error.details[0].message });
    }


    const ownerId = req.user.id;
    const ownerProperty = new Property({
      ...req.body,
      ownerId
    });
    const savedProperty = await ownerProperty.save();
    return res
      .status(200)
      .json({ message: "All properties added successfully", savedProperty });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while adding properties" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const propertyId = req.params._id;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Not your property" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      req.body,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Property updated", updatedProperty });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const propertyId = req.params.id;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId.toString() !== ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Not your property" });
    }

    await Property.findByIdAndDelete(propertyId);

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("Error deleting property:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  profile,
  dashboard,
  addProperty,
  updateProperty,
  deleteProperty,
};
