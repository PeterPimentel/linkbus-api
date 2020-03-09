const index = (service) => async (req, res) => {
	try {
		console.info("[baseController] - index")
		const response = await service.index(req.auth)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const show = (service) => async (req, res) => {
	try {
		console.info("[baseController] - show")
		const response = await service.show(req.auth, req.params)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const store = (service) => async (req, res) => {
	try {
		console.info("[baseController] - store")
		const response = await service.store(req.auth, req.body)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const update = (service) => async (req, res) => {
	try {
		const response = await service.update(req.auth, req.params, req.body)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const remove = (service) => async (req, res) => {
	try {
		await service.remove(req.auth, req.params)
		res.send(true)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const custom = (method, service) => async (req, res) => {
	try {
		const response = await service[method](req.params)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

module.exports = { index, show, store, update, remove, custom }
