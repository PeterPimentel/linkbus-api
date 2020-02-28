const index = (service) => async (req, res) => {
	try {
		console.info("[baseController] - index")
		const response = await service.index()
		res.send(response)
	} catch (error) {
		console.log("Error")
	}
}

const show = (service) => async (req, res) => {
	try {
		console.info("[baseController] - show")
		const response = await service.show(req.params)
		res.send(response)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const store = (service) => async (req, res) => {
	try {
		console.info("[baseController] - store")
		const response = await service.store(req.body)
		res.send(response)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const update = (service) => async (req, res) => {
	try {
		const response = await service.update(req.params, req.body)
		res.send(response)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const remove = (service) => async (req, res) => {
	try {
		await service.remove(req.params)
		res.send(true)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

const custom = (method, service) => async (req, res) => {
	try {
		const response = await service[method](req.params)
		res.send(response)
	} catch (error) {
		console.log("Erro"),
		res.send(error)
	}
}

module.exports = { index, show, store, update, remove, custom }
