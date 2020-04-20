const connection = require("../config/db")
const Log = require("../utils/Log")

const execute = (query) => {
	return new Promise((resolve, reject)=> {
		Log.trace("Query - Execute", "repositories/query")
		connection.query(query, (erro, results) => {
			if (erro) {
				reject(erro)
			} else {
				Log.trace("success", "repositories/query")
				resolve(results)
			}
		})
	})
}

module.exports = { execute }
