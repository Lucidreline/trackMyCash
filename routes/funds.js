var middleware = require("../middleware"),
    express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    Card = require("../models/card"); 
    
    
router.get("/funds", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            req.flash("error", err.message)
            res.redirect("/funds")
        }else{
           Card.find({'owner.id' : req.user._id}, function(err, allCards){
             if(err){
                 req.flash("error", err.message)
                 res.redirect("/funds")
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
            req.flash("error", err.message)
            res.redirect("/funds")
        }else{
            req.flash("success","$" + req.body.deposit + " made to " + updatedUser.bank.name)
            res.redirect("/funds")
            
        }
    })
    
})

router.put("/bankname", function(req,res){
    req.user.bank.name = req.body.bankname
    User.findByIdAndUpdate(req.user._id, req.user, function(err, updatedUser){
        if(err){
            req.flash("error", err.message)
            res.redirect("/funds")
        }else{
            req.flash("success", updatedUser.bank.name + " renamed")
            res.redirect("/funds")
            
        }
    })
    
})

router.post("/newcard", function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            req.flash("error", err.message)
            res.redirect("/funds")
        }else{
           Card.create(req.body.card, function(err, newCard){
                if(err){
                    req.flash("error", err.message)
                    res.redirect("/funds")
                 }else{
                     //add username + id to comments
                    newCard.owner.id = foundUser._id;
                    newCard.owner.username = foundUser.username;
                    //save
                    newCard.save();
                    
                    foundUser.cards.push(newCard);
                    foundUser.save();
                    req.flash("success", newCard.name + " created")
                    res.redirect("/funds")
                        }
                    })
            }
        })
})

router.put("/card/:id/purchase", function(req, res) {
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            req.flash("error", err.message)
            res.redirect("/funds")
        }else{
            
            req.user.bank.balance -= Number(req.body.purchase)
            User.findByIdAndUpdate(req.user._id, req.user, function(err, updatedUser){
                if (err){
                    req.flash("error", err.message)
                 res.redirect("/funds")
                }else{
                    foundCard.credit -= Number(req.body.purchase)
                    Card.findByIdAndUpdate(foundCard._id, foundCard, function(err, updatedCard){
                        if(err){
                            req.flash("error", err.message)
                 res.redirect("/funds")
                        }else{
                            req.flash("success", "Purchase made on " + updatedCard.name)
                           res.redirect("/funds") 
                        }
                    })
                    
                }
            })
            
        }
    })
})
router.put("/card/:id/edit_name", function(req, res) {
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            req.flash("error", err.message)
                 res.redirect("/funds")
        }else{
            
            Card.findByIdAndUpdate(foundCard._id, req.body.card, function(err, updatedCard){
                if (err){
                    req.flash("error", err.message)
                 res.redirect("/funds")
                }else{
                    req.flash("success", updatedCard.name + " is now renamed.")
                    res.redirect("/funds")
                }
            })
            
        }
    })
})

router.put("/card/:id/reset", function(req, res) {
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            req.flash("error", err.message)
                 res.redirect("/funds")
        }else{
            foundCard.credit = 0;
            Card.findByIdAndUpdate(foundCard._id, foundCard, function(err, updatedCard){
                if (err){
                    req.flash("error", err.message)
                 res.redirect("/funds")
                }else{
                    req.flash("success", updatedCard.name + " reseted")
                    res.redirect("/funds")
                }
            })
            
        }
    })
})

//destroy
router.delete("/card/:id", function(req, res){
    Card.findByIdAndRemove(req.params.id, function(err, deletedCard){
        if(err){
            req.flash("error", err.message)
                 res.redirect("/funds")
        }else{
            req.flash("success", deletedCard.name + " is now deleted")
            res.redirect("/funds")
        }
    })
})

module.exports = router