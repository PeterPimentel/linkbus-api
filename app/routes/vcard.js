const express = require("express")
const router = express.Router()

const controller = require("../controllers/baseController")
const vcardService = require("../service/vcardService")

router.get("/:name",controller.custom("show",vcardService))

module.exports = router