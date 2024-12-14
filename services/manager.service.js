import { Manager } from '../models/manager.model.js'
import bcrypt from 'bcrypt'

export const getManagers = async()=>{
    const managers = await Manager.find({isBlocked:false})
    console.log(managers);
    if(managers && managers.length>0){
        const managersData = managers.map(manager=>({name:manager.name,_id:manager._id}))
        console.log(managersData);
        return managersData
    }else{
        throw{
            message:'No managers found',
            status:400
        }
    }
}

export const addManager = async () => {
    const hashPassword = await bcrypt.hash("edize@111",10)
    const managers = {
        name: "nisam",
        email: "nisam@edize.in",
        password:hashPassword
    }
    const newManager = new Manager(managers)
    await newManager.save()
}