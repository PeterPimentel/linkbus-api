const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController")

router.get("/",linkController.index)
router.get("/:id",linkController.show)
router.post("/",linkController.store)
router.put("/:id",linkController.update)
router.delete("/:id",linkController.remove)

module.exports = router
