const {
    verifiedTypeOf, verifiedExists, verifiedExistsTypeLength, isEmail,
} = require('../helpers/validations');

const {User} = require("../db");


const verifyPost = (req, res, next) => {

try {
    const { name,
        lastname,
        age,
        phone_number,
        email,
        location,
        password } = req.body

    //Name 
    verifiedExistsTypeLength(name, 'string', 10, 'name');

    //lastName
    verifiedExistsTypeLength(lastname, 'string', 10, 'lastName');

    //age 
    verifiedExists(age, 'age')
    verifiedTypeOf(age, "number", "age")

    //Phone 
    verifiedExists(phone_number, 'phone_number')
    verifiedTypeOf(phone_number, "string", 'phone_number')


    //Email 
    isEmail(email)

    //Location
    verifiedExists(location, 'location')
    verifiedTypeOf(location, 'string', "location")

    verifiedExists(password, 'password')
    verifiedTypeOf(password, 'string', 'password')

    next()
} catch (error) {
    res.status(400).json({ success: false, message: error.message });
}
    
   
};

const verifyDelete = async(req,res,next)=>{
    try  {
        const { userId } = req.params

        if (typeof Number(userId) != "number") throw new Error(`Must provide the Id (number) of the user that you want to delete`);

       
        const idExist = await User.findByPk(userId);
  
       if (!idExist) throw Error (`User ${id} does not exist on our DataBase, Please select another Id`)
        
     
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
 }


module.exports = { verifyPost, verifyDelete }