const express = require("express");
const router = express.Router();

const controller = require("../controllers/baseController")
const linkService = require("../service/linkService")

router.get("/", controller.index(linkService))
router.get("/:id", controller.show(linkService))
router.post("/", controller.store(linkService))
router.put("/:id", controller.update(linkService))
router.delete("/:id", controller.remove(linkService))

module.exports = router
