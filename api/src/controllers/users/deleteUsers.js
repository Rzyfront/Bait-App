const {User}= require("./../../db")

module.exports = async(req,res)=>{

    try {
        const {userId} = req.params
        if (!userId) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }
        await User.destroy({ where: { id: userId } })

        res.status().send(`Deleted User`)
        //Se debe validar en el front si el usuario quiere borrar definitivamente 
        // o desactivar temporalmente su usuario , esta ruta borra definitivamente 
    } catch (error) {
        res.status(500).send(`Error deleting User, ${error.message}`)
    }
}