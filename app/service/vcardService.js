const userService = require("./userService")
const linkService = require("./linkService")
const profileService = require("./profileService")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")

const show = async (params) => {
	try {
		console.log("[VCardService] Show")
		const user = await userService.findByName(params.name)
		const linkPromise = await linkService.index(user)
		const profilePromise = await profileService.index(user)

		const result = await Promise.all([linkPromise, profilePromise])
		return {
			user,
			links:result[0],
			profile: result[1]
		}

	} catch (error) {
		throw ErrorHandler.log({message:getMessage("unexpectedError")},error)
	}
}

module.exports = { show }
