const Query = require("./query")
//TODO adicionar background_image
const index = (userId) => {
	const query = `SELECT * FROM profiles WHERE user_id=${userId} `
	return Query.execute(query)
}

const store = (data) => {
	const {avatar, primary_color, secondary_color, user_id} = data

	const query = `INSERT INTO profiles(avatar, primary_color, secondary_color, user_id)
    VALUES('${avatar}','${primary_color}','${secondary_color}','${user_id}')`

	return Query.execute(query)
}

const remove = (user, id) => {
	const query = `DELETE FROM profiles WHERE id=${id} AND user_id=${user.id}`
	return Query.execute(query)
}

const update = (user, id, profile) => {
	const {avatar, primary_color, secondary_color} = profile

	const query = `UPDATE profiles
	SET avatar='${avatar}', primary_color='${primary_color}',secondary_color='${secondary_color}'
	WHERE id=${id} AND user_id=${user.id}`

	return Query.execute(query)
}

module.exports = { index, store, remove, update }
