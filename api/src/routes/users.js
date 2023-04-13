const {Router} = require("express")
const userRoutes = Router()
const getUsers = require("../controllers/users/getUsers")
const postUser = require("../controllers/users/postUsers")


userRoutes.get("/",getUsers)
userRoutes.get("/:userId", getUsers)
userRoutes.post("/",postUser)

module.exports = userRoutes