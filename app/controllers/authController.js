const AuthService = require("../service/authService")

const login = async (req, res) => {
	try {
		const user = await AuthService.login(req.bdoy)
		res.send(user)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

module.exports = { login }
