const connection = require("../config/db");
const Log = require("../utils/Log");

const execute = (query) => {
	return new Promise((resolve, reject) => {
		Log.trace("Query - Execute", "repositories/query");
		connection.query(query, (error, results) => {
			if (error) {
				reject(error);
			} else {
				Log.trace("success", "repositories/query");
				resolve(results);
			}
		});
	});
};

const _executeQuery = (query) => {
	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				Log.trace("Promise Query - ERROR", error.code);
				connection.rollback(() => {
					reject(error);
				});
			} else {
				Log.trace("Promise Query - SUCCESS");
				resolve(result);
			}
		});
	});
};

const _executeTransactionalQuerys = (querys) => {
	return new Promise((resolve, reject) => {
		Log.trace("Transactional Querys", "repositories/transaction");
		const promiseQuerys = querys.map((query) => _executeQuery(query));

		Promise.all(promiseQuerys)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};

const transaction = (querys) => {
	return new Promise((resolve, reject) => {
		Log.trace("Query - Transaction", "repositories/transaction");
		connection.beginTransaction((error) => {
			if (error) {
				Log.trace("Begin - ERROR", "repositories/transaction");
				connection.rollback(() => {
					reject(error);
				});
			} else {
				Log.trace("Begin - SUCCESS", "repositories/transaction");
				_executeTransactionalQuerys(querys)
					.then((result) => {
						connection.commit(function (err) {
							if (err) {
								Log.trace("Commit - ERROR", "repositories/transaction");
								connection.rollback(() => {
									reject(error);
								});
							} else {
								resolve(result);
							}
						});
					})
					.catch((err) => {
						Log.trace("Query Error - ERROR", "repositories/transaction");
						connection.rollback(() => {
							reject(err);
						});
					});
			}
		});
	});
};

module.exports = { execute, transaction };
