const {langProvider} = require("../config/langProvider")

const getMessage = (key, ...params) => {
	const interpolation = params.reduce((acc, curr, idx)=>{
		return {...acc, [idx]:curr }
	},{})
	return langProvider.t(key, interpolation);
}

module.exports = { getMessage }
