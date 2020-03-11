const userService = require("./userService")
const linkService = require("./linkService")
const profileService = require("./profileService")
const ErrorHandler = require("../utils/ErrorHandler")

const show = async (params) => {
	try {
		console.log("[VCardService] Show")
		const user = await userService.findByName(params.name)
		const linkPromise = await linkService.index(user)
		const profilePromise = await profileService.index(user)

		return Promise.all([linkPromise, profilePromise]).then((result) => {
			return {
				user,
				links:result[0],
				profile: result[1]
			}
		})
	} catch (error) {
		throw ErrorHandler.log({message:"Ocorreu um erro ao listar os dados do usuário"},error)
	}
}

module.exports = { show }