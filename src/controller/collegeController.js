
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const createCollege = async function (req, res) {
  try {

  let{...data} = req.body;

  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Data is required to add the college details" });
  }
  if (!data.name) {
   return res.status(400).send({ status: false, msg: "name is requreid" });
  }
  if (!data.fullName) {
    return res.status(400).send({ status: false, msg: "fullname is requreid" });
  }
  if (!data.logoLink) {
    return res.status(400).send({ status: false, msg: "logoLink is requreid" });
  }
  
     let checkName = collegeModel.findOne({data:data.name})

    if(checkName){
      return res.status(400).send({status: false,msg:"college is already registered"})
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
  console.log(err)
  res.status(500).send({ status: false, msg: err.message });
}
}



const getColleges =async function(req,res){
  try{
    let data = req.query
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Add  college details to find interns details" })
    }
    let collegename= Object.values(data)
let collegeId= await collegeModel.findOne({name:collegename}).select({_id:1})

if(!collegeId) return res.status(404).send({ status: false, msg: "no  college details with particular name exist" })

collegeId= collegeId._id

let part1 = await collegeModel.findOne({name:collegename}).select({_id:0, name:1, fullName :1,logoLink :1})
let part2 = await internModel.find({collegeId:collegeId}).select({ name:1, email :1,mobile:1})
  if(part2.length == 0) return res.status(400).send({ status: false, msg: "No interns  at this particular Moment" })
let temp = part1.toJSON()
temp["interests"]= [...part2]

return res.status(200).send({ status: true, data:temp})
  }
  catch(err){
    console.log(err)
    return res.status(500).send({ status: false, msg :err.message})
  }
}
module.exports.getColleges= getColleges





module.exports.createCollege = createCollege