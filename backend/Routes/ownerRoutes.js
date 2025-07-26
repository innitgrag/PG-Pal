const express = require('express')
const router = express.Router();
const authCheck = require('../Middlewares/authMiddleware.js')
const roleCheck = require('../Middlewares/roleMiddleware.js')
const {profile ,dashboard , addProperty , updateProperty,deleteProperty} = require('../Controllers/ownerController.js')

router.get("/profile",authCheck,roleCheck(['owner']),profile)
router.get("/dashboard",authCheck,roleCheck(['owner']),dashboard)
router.post("/addProperty",authCheck,roleCheck(['owner']),addProperty)
router.put("/updateProperty" ,authCheck,roleCheck(['owner']),updateProperty)
router.delete("/deleteProperty/:id",authCheck,roleCheck(['owner']),deleteProperty)

module.exports = router;
