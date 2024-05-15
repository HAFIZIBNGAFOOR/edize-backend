import { jwtVerify } from "./jwt.js";

const auth = (isAuthorised = true)=>
    (req,res,_next)=>{
        const accessToken = req.headers.authorization ?? req.cookies.authorization
        if(!accessToken && !isAuthorised){
            return res.status(401).send({message:'Token is required'})
        }
        const isVerified = jwtVerify(accessToken);
        if(!isVerified && isAuthorised){
            return req.status(401).send({message:'Unauthorized'})
        }
        req.user = {...isVerified,accessToken}
        console.log(req.user, ' req user in auth');
        _next()
    }


export default auth