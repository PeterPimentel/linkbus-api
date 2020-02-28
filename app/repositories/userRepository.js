const Query = require("./query")

const index = () => {
	const query = "SELECT firstname, lastname, email FROM users"
	return Query.execute(query)
}

const show = (id) => {
	const query = `SELECT firstname, lastname, email FROM users WHERE id=${id}`
	return Query.execute(query)
}

const store = (data) => {
	const query = `INSERT INTO users(firstname, lastname, email, password)
    VALUES('${data.firstname}', '${data.lastname}','${data.email}','${data.password}')`

	return Query.execute(query)
}

const remove = (id) => {
	const query = `DELETE FROM users WHERE id=${id}`
	return Query.execute(query)
}

const update = (id, data) => {
	const { url, name } = data
	const query = `UPDATE users SET url='${url}', name='${name}' WHERE id=${id}`
	return Query.execute(query)
}

module.exports = { index, show, store, remove, update }
