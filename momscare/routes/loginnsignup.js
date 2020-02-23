const express=require('express');
const router = express.Router();
const Users=require('../models/Users');

var otpGenerator = require('otp-generator');
var nodemailer = require('nodemailer');
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var multer =require('multer');



var verification_code='a';
router.post('/signup',function(req,res,next){
    console.log(req.body)
    console.log('signing up');

    Users.find({email:req.body.email}).exec().then(user=>{
        console.log(req.body.confirm_password);
        console.log(user)
        if((user.length>=1))
        {
            console.log('mail exits');
            var error='true'
            return res.render('index',{error:error,error_match:'false',});
            
        }

        else
        {
            if(req.body.password!=req.body.confirm_password){
                return res.render('index',{error:'false',error_match:'true',})

            }

        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                console.log(err);
            }else{
            
                const user=new Users({
                    name:req.body.name,
                    phonenumber:req.body.phonenumber,
                    email:req.body.email,
                    password:hash,
                    city:req.body.city, 
            });
            
            user.save()
            
            .then(result =>{
                console.log("usercreated");                    
                                    
            })
            .catch(err=>{
                console.log(err);

            });
            verification_code=otpGenerator.generate(6, { upperCase: false, specialChars: false });
            var transporter = nodemailer.createTransport({ service: "gmail", auth: { user: 'wandermate.help@gmail.com', pass: 'wandermate123' } });
            var mailOptions = { from: 'neeharika149@gmail.com', to: user.email, subject: 'Account Verification Token', 
            html : `Hello,<br> Your Verification Code for email verification.<br><b>${verification_code}</b>`,}

       transporter.sendMail(mailOptions, function (err) {
           if (err) {
               console.log("b");
                console.log(err);
               }
            else{
                console.log('mail sent');
            }
               
            });

        }
        console.log(verification_code);
            });
            return res.redirect(`/users/signup/confirmation/${req.body.email}`);
        }
    });


    
    
  });

  router.get('/signup',function(req,res){
    return res.render('index',{error:'false',error_match:'false',error_details:'false'});

  });

  router.post('/signup/confirmation/:email',function(req,res){
      console.log(req.params.email)
      console.log(verification_code);
      if(req.body.verification_code==verification_code){

        Users.findOne({email:req.params.email},function(err,users){
            console.log(users);
            users.is_verified=true;
            users.save()
           return res.json('user registered')
        })
      }
      else{
          console.log('code unmatch')
          return res.render('confirmation',{email:req.params.email,error:'true'})
      }

  });

  router.get('/signup/confirmation/:email',function(req,res){
      return res.render('confirmation',{email:req.params.email,error:'false'});
  });

  router.post('/login',function(req,res){
      Users.find({email:req.body.email,is_verified:"true"},(err,doc)=>{
          if(doc.length==1){
              console.log('entered password')
              console.log(req.body.email)
              return res.render('loginconf',{email:req.body.email,error_captcha:'false',error_password:'false'});
          }
          else{
              console.log('email id not registered');
              return res.render('login',{email:undefined,error:'true'})
          }
      })
  })


  router.get('/login',function(req,res){
      return res.render('login',{email:undefined,error:'false'});
  })


  router.post('/login/password',function(req,res){
      console.log(req.body)
      console.log('got in ')
      Users.find({email:req.body.email,is_verified:"true"},(err,doc)=>{
          var password=doc[0].password;
          console.log(password)
          console.log(doc)
          bcrypt.compare(req.body.password,password,(err,result)=>{
              console.log(result)
              if(err){
                  console.log(err);
              }
              if(result){
                  if(req.body.c=='true'){
                   return res.json('user logged in');

                  }
                  else{
                      if(req.body.c=='false'){
                        
                        return res.render('loginconf',{email:req.body.email,error_captcha:'true',error_password:'false'})

                      }
                  }
                  

              }
              else{
                return res.render('loginconf',{email:req.body.email,error_captcha:'false',error_password:'true'})

              }
          })

      })

  })

  router.get('/login/password',function(req,res){
    return res.render('loginconf',{email:req.body.email,error_captcha:'false',error_password:'false'});
  })



  module.exports=router