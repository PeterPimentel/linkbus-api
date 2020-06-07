const authService = require("../service/authService")
const Log = require("../utils/Log")

const check = async (req, res, next) => {
	try {
		Log.trace("check", "authMiddleware")
		const response = await authService.check(req.cookies)
		req.auth = response.user
		next()
	} catch (error) {
		res.status(error.statusCode).send(error)
	}
}

module.exports = { check }
