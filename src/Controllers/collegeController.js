const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


var isValid = function (value) { 
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true; 
  };

  


const collegeCreation = async function (req, res) { 
    try {
        const { name, fullName, logoLink } = req.body;
        if (!req.body) {
          return  res.status(400).send({ status: false, msg: "Please provide valid details" })
        }
        if (!isValid(name)) {
           return res.status(400).send({ status: false, msg: "Please provide valid name" })
        }
        if (!isValid(fullName)) {
          return  res.status(400).send({ status: false, msg: "Please provide full name" })
        }
        if (!isValid(logoLink)) {
          return  res.status(400).send({ status: false, msg: "Please provide valid link" })
        }
        // if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.)?$/.test(logoLink)) {
        //   return  res.status(400).send({ status: false, msg: "Not a valid url" })
        // }

        let chkname=await collegeModel.findOne({name:name})
        if (chkname) {
          return  res.status(400).send({ status: false, msg: "The college is already registered" })
        }
        const createCollege = await collegeModel.create(req.body)
       return res.status(201).send({ status: true, data: createCollege })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}



const getcollege = async function (req, res) {
    try {
        let collegename = req.query;

          if (!isValid(collegename)) {
           return res.status(400).send({ status: false, msg: "Please provide name of the college" })
        }

        
        let college = await collegeModel.findOne({ name: collegename.name })

        if (!college) {
            return res.status(404).send({ status: false, msg: "no data found" })
        }

      

        let studentlist = await internModel.find({ collegeId: college }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        let dataa = {
            "name": college.name,
            "fullName": college.fullName,
            "logoLink": college.logoLink,
            "interests": studentlist
        }


        res.status(200).send({ data: dataa })
    }
    catch (err) {

        res.status(500).send({ statu: false, msg: err.message })
    }
}

module.exports = { getcollege, collegeCreation }
