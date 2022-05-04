
const collegeModel = require("../models/collegeModel");

const createCollege = async function (req, res) {
  let data = req.body;

  if (Object.keys(author).length == 0) {
      return res.status(400).send({ status: false, msg: "Data is required to add a Author" });
  }
 if (!data.name) {
    res.send({ status: false, msg: "name is requreid" });
  }
  if (!data.fullName) {
    res. send({ status: false, msg: "fullname is requreid" });
  }
  let college = await collegeModel.create(data);
  res.send(college);
};






module.exports.createCollege=createCollege