const {Router} = require("express")
const router = Router();

const controller = require("../controllers/baseController")
const userService = require("../service/userService")
const auth = require("../middlewares/authMiddleware")

router.get("/", auth.check, controller.index(userService.index))
router.get("/:id", auth.check, controller.show(userService.show))
router.post("/", auth.check, controller.store(userService.store))
router.put("/:id", auth.check, controller.update(userService))
router.delete("/:id", auth.check, controller.remove(userService.remove))

module.exports = router
