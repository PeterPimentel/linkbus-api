const LinkRepository = require("../repositories/linkRepository")

const index = async () => {
	console.log("[LinkService] Index")
	return LinkRepository.index()
}

const show = async (params) => {
	console.log("[LinkService] Show")
	const links = await LinkRepository.show(params.id)
	if(Array.isArray(links) && links.length > 0){
		return links[0]
	}else{
		return {message: "Link não encontrado"}
	}
}

const store = async (data) => {
	console.log("[LinkService] Store")
	return LinkRepository.store(data)
}

const update = async (params, data) => {
	console.log("[LinkService] Update")
	return LinkRepository.update(params.id, data)
}

const remove = async (params) => {
	console.log("[LinkService] Remove")
	return LinkRepository.remove(params.id)
}

module.exports = { index, show, store, update, remove }
