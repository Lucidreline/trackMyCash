var middleware = require("../middleware"),
    express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    Card = require("../models/card"); 
    
router.get("/funds", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
           Card.find({}, function(err, allCards){
             if(err){
                 console.log(err);
            }else{
                 res.render("funds", {cards: allCards, user: foundUser})
        }
    })
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

router.post("/newcard", function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
           Card.create(req.body.card, function(err, newCard){
                if(err){
                     console.log(err);
                 }else{
                     //add username + id to comments
                    newCard.owner.id = foundUser._id;
                    newCard.owner.username = foundUser.username;
                    //save
                    newCard.save();
                    
                    foundUser.cards.push(newCard);
                    foundUser.save();
                    console.log(foundUser)
                    res.redirect("/funds")
                        }
                    })
            }
        })
})

module.exports = router