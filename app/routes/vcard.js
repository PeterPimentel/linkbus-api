const {Router} = require("express")
const router = Router()

const controller = require("../controllers/baseController")
const auth = require("../controllers/authController")
const vcardService = require("../service/vcardService")

router.get("/:name",auth.check, controller.custom("show",vcardService))

module.exports = router