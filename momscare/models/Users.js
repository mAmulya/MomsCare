const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const usersSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    img:
    { path: String, contentType: String }


})


module.exports=mongoose.model('user',usersSchema);
