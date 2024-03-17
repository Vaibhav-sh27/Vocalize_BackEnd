const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

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
    age:{
        type:Number,
        trim:true,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

let User=mongoose.model('users',userSchema);
module.exports=User;