const {Router} = require("express");
const router = Router();

const controller = require("../controllers/baseController")
const auth = require("../controllers/authController")
const linkService = require("../service/linkService")

router.get("/", auth.check, controller.index(linkService.index))
router.get("/:id", auth.check, controller.show(linkService.show))
router.post("/", auth.check, controller.store(linkService))
router.put("/:id", auth.check, controller.update(linkService))
router.delete("/:id", auth.check, controller.remove(linkService))

module.exports = router
