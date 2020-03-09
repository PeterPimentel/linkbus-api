
const log = ({ message, status = 400}, error = {}) => {
	console.warn(`Error Handler - [Message] - ${message}`)
	
	let originStackTrace = "No Trace provided"
	let code = 0

	if(error){
		console.warn(`Error Handler - [Trace] - ${error.message}`)
		originStackTrace = error.message
		code = error.code
	}

	let customMessage = message
    
	if(error.formated){
		customMessage = error.message,
		originStackTrace = error.stackTrace
	}
    
	const customError = new Error(customMessage)
    
	customError.description = customMessage
	customError.statusCode = status
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
