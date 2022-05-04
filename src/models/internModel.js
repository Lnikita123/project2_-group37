const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
let email = require("mongoose-type-email")
let phone = require("validate-phone-number-node-js")


const internSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        unique:true
    },
   
    mobile:{
        type: phone,
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
