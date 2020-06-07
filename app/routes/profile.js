const {Router} = require("express");
const router = Router();

const controller = require("../controllers/baseController")
const auth = require("../middlewares/authMiddleware")
const profileService = require("../service/profileService")

router.get("/", auth.check, controller.index(profileService.index))
router.post("/", auth.check, controller.store(profileService.store))
router.put("/:id", auth.check, controller.update(profileService.update))
router.delete("/:id", auth.check, controller.remove(profileService.remove))

module.exports = router