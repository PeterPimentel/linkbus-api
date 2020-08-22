const connection = require("../config/db");
const Log = require("../utils/Log");

const execute = (query) => {
	return new Promise((resolve, reject) => {
		Log.trace("Query - Execute", "repositories/query");
		connection.query(query, (erro, results) => {
			if (erro) {
				reject(erro);
			} else {
				Log.trace("success", "repositories/query");
				resolve(results);
			}
		});
	});
};

const transaction = (querys) => {
	const response = [];
	return new Promise((resolve, reject) => {
		Log.trace("Query - Transaction", "repositories/transaction");
		connection.beginTransaction((erro) => {
			if (erro) {
				connection.rollback(() => {
					reject(erro);
				});
			} else {
				Log.trace("begin transaction - success", "repositories/query");
				for (let index = 0; index < querys.length; index++) {
					connection.query(querys[index], (erro, result) => {
						if (erro) {
							connection.rollback(() => {
								reject(erro);
							});
						} else {
							Log.trace(`Query ${index} - success`, "repositories/query");
							response.push(result);
						}
					});
				}
				connection.commit(function (err) {
					if (err) {
						connection.rollback(() => {
							reject(erro);
						});
					} else {
						console.log("RESPONSE --- ", response);
						resolve(response);
					}
				});
			}
		});
	});
};

module.exports = { execute, transaction };
