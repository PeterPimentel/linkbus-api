const {Router} = require("express")
const router = Router()

const controller = require("../controllers/baseController")
const vcardService = require("../service/vcardService")

router.get("/:name", controller.custom("show",vcardService))

module.exports = router