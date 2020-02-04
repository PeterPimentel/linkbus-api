const LinkRepository = require("../repositories/linkRepository")

const index = async () => {
	console.log("[LinkService] Index")
	return LinkRepository.index()
}

const store = async (data) => {
	console.log("[LinkService] Store")
	return LinkRepository.store(data)
}

module.exports = { index, store}