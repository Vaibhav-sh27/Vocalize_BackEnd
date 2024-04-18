const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password: {
        type: String,
        trim: true,
        max: 30,
        required: true,
    },
});



let User=mongoose.model('users',userSchema);
module.exports=User;