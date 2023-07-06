const express = require("express")

const routers = new express.Router()
const controllers = require("../controllers/userControllers")

routers.post("/user/register",controllers.userregister)
routers.post("/user/sendotp",controllers.userOtpSend);
routers.post("/user/login",controllers.userLogin);

module.exports = routers;