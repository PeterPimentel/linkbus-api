const UserRepository = require("../repositories/userRepository")

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
	console.log("[UserService] Store")
	return UserRepository.store(data)
}

const update = async (params, data) => {
	console.log("[UserService] Update")
	return UserRepository.update(params.id, data)
}

const remove = async (params) => {
	console.log("[UserService] Remove")
	return UserRepository.remove(params.id)
}

module.exports = { index, show, store, update, remove }
