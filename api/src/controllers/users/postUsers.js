const {User} = require("../../db")

const createUser = async(name,lastname,age,phone,email,location)=>{
    if (!name||!lastname||!age||!phone||!email||!location) throw Error ("Missing data to create user")
    
    const user = {
        name,
        lastname,
        age,
        phone,
        email,
        location,
        verified
    }
    await User.create()
}

module.exports = async(req,res)=>{

}