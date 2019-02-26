require("dotenv").config();
// - - - - - - Dependencies - - - - - - 
var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local")
    
// - - - - - - Models - - - - - - 


// - - - - - - Routes - - - - - - 


var app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    // connects my app to my mongo database
    
app.use(bodyParser.urlencoded({extended: true}));
    // body parser allows me to retrieve data from forms by using .body... ex: req.body.image
    
app.set("view engine", "ejs");
    // this makes it possible for me not to write .ejs ever time i render an ejs file.
    
    
    app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Online")
})