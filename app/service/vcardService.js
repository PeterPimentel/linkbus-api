const linkService = require("./linkService")
const userService = require("./userService")
const ErrorHandler = require("../utils/ErrorHandler")

const show = async (params) => {
	try {
		console.log("[VCardService] Show")
		const user = await userService.findByName(params.name)
		const links = await linkService.index(user)
		return {user, links}
	} catch (error) {
		throw ErrorHandler.log({message:"Ocorreu um erro ao listar os dados do usuário"},error)
	}
}

module.exports = { show }