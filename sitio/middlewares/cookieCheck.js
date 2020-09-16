module.exports = function(req,res,next){
    if(req.cookies.userMountainGaming){
        req.session.usuario = req.cookies.userMountainGaming;
        next()
    }else{
        next()
    }
}