import { jwtVerify } from "./jwt.js";

const auth = (isAuthorised = true)=>
    (req,res,_next)=>{
        const accessToken = req.headers.authorization ?? req.cookies.authorization
        if(!accessToken && !isAuthorised){
            return res.status(401).send({message:'Token is required'})
        }
        const isVerified = jwtVerify(accessToken);
        if(!isVerified && isAuthorised){
            return res.status(401).send({message:'Unauthorized'})
        }
        req.user = {...isVerified,accessToken}
        _next()
    }


export default auth