const Log = require("./Log")

const log = ({ message, status = 400}, error = {}) => {
	Log.error(message, "Error Handler")

	let originStackTrace = "No Trace provided"
	let code = 0
	
	if(error){
		Log.error(error.message, "Error Handler - Trace")
		originStackTrace = error.message
		code = error.code
	}
	
	let customMessage = message
	let customStatus = status
    
	if(error.formated){
		customMessage = error.message
		customStatus = error.statusCode
		originStackTrace = error.stackTrace
	}
    
	const customError = new Error(customMessage)
    
	customError.description = customMessage
	customError.statusCode = customStatus
	customError.formated = true
    
	if(process.env.PRODUCTION === "true"){
		return customError
	}else{
		customError.code = code
		customError.stackTrace = originStackTrace
		return customError
	}
}

module.exports = {log}
