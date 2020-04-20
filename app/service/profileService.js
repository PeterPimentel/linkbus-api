const profileRepository = require("../repositories/profileRepository")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")

const Log = require("../utils/Log")

const index = async (query, user) => {
	try {
		Log.trace("Index","ProfileService")
		const profile = await profileRepository.index(user.id)

		if(Array.isArray(profile) && profile.length > 0){
			return profile[0]
		}else{
			Log.warn("Index - Empty profile", "ProfileService")
			return {}
		}
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("listError","perfil")}, error)
	}
}

const store = async (user, data) => {
	try {
		Log.trace("Store", "ProfileService")

		const response = await profileRepository.store(data)

		return {id: response.insertId, ...data}
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("createError","profile")
		},error)
	}
}

const update = async (user, params, profile) => {
	try {
		Log.trace("Update", "ProfileService")

		const result = await profileRepository.update(user, params.id, profile)

		if(result.affectedRows === 0){
			throw ErrorHandler.log({ message:getMessage("notAuthorized")})
		}else{
			return { ...profile }
		}
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("updateError","profile")
		},error)
	}
}

const remove = async (params, user) => {
	try {
		Log.trace("Remove", "ProfileService")
		const result = await profileRepository.remove(user, params.id)
		if(result.affectedRows === 0){
			throw ErrorHandler.log({ message:getMessage("notAuthorized")})
		}else{
			return { response : true }
		}
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("deleteError","profile")
		},error)
	}
}

module.exports = { index, store, update, remove }
