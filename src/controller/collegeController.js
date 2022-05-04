
const collegeModel = require("../models/collegeModel");

const createCollege = async function (req, res) {
  try {
  let data = req.body;

  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Data is required to add the college details" });
  }
  if (!data.name) {
    res.send({ status: false, msg: "name is requreid" });
  }
  if (!data.fullName) {
    res.send({ status: false, msg: "fullname is requreid" });
  }
  

let validString = /\d/; //validating the string for numbers
if (validString.test(data.name)) {
  return res.status(400).send({ status: false, msg: "Enter a valid  Name" });
}

if (validString.test(data.fullName)) {
 return res.status(400).send({ status: false, msg: "Enter a valid  fullName" });
}
let college = await collegeModel.create(data);
res.status(201).send({ status: true, data: college });

} catch(err) {
  res.status(500).send({ status: false, msg: err.message });
}
}






module.exports.createCollege = createCollege