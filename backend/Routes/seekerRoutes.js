const express = require('express')
const router = express.Router()
const authCheck = require('../Middlewares/authMiddleware.js')
const roleCheck = require('../Middlewares/roleMiddleware.js')

const {home ,me,getAll} = require('../Controllers/seekerController.js')

router.get("/home",authCheck,roleCheck(['seeker']),home)
router.get("/me",authCheck,roleCheck(['seeker']),me)
router.get("/getAll",authCheck,roleCheck(['seeker']),getAll)

module.exports = router
