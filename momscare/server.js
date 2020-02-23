const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var app=express()
const morgan=require("morgan");
const bodyparser=require("body-parser");
const http = require('http');
var multer =require('multer');


//EJS
const server = http.createServer(app);


app.set('view engine','ejs');

const mongoose = require('mongoose');
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const URI = 'mongodb+srv://amulya:mommy@123@cluster0-tll5r.mongodb.net/MomsCare?retryWrites=true&w=majority';

mongoose.connect(URI,{   useNewUrlParser: true,
                        useUnifiedTopology: true
                      })
    .then(()=>console.log('connected to mongodb'))
    .catch(err=>console.log(err))

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname+'/uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now()+ '.jpeg' )
      }
    })
    
    
    app.use(multer({ storage: storage }).any());

app.use('/styles', express.static('styles'))


app.use('/',require('./routes/landing'));
app.use('/users',require('./routes/loginnsignup'));

server.listen(5000, function(){
  console.log("Connected to server")
});
console.log('you are listening to port 8000');
