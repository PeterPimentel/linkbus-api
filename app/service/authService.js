const jwt = require("jsonwebtoken")
const userService = require("./userService")
const cryptService = require("./cryptService")
const ErrorHandler = require("../utils/ErrorHandler")
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

const login = async (data) => {
	try {
		const user = await userService.findRaw(data.username)
		const match = cryptService.compare(data.password, user.password)
		if(match){
			const token = jwt.sign({...user, password:undefined }, PRIVATE_KEY, { algorithm: "HS256" });
			if(token) {
				return {authorized: true, token, user:{...user, password:undefined}}
			}else{
				throw ErrorHandler.log({message:"Ocorreu um erro inesperado"})
			}
		}else{
			throw ErrorHandler.log({message:"Usuário ou senha inválido"})
		}
		
	} catch (error) {
		throw ErrorHandler.log({message:"Ocorreu um erro inesperado"},error)
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
				throw ErrorHandler.log({message:"Token mal formatado"})	
			}
		}else{
			throw ErrorHandler.log({message:"Token inválido"})
		}
	} catch (error) {
		throw ErrorHandler.log({message:"Ocorreu um erro inesperado"},error)
	}
}

module.exports = { login, check }
