const Query = require("./query")

const index = (userId) => {
	const query = `SELECT * FROM profiles WHERE user_id=${userId} `
	return Query.execute(query)
}

const store = (data) => {
	const {avatar, color, user_id} = data

	const query = `INSERT INTO profiles(avatar, color, user_id)
    VALUES('${avatar}','${color}','${user_id}')`

	return Query.execute(query)
}

const remove = (user, id) => {
	const query = `DELETE FROM profiles WHERE id=${id} AND user_id=${user.id}`
	return Query.execute(query)
}

const update = (user, id, profile) => {
	const {avatar, color} = profile

	const query = `UPDATE profiles SET avatar='${avatar}', color='${color}' WHERE id=${id} AND user_id=${user.id}`

	return Query.execute(query)
}

module.exports = { index, store, remove, update }
