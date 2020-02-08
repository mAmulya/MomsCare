const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const usersSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

})

const Users = mongoose.model('Users',usersSchema)

module.exports = Users
