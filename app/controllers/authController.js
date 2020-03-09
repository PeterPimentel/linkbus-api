const authService = require("../service/authService")

const login = async (req, res) => {
	try {
		const token = await authService.login(req.body)
		res.send(token)
	} catch (error) {
		console.log("Erro")
		res.send(error)
	}
}

const check = async (req, res, next) => {
	try {
		const response = await authService.check(req.headers)
		if(response.authorized){
			req.auth = response.user
			next()
		}else{
			throw {"a":"a"}
		}
	} catch (error) {
		console.log("DEU Erro aqui", error)
	}
}

module.exports = { login, check }
