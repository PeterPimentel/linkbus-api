const Query = require("./query")

const index = (id) => {
	let query = `SELECT * FROM links WHERE client_id = ${id}`
	return Query.execute(query)
}

const show = (id) => {
	const query = `SELECT * FROM links WHERE id=${id}`
	return Query.execute(query)
}

const store = (link) => {
	const { url, name, position, client_id } = link
	const query = `INSERT INTO links(url, name, position, client_id ) 
		VALUES('${url}','${name}','${position}','${client_id}')`
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
