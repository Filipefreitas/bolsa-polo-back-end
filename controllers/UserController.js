const express = require('express')
const router = express.Router()
const userService = require("../services/UserService.js");
const userMiddleware = require("../middleware/UserMiddleware.js");

//Create
router.post("/", userMiddleware.validateUser, userService.createAUser) 

//Login
router.post("/login", userService.loginUser) 

//Read all
router.get("/", userService.getUsers)

//Read one
router.get("/:id", userService.getAUser)

//Update
router.patch("/:id", userService.updateAUser)

//Delete
router.delete("/:id", userService.deleteAUser)

module.exports = router