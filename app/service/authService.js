const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

const hash = async (password) => {
	try {
		return await bcrypt.hash(password, SALT_ROUNDS)
	} catch (error) {
		console.log("EEE",error)
	}
}

const login = async (data) => {
	const match = await bcrypt.compare(data.password, "123");

	if(match) {
		return {authorized: true}
	}else{
		throw {authorized : "User not found"}
	}
}

module.exports = { hash, login }
