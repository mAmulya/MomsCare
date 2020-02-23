const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
var app=express()
//EJS
const server = http.createServer(app);


app.set('view engine','ejs');

const mongoose = require('mongoose');

const URI = 'mongodb+srv://amulya:mommy@123@cluster0-tll5r.mongodb.net/MomsCare?retryWrites=true&w=majority';

mongoose.connect(URI,{   useNewUrlParser: true,
                        useUnifiedTopology: true
                      })
    .then(()=>console.log('connected to mongodb'))
    .catch(err=>console.log(err))


app.use('/styles', express.static('styles'))


app.use('/',require('./routes/landing'));
app.use('/doc',require('./routes/doc'));
app.use('/user',require('./routes/user'));
app.use('/booking',require('./routes/booking'));


server.listen(8000, function(){
  console.log("Connected to server")
});
console.log('you are listening to port 8000');
