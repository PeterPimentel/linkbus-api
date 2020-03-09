const Query = require("./query")

const index = () => {
	const query = "SELECT id, username, email FROM users"
	return Query.execute(query)
}

const show = (id) => {
	const query = `SELECT id, username, email FROM users WHERE id=${id}`
	return Query.execute(query)
}

const store = (data) => {
	const query = `INSERT INTO users(username, email, password)
    VALUES('${data.username}','${data.email}','${data.password}')`

	return Query.execute(query)
}

const remove = (id) => {
	const query = `DELETE FROM users WHERE id=${id}`
	return Query.execute(query)
}

const update = (id, data) => {
	const { username, email } = data
	const query = `UPDATE users SET username='${username}', email='${email}' WHERE id=${id}`
	return Query.execute(query)
}

const find = (field, value) => {
	const query = `SELECT id, username, email from users WHERE ${field} LIKE '${value}'`
	return Query.execute(query)
}

const findRaw = (usernameOrEmail) => {
	const query = `
	SELECT id, username, email, password
	FROM users
	WHERE username LIKE '${usernameOrEmail}' OR email LIKE'${usernameOrEmail}'`

	return Query.execute(query)
}

module.exports = { index, show, store, remove, update, find, findRaw }
