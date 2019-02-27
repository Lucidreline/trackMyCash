var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("landing");
})

router.get("/user", function(req, res){
    res.render("user");
})

router.post("/bank", function(req, res){
})

module.exports = router