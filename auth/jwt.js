import jwt from "jsonwebtoken"


export const jwtSign = (payload, expiresIn, type)=>{
    const types = {
        refresh:"JWT_SECRET_REFRESH",
        access:"JWT_SECRET_ACCESS",
        otp:"JWT_OTP_SECRET"
    }
    return jwt.sign(payload,process.env[types[type]],{
        expiresIn:expiresIn
    })
}
export const jwtVerifyCommon = (token, key)=>{
    try {
        return jwt.verify(token, key)
    } catch (error) {
        console.log(error);
        return false
    }
}
export const jwtVerify = (accessToken)=>{
    return jwtVerifyCommon(accessToken,process.env.JWT_SECRET_ACCESS)
}

export const jwtVerifyRefresh = (refreshToken)=>{
    return jwtVerifyCommon(refreshToken, process.env.JWT_SECRET_REFRESH)
}

export const generateTokens = ({id:userId, roleId})=>{

    const accessToken = jwtSign({userId, roleId}, "1y","access")
    const refreshToken = jwtSign({userId, roleId},"1y","refresh")
    return {accessToken,refreshToken}
}
