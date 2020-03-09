const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

const hash = async (password) => {
	try {
		return await bcrypt.hash(password, SALT_ROUNDS)
	} catch (error) {
		console.log("EEE",error)
	}
}

const compare = async (password, storedPassword) => {
	return bcrypt.compare(password, storedPassword);
}

module.exports = {hash, compare}