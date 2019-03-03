var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")



//signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.redirect("/user")
        }
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + user.username)
            res.redirect("/funds")
        })
    })
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/funds",
    failureRedirect: "/user"
}), function(req, res){
})

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","Logged Out")
    res.redirect("/user");
})



module.exports = router