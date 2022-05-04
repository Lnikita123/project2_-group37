const mongoose = require('mongoose')
const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")
//const validEmail = require("mongoose-type-email")
const validateEmail = require('email-validator');

const isValidObjectId = (ObjectId) => {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

const createIntern = async function(req,res){
    try{
 let{...data} = req.body;

 if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Data is required to add the interns details" });
  }
 if (!data.name) {
  return res.status(400).send({ status: false, msg: " intern name is requreid" });
  }

  if (!data.email) {
    return res.status(400).send({ status: false, msg: "intern email is requreid" });
  }
  if (!data.mobile) {
    return res.status(400).send({ status: false, msg: "intern mobile number is requreid" });
  }
  if (!data.collegeId) {
    return res.status(400).send({ status: false, msg: "collegeId is requreid" });
  }
  let validString = /\d/;
  if(validString.test(data.fname)) return res.status(400).send({ status: false, msg: "Enter a valid First Name" });
  if(!isValidObjectId(data.collegeId)) return res.status(404).send({ status: false, msg: "Enter a valid college Id" });
  
  //checking if the email is already exist
  let uniqueEmail = await internModel.findOne({ email: internModel.email });
  if(uniqueEmail) return res.status(400).send({ status: false, msg: "Email already exist" })
  if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })
 
  
  let getcollegeData = await collegeModel.findById(data.collegeId);
  if(!getcollegeData)
 return res.status(404).send({ status: false, msg: "No such college exist" });

  

 let intern = await internModel.create(data)
 res.status(201).send(intern)
} catch(err) {
    res.status(500).send({ status: false, msg: err.message });
  }
  }


  module.exports.createIntern=createIntern


