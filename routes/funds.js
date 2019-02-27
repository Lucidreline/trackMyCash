var middleware = require("../middleware"),
    express = require("express"),
    router = express.Router(),
    User = require("../models/user");
    
router.get("/funds", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
           res.render("funds", {user: foundUser});
        }
    })
    
})

router.put("/deposit", function(req,res){
    req.user.bank.balance += Number(req.body.deposit);
    User.findByIdAndUpdate(req.user._id, req.user, function(err, updatedUser){
        if(err){
            res.redirect("/funds")
        }else{
            res.redirect("/funds")
            
        }
    })
    
})

router.put("/bankname", function(req,res){
    req.user.bank.name = req.body.bankname
    User.findByIdAndUpdate(req.user._id, req.user, function(err, updatedUser){
        if(err){
            res.redirect("/funds")
        }else{
            res.redirect("/funds")
            
        }
    })
    
})

module.exports = router