const LinkRepository = require("../repositories/linkRepository")
const ErrorHandler = require("../utils/ErrorHandler")
const messages = require("../utils/messages.json")

const index = async (user) => {
	try {
		console.log("[LinkService] Index")
		if(user.id){
			const links = await LinkRepository.index(user.id)
			return links
		}else{
			throw ErrorHandler.log({ message:messages["listError"]}, error)	
		}
	} catch (error) {
		throw ErrorHandler.log({ message:messages["listError"]}, error)
	}
}

const show = async (user, params) => {
	console.log("[LinkService] Show")
	const links = await LinkRepository.show(params.id)
	if(Array.isArray(links) && links.length > 0){
		return links[0]
	}else{
		throw ErrorHandler.log({ message:`Link com ID - ${params.id} não encontrado.`}, error)
	}
}

const store = async (user, data) => {
	try {
		console.log("[LinkService] Store")

		const link = { ...data, client_id:user.id }

		const response = await LinkRepository.store(link)

		return {
			...data,
			id:response.insertId,
			client_id:user.id
		}
	} catch (error) {
		throw ErrorHandler.log({ message:"Ocorreu um erro inesperado na criação do Link"}, error)
	}
}

const update = async (user, params, data) => {
	console.log("[LinkService] Update")
	return LinkRepository.update(params.id, data)
}

const remove = async (user, params) => {
	console.log("[LinkService] Remove")
	return LinkRepository.remove(params.id)
}

module.exports = { index, show, store, update, remove }
