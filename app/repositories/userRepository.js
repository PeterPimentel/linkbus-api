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

const update = (id, user) => {
	const { username, email } = user
	const query = `UPDATE users SET username='${username}', email='${email}' WHERE id=${id}`
	return Query.execute(query)
}

const find = (usernameOrEmail) => {
	const query = `SELECT id, username, email
	FROM users
	WHERE username LIKE '${usernameOrEmail}' OR email LIKE'${usernameOrEmail}'`
	return Query.execute(query)
}

const findRaw = (usernameOrEmail) => {
	const query = `
	SELECT id, username, email, password
	FROM users
	WHERE username LIKE '${usernameOrEmail}' OR email LIKE'${usernameOrEmail}'`

	return Query.execute(query)
}

const updatePassword = (id, password) => {
	console.log(`User ${id} called to change its password.`)
	const query = `UPDATE users SET password='${password}' WHERE id=${id}`
	return Query.execute(query)
}

module.exports = { index, show, store, remove, update, find, findRaw, updatePassword }
