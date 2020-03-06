const UserRepository = require("../repositories/userRepository")
const AuthService = require("./authService")

const index = async () => {
	console.log("[UserService] Index")
	return UserRepository.index()
}

const show = async (params) => {
	console.log("[UserService] Show")
	const users = await UserRepository.show(params.id)
	if(Array.isArray(users) && users.length > 0){
		return users[0]
	}else{
		return {message: "Usuário não encontrado"}
	}
}

const store = async (data) => {
	try {
		console.log("[UserService] Store")
		const password = await AuthService.hash(data.password)
		data.password = password

		const response = await UserRepository.store(data)

		return {id: response.insertId, ...data}
	} catch (error) {
		console.log("ERRROU",error)
	}
}

const update = async (params, data) => {
	console.log("[UserService] Update")
	return UserRepository.update(params.id, data)
}

const remove = async (params) => {
	console.log("[UserService] Remove")
	return UserRepository.remove(params.id)
}

const findByName = async (name) => {
	console.log("[UserService] FindByName")
	return UserRepository.find("firstname",name)
}

module.exports = { index, show, store, update, remove, findByName }
