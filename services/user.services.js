import { generateTokens } from "../auth/jwt.js"
import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'


export const doSignup = async ({
    body:{
        first_name,
        last_name,
        password,
        email,
        district,
        phone
    }
})=>{
    if(!first_name){
        throw {
            status:400,
            message:'First name is required'
        }
    }
    if(!password){
        throw {
            status:400,
            message:'password is required'
        }
    }
    if(!email){
        throw {
            status:400,
            message:'password is required'
        }
    }
    if(!district){
        throw {
            status:400,
            message:'password is required'
        }
    }
    if(!phone){
        throw {
            status:400,
            message:'password is required'
        }
    }
    if(!password){
        throw {
            status:400,
            message:'password is required'
        }
    }
    const userExist = await User.findOne({
        $or:[
            { email: email },
            { phone: phone }
        ]
    })
    if(userExist){
        let message=''
        if(userExist.email == email && userExist.phone == phone){
            message = 'Both email and phone already exists'
        }if(userExist.email == email){
            message ='Entered email already exists'
        }if(userExist.phone == phone){
            message ='Entered phone already exists'
        }
        throw{
            status :400,
            message
        }
    }
    const hashPassword = await bcrypt.hash(password,10)
     await User.insertMany({
        first_name,
        last_name,
        email,
        password:hashPassword,
        district,
        phone  ,
        role:'User'      
     })
     return true
}

export const doLogin = async ({
    body:{email,password}
})=>{
    if(!email || !password){
        throw{
            status:400,
            message:"Email and password are required"
        }
    }
    const user = await User.findOne({email})
    if(!user){
        throw { status:400, message:'User doesnt exist'}
    }
    if(user.isBlocked == true){
        throw { status:400, messaage:'User is Blocked , Contact admin'}
    }
    if(user.isVerified = false){
        throw {
            status:404,
            message:`You account is not verified. Please contact Edize Administration`
        }
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        throw { status:400, message:" Incorrect password"}
    }
    const tokens = generateTokens({id:user._id,roleId:user.role})
    return tokens
}

export const verifyUser = async({
    body:{
        userId
    }
})=>{
    const updateUser = await User.updateOne({_id:userId},{
        $set:{
           isVerified:true 
        }
    })
    const toVerifyUser = await User.find({isVerified:false,role:'User'})
    if(toVerifyUser){
        return toVerifyUser
    }else{
        throw{
            status:400,
            message:"No more user remaining to verify"
        }
    }
}

export const toVerifyUser = async()=>{
    const toVerifyUser = await User.find({isVerified:false,role:'User'})
    if(toVerifyUser){
        return toVerifyUser
    }else{
        throw{
            status:400,
            message:"No more user remaining to verify"
        }
    }
}

export const getProfile = async({
    user:{
        userId
    }
})=>{
    if(userId){
        const userProfile = await User.findById(userId)
        if(!userProfile){
            throw {
                status:400,
                message:'User doesnt exist'
            }
        }
        return userProfile
    }
}

export const putProfile = async({
    user:{
        userId
    },
    body:{
        first_name,
        last_name,
        email,
        district,
        phone
    }
})=>{
    const updateUser = await User.findByIdAndUpdate(
        {_id:userId},
        {$set:{
            first_name:first_name,
            last_name:last_name,
            email:email,
            district:district,
            phone:phone
            }
        }
    )
    if(!updateUser){
        throw {
            status:400,
            message:'Something went wrong Please try again'
        }
    }
    const userProfile = await User.findById(userId);
    return userProfile
}

export const allUsers = async()=>{
    const allUsers = await User.find({role:"User"})
    if(allUsers && allUsers.length>0){
        return allUsers
    }else{
        throw{
            status:400,
            message:"No Users Available"
        }
    }
}

export const getUser =async({
    query:{
        userId
    }
})=>{
    const user = await User.findById(userId,);
    if(user){
        return user
    }else{
        throw{
            status:400,
            message:'No User Found '
        }
    }
}   

