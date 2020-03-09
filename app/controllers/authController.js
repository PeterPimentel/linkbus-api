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
		if(response.authorized){
			req.auth = response.user
			next()
		}else{
			throw new Error("Usuário não autorizado")
		}
	} catch (error) {
		res.status(error.statusCode).send(error)
	}
}

module.exports = { login, check }
