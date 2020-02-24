const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const adminSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },


    password:{
        type:String,
        required:true
    },



})


module.exports=mongoose.model('admin',adminSchema);
