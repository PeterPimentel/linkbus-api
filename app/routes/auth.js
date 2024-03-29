const {Router} =  require("express")
const controller = require("../controllers/baseController")
const authService = require("../service/authService")
const router = Router()

router.post("/",controller.auth(authService.login))

module.exports = router
