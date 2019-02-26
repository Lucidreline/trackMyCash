var middleware = require("../middleware"),
    express = require("express"),
    router = express.Router();
    
router.get("/funds", middleware.isLoggedIn, function(req, res){
    res.render("funds")
})

module.exports = router