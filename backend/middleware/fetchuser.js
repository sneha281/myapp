const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Sneha$oy';
const fetchuser = (req , res ,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please autheticate using a valid token"});
    }
    try{
    const data = jwt.verify(token , JWT_SECRET);
    req.user = data.user;

    next();
    }
    catch(Error){
         res.status(401).send({error : "Please autheticate using a valid token"});
    }
}


module.exports = fetchuser;