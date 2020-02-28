const UserService = require("../service/userService")

const store = async (req, res) => {
	try {
		const user = await UserService.store(req.body)
		res.send(user)
	} catch (error) {
		console.log("Errr", error)
	}
}

const show = async (req, res) => {
	try {
		const user = await UserService.show(req.params)
		res.send(user)
	} catch (error) {
		console.log("DDDDD",error)
	}
}

module.exports = { store, show }
