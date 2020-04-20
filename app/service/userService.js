const UserRepository = require("../repositories/userRepository")
const cryptService = require("./cryptService")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")

const _validateUser = async (user) => {
	console.log("[UserService] ValidateUser")

	let _storedEmail = await UserRepository.find(user.email)
	let _storedUsername = await UserRepository.find(user.username)

	if(_storedEmail.length > 0 || _storedUsername.length > 0){
		const field = _storedEmail.length > 0 ? "email" : "username"
		throw ErrorHandler.log({
			message: getMessage("used",field)
		})
	}

	if(!user.password || user.password === "" || user.password === undefined ) {
		throw ErrorHandler.log({
			message: getMessage("invalidValue","password")
		})
	}

	return true
}

const index = async () => {
	try {
		console.log("[UserService] Index")
		const users = await UserRepository.index() 
		return users
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("listError","usuário")}, error)
	}
}

const show = async (params) => {
	try {
		console.log("[UserService] Show")
		const users = await UserRepository.show(params.id)
		if(Array.isArray(users) && users.length > 0){
			return users[0]
		}else{
			throw ErrorHandler.log({message:getMessage("notFound","Usuário")})
		}
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("resourceNotFound")}, error)
	}
}

const store = async (auth, data) => {
	try {
		console.log("[UserService] Store")
		await _validateUser(data)

		const password = await cryptService.hash(data.password)
		const user = {...data, password }

		const response = await UserRepository.store(user)

		return {id: response.insertId, ...user, password:undefined}
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("createError","usuário")
		},error)
	}
}

const update = async (auth, params, user) => {
	try {
		console.log("[UserService] Update")

		await _validateUser(user)

		await UserRepository.update(params.id, user)

		return user

	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("updateError","usuário")
		},error)
	}
}

const remove = async (auth, params) => {
	try {
		console.log("[UserService] Remove")
		await UserRepository.remove(params.id)
		return true
	} catch (error) {
		throw ErrorHandler.log({
			message: getMessage("deleteError","usuário")
		},error)
	}
}

const findByName = async (name) => {
	try {
		console.log("[UserService] FindByName")
		const users = await UserRepository.find(name)

		if(users && Array.isArray(users) && users.length > 0){
			return users[0]
		}else{
			throw ErrorHandler.log({
				message:getMessage("notFound","Usuário")
			})
		}
	} catch (error) {
		throw ErrorHandler.log({
			message:getMessage("unexpectedError"),
			status:500
		},error)
	}
}

const findRaw = async (usernameOrEmail) => {
	try {
		console.log("[UserService] findRawData")
		const users = await UserRepository.findRaw(usernameOrEmail)
		if(users && Array.isArray(users) && users.length > 0){
			return users[0]
		}else{
			throw ErrorHandler.log({
				message:getMessage("notFound","Usuário")
			})
		}
	} catch (error) {
		throw ErrorHandler.log({
			message:getMessage("unexpectedError"),
			status:500
		},error)
	}
}

module.exports = { index, show, store, update, remove, findByName, findRaw }
