const {Router} = require("express")
const router = Router();

const controller = require("../controllers/baseController")
const userService = require("../service/userService")
const auth = require("../controllers/authController")

router.get("/", auth.check, controller.index(userService))
router.get("/:id", auth.check, controller.show(userService))
router.post("/", auth.check, controller.store(userService))
router.put("/:id", auth.check, controller.update(userService))
router.delete("/:id", auth.check, controller.remove(userService))

module.exports = router
