
const log = ({ message, status = 400}, error) => {
	console.log(`Error Handler - [Message] - ${message}`)
	console.log(`Error Handler - [Trace] - ${error.message}`)
    
	let customMessage = message
	let originStackTrace = error.message
    
	if(error.formated){
		customMessage = `${error.message} -> \n ${customMessage}`,
		originStackTrace = error.stackTrace
	}
    
	const customError = new Error(customMessage)
    
	customError.description = customMessage
	customError.statusCode = status
	customError.formated = true
    
	console.log(customError)
    
	if(process.env.PRODUCTION === "true"){
		return customError
	}else{
		customError.code = error.code
		customError.stackTrace = originStackTrace
		return customError
	}
}

module.exports = {log}