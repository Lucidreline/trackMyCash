require("dotenv").config();
// - - - - - - Dependencies - - - - - - 
var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local")
    
// - - - - - - Models - - - - - - 
var User = require("./models/user.js"),
    Card = require("./models/card.js")

// - - - - - - Routes - - - - - - 
var userRoutes = require("./routes/users.js"),
    fundRoutes = require("./routes/funds.js"),
    indexRoutes = require("./routes/index.js")


var app = express();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    // connects my app to my mongo database
    
app.use(bodyParser.urlencoded({extended: true}));
    // body parser allows me to retrieve data from forms by using .body... ex: req.body.image
    
app.set("view engine", "ejs");
    // this makes it possible for me not to write .ejs ever time i render an ejs file.
   
   

app.use(express.static("/public"))
app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));
    // express only looks in "/views", so i have to tell it to look in "public" too for css and stuff

//passport
app.use(require("express-session")({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//makes these in function available everywhere
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


// - - - - - - USING Routes - - - - - -
app.use(indexRoutes);
app.use(userRoutes);
app.use(fundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Online")
})
    
