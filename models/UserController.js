const express = require('express')
const router = express.Router()
const userService = require("../services/UserService.js");
const userMiddleware = require("../middleware/UserMiddleware.js");
const generalMiddleware = require("../middleware/GeneralMiddleware.js");

//Create
router.post("/", userMiddleware.validateUser, userService.createAUser) 

//Read all
router.get("/", userService.getUsers)

//Read one
router.get("/:id", generalMiddleware.testId, userService.getAUser)

//Update
router.put("/:id", generalMiddleware.testId, userService.updateAUser)

//Delete
router.delete("/:id", generalMiddleware.testId, userService.deleteAUser)

module.exports = router