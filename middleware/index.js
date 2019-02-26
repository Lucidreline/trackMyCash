var middleware = {}

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user")
}

module.exports = middleware;