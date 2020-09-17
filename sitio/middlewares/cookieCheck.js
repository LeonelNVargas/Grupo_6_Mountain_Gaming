module.exports = function(req,res,next){
    if(req.cookies.usuarioMG){
        req.session.usuario = req.cookies.usuarioMG;
        next()
    }else{
        next()
    }
}