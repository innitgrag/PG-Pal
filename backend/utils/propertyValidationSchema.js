const Joi = require("joi");

const propertyValidationSchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().valid("PG", "Flat").required(),
  genderPreference: Joi.string().valid("male", "female", "both").required(),
  roomType: Joi.string().valid("single", "double", "triple").required(),
  monthlyRent: Joi.number().required(),
  securityDeposit: Joi.number().required(),
  availableRooms: Joi.number().required(),
 
  location: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
  }).required(),

  amenities: Joi.object({
    food: Joi.boolean(),
    ac: Joi.boolean(),
    wifi: Joi.boolean(),
    washingMachine: Joi.boolean(),
    attachedWashroom: Joi.boolean(),
    geyser: Joi.boolean(),
    housekeeping: Joi.boolean(),
    powerBackup: Joi.boolean(),
    fridge: Joi.boolean(),
    parking: Joi.boolean(),
  }).required(),
});

module.exports = propertyValidationSchema
