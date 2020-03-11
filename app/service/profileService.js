const profileRepository = require("../repositories/profileRepository")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")

const index = async (auth) => {
	try {
		console.log("[ProfileService] Index")
		const profile = await profileRepository.index(auth.id)

		if(Array.isArray(profile) && profile.length > 0){
			return profile[0]
		}else{
			console.log("[ProfileService] Index - Empty profile")
			return {}
		}
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("listError","perfil")}, error)
	}
}

const store = async (auth, data) => {
	try {
		console.log("[ProfileService] Store")

		const response = await profileRepository.store(data)

		return {id: response.insertId, ...data}
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("createError","profile")
		},error)
	}
}

const update = async (auth, params, profile) => {
	try {
		console.log("[ProfileService] Update")

		await profileRepository.update(params.id, profile)

		return profile

	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("updateError","profile")
		},error)
	}
}

const remove = async (auth, params) => {
	try {
		console.log("[ProfileService] Remove")
		await profileRepository.remove(params.id)
		return true
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("deleteError","profile")
		},error)
	}
}

module.exports = { index, store, update, remove }
