const jwt = require("jsonwebtoken")
const userService = require("./userService")
const cryptService = require("./cryptService")
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
				throw {authorized : "User not found"}
			}
		}else{
			throw {authorized : "User not found"}
		}
		
	} catch (error) {
		console.log("AuthService Erro -> ", error)
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
			}
		}else{
			throw {"errr0":"Mal formated"}
		}
	} catch (error) {
		throw {err:"DDD"}
	}
}

module.exports = { login, check }
