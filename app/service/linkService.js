const LinkRepository = require("../repositories/linkRepository")
const ErrorHandler = require("../utils/ErrorHandler")

const ERROR_DATA = { service :"LinkService" }

const index = async (user) => {
	try {
		console.log("[LinkService] Index")
		const links = await LinkRepository.index(user)
		return links
	} catch (error) {
		throw ErrorHandler.log({
			...ERROR_DATA,
			message:"Erro ao buscar a lista de links"
		},error)
	}
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
