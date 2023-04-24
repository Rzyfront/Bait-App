const {Review,User} = require("../../db")

module.exports  =async(req,res)=>{
    try {
        
        const unverifiedOnes = await Review.findAll({where:{verified:false}})

        console.log(unverifiedOnes)

        res.status(200).json({succes :true , unverifiedOnes})
    } catch (error) {
        res.status(400).json(error.message)
    }
}




