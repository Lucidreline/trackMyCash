var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")



//signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.redirect("/user")
        }
        
        passport.authenticate("local")(req, res, function(){
            
            res.redirect("/")
        })
    })
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/funds",
    failureRedirect: "/"
}), function(req, res){
})

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})



module.exports = router