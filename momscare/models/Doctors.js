const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;


const BookingSchema = new mongoose.Schema({
  user:String,
  date_n_time:{'date':String,'slot':String,'time':String},
  place:String,
  current:Boolean,
});

const guidesSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    availabledates:{
      type:[{
        date:{type:String},
        slot:String,
        timeslots:[String],
        }],default:undefined},
    bookings:[BookingSchema],


})

const Doctors = mongoose.model('Doctors',guidesSchema)

module.exports = Doctors
