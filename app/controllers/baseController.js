const Log = require("../utils/Log")

const index = (service) => async (req, res) => {
	try {
		Log.trace("index", "baseController")
		const response = await service(req.query, req.auth)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const show = (service) => async (req, res) => {
	try {
		Log.trace("show", "baseController")
		const response = await service(req.params, req.auth)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const store = (service) => async (req, res) => {
	try {
		Log.trace("store", "baseController")
		const response = await service.store(req.auth, req.body)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const update = (service) => async (req, res) => {
	try {
		Log.trace("update", "baseController")
		const response = await service.update(req.auth, req.params, req.body)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

const remove = (service) => async (req, res) => {
	try {
		Log.trace("remove", "baseController")
		await service(req.params, req.auth)
		res.send(true)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

//Custom method pass through the service all possibles datas
const custom = (service) => async (req, res) => {
	try {
		Log.trace("custom", "baseController")
		const response = await service(req.params, req.body, req.query)
		res.send(response)
	} catch (error) {
		res.status(error.statusCode).send(error);
	}
}

module.exports = { index, show, store, update, remove, custom }
