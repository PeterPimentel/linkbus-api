const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController")

router.get("/",linkController.index)
router.post("/",linkController.store)

module.exports = router