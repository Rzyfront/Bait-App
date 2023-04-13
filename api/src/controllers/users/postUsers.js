const {User} = require("../../db")

module.exports = async (req, res) => {
    const { name, lastname, age, phone_number, email, location, verified } = req.body

    try {
        const newUser = await User.create({name, lastname, age, phone_number, email, location, verified})

        res.status(201).json(`User created correctly ${newUser}`)
    } catch (error) {
        res.status(404).json(`Failed to create user  ${error.message}`)
    }


}