const {Router} =  require("express")
const controller = require("../controllers/authController")
const router = Router()

router.post("/",controller.login)

module.exports = router