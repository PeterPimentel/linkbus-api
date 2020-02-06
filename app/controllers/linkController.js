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

const show = async (req, res) => {
	try {
		const link = await LinkService.show(req.params)
		res.send(link)
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

const update = async (req, res) => {
	try {
		const link = await LinkService.update(req.params, req.body)
		res.send(link)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const remove = async (req, res) => {
	try {
		await LinkService.remove(req.params)
		res.send(true)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

module.exports = { index, show, store, update, remove }
