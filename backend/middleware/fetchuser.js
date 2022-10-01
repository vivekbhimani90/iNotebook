var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

const fetchuser=(req,res,next)=>{

    const token = req.header("auth-token");
    if(!token){
        res.stauts(401).send({error:"Please valid authtication token Enter"});
    }try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
     }catch{
        res.stauts(401).send({error:"Please valid authtication token enter"})
     }
}


module.exports=fetchuser;