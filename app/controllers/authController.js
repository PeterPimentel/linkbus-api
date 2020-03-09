const authService = require("../service/authService")

const login = async (req, res) => {
	try {
		const token = await authService.login(req.body)
		res.send(token)
	} catch (error) {
		res.status(error.statusCode).send(error)
	}
}

const check = async (req, res, next) => {
	try {
		const response = await authService.check(req.headers)
		req.auth = response.user
		next()
	} catch (error) {
		res.status(error.statusCode).send(error)
	}
}

module.exports = { login, check }
