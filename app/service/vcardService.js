const linkService = require("./linkService")
const userService = require("./userService")

const show = async (params) => {
	console.log(params.name)
	const users = await userService.findByName(params.name)
	const links = await linkService.index(users[0])
	return {user: users[0], links}
}

module.exports = { show }