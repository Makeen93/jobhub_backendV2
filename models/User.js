const mongoose = require("mongoose");
const UserSchema=new mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    uid:{type:String,required:true},
    location:{type:String,required:false},
    phone:{type:String,required:false},
    updated:{type:Boolean,required:false},
    isAdmin:{type:Boolean,default:false},
    isAgent:{type:Boolean,default:false},
    skills:{type:Boolean,default:false,required:false},
    profile:{type:String,required:true,default:"https://cdn-icons-png.flaticon.com/512/2706/2706914.png"},

},{timestamps:true});
module.exports=mongoose.model("User",UserSchema);