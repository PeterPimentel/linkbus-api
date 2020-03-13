const Query = require("./query")

const index = (id) => {
	let query = `SELECT * FROM links WHERE user_id = ${id} ORDER BY position ASC`
	return Query.execute(query)
}

const show = (user, id) => {
	const query = `SELECT * FROM links WHERE id=${id} AND user_id=${user.id}`
	return Query.execute(query)
}

const store = (link) => {
	const { url, name, position, user_id } = link
	const query = `INSERT INTO links(url, name, position, user_id ) 
		VALUES('${url}','${name}','${position}','${user_id}')`
	return Query.execute(query)
}

const remove = (user, id) => {
	const query = `DELETE FROM links WHERE id=${id} AND user_id=${user.id}`
	return Query.execute(query)
}

const update = (user, id, data) => {
	const { url, name, position } = data
	const query = `UPDATE links SET 
		url='${url}', name='${name}', position='${position}' 
		WHERE id=${id} AND user_id=${user.id}`

	return Query.execute(query)
}

module.exports = { index, show, store, remove, update }
