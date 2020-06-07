const {Router} = require("express");
const router = Router();

const controller = require("../controllers/baseController")
const auth = require("../middlewares/authMiddleware")
const linkService = require("../service/linkService")

router.get("/", auth.check, controller.index(linkService.index))
router.get("/:id", auth.check, controller.show(linkService.show))
router.post("/", auth.check, controller.store(linkService.store))
router.put("/:id", auth.check, controller.update(linkService.update))
router.delete("/:id", auth.check, controller.remove(linkService.remove))

module.exports = router
