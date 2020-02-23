const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const nodemailer = require('nodemailer');

const Users=require('../models/Users');

router.get('/home',function(req,res){

  res.render('user_home',{});
});



module.exports = router;
