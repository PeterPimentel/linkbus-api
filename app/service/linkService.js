const LinkRepository = require("../repositories/linkRepository")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")

const index = async (user) => {
	try {
		console.log("[LinkService] Index")
		if(user.id){
			const links = await LinkRepository.index(user.id)
			return links
		}else{
			throw ErrorHandler.log({ message:getMessage("listError","link")}, error)	
		}
	} catch (error) {
		throw ErrorHandler.log({ message:getMessage("listError","link")}, error)	
	}
}

const show = async (user, params) => {
	try {
		console.log("[LinkService] Show")
		const links = await LinkRepository.show(user, params.id)
		if(Array.isArray(links) && links.length > 0){
			return links[0]
		}else{
			throw ErrorHandler.log({ message:getMessage("showError","link")})
		}
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("notAuthorized")},error)
	}
}

const store = async (user, data) => {
	try {
		console.log("[LinkService] Store")

		const link = { ...data, user_id:user.id }

		const response = await LinkRepository.store(link)

		return {
			...data,
			id:response.insertId,
			user_id:user.id
		}
	} catch (error) {
		throw ErrorHandler.log({ message:getMessage("createError","link")}, error)
	}
}

const update = async (user, params, data) => {
	try {
		console.log("[LinkService] Update")
		const result = await LinkRepository.update(user, params.id, data)
		if(result.affectedRows === 0){
			throw ErrorHandler.log({ message:getMessage("notAuthorized")})
		}else{
			return {...data}
		}
	} catch (error) {
		throw ErrorHandler.log({
			message:getMessage("unexpectedError"),
			status:500
		},error)
	}
}

const remove = async (user, params) => {
	try {
		console.log("[LinkService] Remove")
		const result = await LinkRepository.remove(user, params.id)
		if(result.affectedRows === 0){
			throw ErrorHandler.log({ message:getMessage("notAuthorized")})
		}else{
			return { response : true }
		}
	} catch (error) {
		throw ErrorHandler.log({
			message:getMessage("unexpectedError"),
			status:500
		},error)
	}
}

module.exports = { index, show, store, update, remove }
