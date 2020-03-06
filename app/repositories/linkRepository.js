const Query = require("./query")

const index = (user) => {
	console.log("SSSS", user.id)
	const query = `SELECT * FROM links WHERE client_id = ${user.id}`
	return Query.execute(query)
}

const show = (id) => {
	const query = `SELECT * FROM links WHERE id=${id}`
	return Query.execute(query)
}

const store = (data) => {
	const query = `INSERT INTO links(url) VALUES('${data.url}')`
	return Query.execute(query)
}

const remove = (id) => {
	const query = `DELETE FROM links WHERE id=${id}`
	return Query.execute(query)
}

const update = (id, data) => {
	const { url, name, position } = data
	const query = `UPDATE links SET url='${url}', name='${name}', position='${position}' WHERE id=${id}`
	return Query.execute(query)
}

module.exports = { index, show, store, remove, update }
