const {Router} = require("express");
const router = Router();

const controller = require("../controllers/baseController")
const auth = require("../controllers/authController")
const linkService = require("../service/linkService")

router.get("/", auth.check, controller.index(linkService))
router.get("/:id", controller.show(linkService))
router.post("/", controller.store(linkService))
router.put("/:id", controller.update(linkService))
router.delete("/:id", controller.remove(linkService))

module.exports = router
