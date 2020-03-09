const connection = require("../config/db")

const execute = (query) => {
	return new Promise((resolve, reject)=> {
		console.log("[Query] - Executing query...")
		connection.query(query, (erro, results) => {
			if (erro) {
				reject(erro)
			} else {
				console.log("[Query] - SUCCESS")
				resolve(results)
			}
		})
	})
}

module.exports = { execute }
