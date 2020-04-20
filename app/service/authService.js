const jwt = require("jsonwebtoken")
const userService = require("./userService")
const cryptService = require("./cryptService")
const ErrorHandler = require("../utils/ErrorHandler")
const {getMessage} = require("../utils/messages")
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

const login = async (_, data) => {
	try {
		const user = await userService.findRaw(data.username)
		const match = cryptService.compare(data.password, user.password)
		if(match){
			const token = jwt.sign({...user, password:undefined }, PRIVATE_KEY, { expiresIn:"3h", algorithm: "HS256" });
			return {authorized: true, token, user:{...user, password:undefined}}
		}else{
			throw ErrorHandler.log({message:getMessage("userOrPassInvalid")})
		}
	} catch (error) {
		throw ErrorHandler.log({message:getMessage("unexpectedError")},error)
	}
}

const check = async (headers) => {
	try {
		if(headers.authorization){
			const token = headers.authorization.split(" ")
			if(token[0] === "Bearer"){
				const decoded = jwt.verify(token[1], PRIVATE_KEY)
				return {
					user:decoded,
					authorized: true
				}
			}else{
				throw ErrorHandler.log({message:getMessage("malformedToken")})
			}
		}else{
			throw ErrorHandler.log({message:getMessage("noToken")})
		}
	} catch (error) {
		switch (error.name) {
		case "TokenExpiredError":
			throw ErrorHandler.log({message:getMessage("expiredToken")},error)
		case "JsonWebTokenError":
			throw ErrorHandler.log({message:getMessage("malformedToken")},error)
		default:
			throw ErrorHandler.log({message:getMessage("unexpectedError")},error)
		}
	}
}

module.exports = { login, check }
