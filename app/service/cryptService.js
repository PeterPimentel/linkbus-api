const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")
const SALT_ROUNDS = 10

const hash = async (password) => {
	try {
		return await bcrypt.hash(password, SALT_ROUNDS)
	} catch (error) {
		throw ErrorHandler.log({
			message:getMessage("unexpectedError"),
			status:500
		},error)
	}
}

const compare = async (password, storedPassword) => {
	return bcrypt.compare(password, storedPassword);
}

module.exports = {hash, compare}
