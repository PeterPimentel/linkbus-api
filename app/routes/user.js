const {Router} = require("express")
const router = Router();

const controller = require("../controllers/baseController")
const userService = require("../service/userService")

router.get("/", controller.index(userService))
router.get("/:id", controller.show(userService))
router.post("/", controller.store(userService))
router.put("/:id", controller.update(userService))
router.delete("/:id", controller.remove(userService))

module.exports = router
