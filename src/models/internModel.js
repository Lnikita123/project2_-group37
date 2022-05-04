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
        type:String,
        trim:true,
        unique:true,
        required:[true,`Email address is required`]

    },
   
    mobile:{
        type: Number,
        required:true,
        unique:true,
        validate:{
            validator:function(mobile){
                return /^\d{10}$/.test(mobile)
            },message:'please fill a valid Mobile Number',isAsync:false
        }

       
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
