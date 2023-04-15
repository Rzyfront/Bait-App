const {
    verifiedTypeOf, verifiedExists, verifiedExistsTypeLength, isEmail,
} = require('../helpers/validations');

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
    verifiedExistsTypeLength(name, 'string', 50, 'name');

    //lastName
    verifiedExistsTypeLength(lastname, 'string', 50, 'lastName');

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

module.exports = {verifyPost}