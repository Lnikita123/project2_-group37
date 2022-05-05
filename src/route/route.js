const express=require('express')
const router = express.Router()

const collegeController=require("../Controllers/collegeController")
const interController=require("../Controllers/internController")


router.post("/functionup/colleges",collegeController.collegeCreation)
router.post("/functionup/interns",interController.interCreation)
router.get("/functionup/collegeDetails",collegeController.getcollege)


module.exports=router;