const express=require('express');
const router = express.Router();


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



module.exports = router;
