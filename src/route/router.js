const express= require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")


router.post("/colleges",collegeController.createCollege)
router.post("/intern",internController.createIntern)

module.exports = router;