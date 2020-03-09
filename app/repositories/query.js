const connection = require("../config/db")

const execute = (query) => {
	return new Promise((resolve, reject)=> {
		console.log("Executing query...")
		connection.query(query, (erro, results) => {
			if (erro) {
				reject(erro)
			} else {
				resolve(results)
			}
		})
	})
}

module.exports = { execute }
