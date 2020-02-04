const LinkService = require("../service/linkService")

const index = async (req, res) => {
	try {
		const links = await LinkService.index()
		res.send(links)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const store = async (req, res) => {
	try {
		const links = await LinkService.store(req.body)
		res.send(links)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

module.exports = { index, store }
