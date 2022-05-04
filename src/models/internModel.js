const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
//const email = require("mongoose-type-email");
//const phone = require("validate-phone-number-node-js");


const internSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },
    email: {
        type: "mongoose-type-email",
        required: true,
        unique:true
    },
   
    mobile:{
        type: "validate-phone-number-node-js",
        required:true,
        maxlength:10,
        unique:true
    },
    collegeId: {
        type: ObjectId,         
        ref: 'college',
        required:true 
    },
  
    isDeleted: {
        type: Boolean,
        default: false
      
    }
    
}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)
