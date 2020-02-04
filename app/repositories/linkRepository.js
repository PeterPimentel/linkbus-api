const Query = require("./query")

const index = () => {
	const query = "SELECT * FROM links"
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

const update = (newLink) => {
	const { id, url } = newLink
	const query = `UPDATE Clientes SET url='${url}' WHERE id=${id}`
	return Query.execute(query)
}

module.exports = { index, show, store, remove, update }
