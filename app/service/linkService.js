const LinkRepository = require("../repositories/linkRepository")

const index = async (user) => {
	console.log("[LinkService] Index")
	return LinkRepository.index(user)
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
	try {
		console.log("[LinkService] Store")
		const response = await LinkRepository.store(data)
		return { id:response.insertId, ...data }
	} catch (error) {
		console.log("DEE",error)
	}
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
