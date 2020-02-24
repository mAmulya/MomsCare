const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const nodemailer = require('nodemailer');


const Users=require('../models/Users');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/',function(req,res){

  Users.find({},function(err,guides){
    if(err){
      console.log(err);
    }else{
      console.log(guides);
      res.render('landing',{});

    }
  })

});



<<<<<<< HEAD
router.post('/',urlencodedParser, function (req, res) {
  console.log(req.body);



  let s = req.body.message+"\r\n"+"\r\n"+req.body.name+"\r\n"+req.body.telephone+"\r\n"+req.body.email;

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wandermate.help@gmail.com',
      pass: 'wandermate123'
    }
  });

  var mailOptions = {
    from: 'wandermate.help@gmail.com',
    to: 'deepikasowmya.5@gmail.com, amulya.murukutla@gmail.com',
    subject: req.body.subject,
    text: s
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    res.redirect('/')
  })


=======
>>>>>>> 4fa5abbe450b464ba673f670d4fc7f122faa7413
module.exports = router;
