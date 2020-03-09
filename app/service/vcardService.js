const linkService = require("./linkService")
const userService = require("./userService")

const show = async (params) => {
	console.log(params.name)
	const user = await userService.findByName(params.name)
	const links = await linkService.index(user)
	return {user, links}
}

module.exports = { show }