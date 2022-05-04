const mongoose = require('mongoose')
const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")
const email = require("mongoose-type-email")


const createIntern = async function(req,res){
    try{
 let data = req.body

 if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Data is required to add the interns details" });
  }
 if (!data.name) {
    res.send({ status: false, msg: "name is requreid" });
  }

  if (!data.email) {
    res.send({ status: false, msg: "email is requreid" });
  }
  if (!data.mobile) {
    res.send({ status: false, msg: "mobile number is requreid" });
  }
  if (!data.collegeId) {
    res.send({ status: false, msg: "collegeId is requreid" });
  }

 

 let intern = await internModel.create(data)
 res.status(201).send(intern)
} catch(err) {
    res.status(500).send({ status: false, msg: err.message });
  }
  }


  module.exports.createIntern=createIntern


