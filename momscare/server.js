const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
const http = require('http');
var app=express()
//EJS
const server = http.createServer(app);


app.set('view engine','ejs');


app.use('/',require('./routes/landing'));


server.listen(8000, function(){
  console.log("Connected to server")
});
console.log('you are listening to port 8000');
