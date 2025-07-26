const User = require("../Models/User.js");
const Property = require("../Models/Property.js")

const home = async (req, res) => {
  try {
    const seekerId = req.user.id;

    if (!seekerId) {
      return res.status(200).json({ message: "No such user exists" });
    }

    return res.status(200).json({ message: "User found" });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching the user" });
  }
};

const me = async (req, res) => {
  try {
    const seekerId = req.user.id;
    const info = await User.findById(seekerId);
    if (!info) {
      return res.status(200).json({ message: "No such user exists" });
    }

    return res.status(200).json({ message: "User found", info });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching profile details" });
  }
};

const getAll = async (req, res) => {
  try {
    const allProperties = await Property.find();
    return res.status(200).json({
      message: "All properties fetched successfully",
      properties: allProperties,
    });
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return res.status(500).json({
      message: "Server error while fetching properties",
    });
  }
};

module.exports = { home, me,getAll };
