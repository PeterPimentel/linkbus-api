const {Router} = require("express");
const router = Router();

const controller = require("../controllers/baseController")
const auth = require("../controllers/authController")
const profileService = require("../service/profileService")

router.get("/", auth.check, controller.index(profileService))
router.post("/", auth.check, controller.store(profileService))
router.put("/:id", auth.check, controller.update(profileService))
router.delete("/:id", auth.check, controller.remove(profileService))

module.exports = router