const Query = require("./query");

const index = (id, queryParams) => {
	let AND = "";
	if (queryParams.active) {
		AND = `${AND} AND active=${queryParams.active}`;
	}
	if (queryParams.name) {
		AND = `${AND} AND name='${queryParams.name}'`;
	}

	let query = `SELECT * FROM links WHERE user_id = ${id} ${AND} ORDER BY position ASC`;
	return Query.execute(query);
};

const show = (user, id) => {
	const query = `SELECT * FROM links WHERE id=${id} AND user_id=${user.id} WHERE active=1`;
	return Query.execute(query);
};

const store = (link) => {
	const { url, name, position, active, user_id } = link;
	const query = `INSERT INTO links(url, name, position, active, user_id )
		VALUES('${url}','${name}','${position}','${active}','${user_id}')`;
	return Query.execute(query);
};

const remove = (user, id) => {
	const query = `DELETE FROM links WHERE id=${id} AND user_id=${user.id}`;
	return Query.execute(query);
};

const update = (user, id, data) => {
	const { url, name, position, active } = data;

	const query = `UPDATE links SET
		url='${url}', name='${name}', position='${position}', active='${active}'
		WHERE id=${id} AND user_id=${user.id}`;

	return Query.execute(query);
};

const bulkUpdate = (user, links) => {
	const querys = links.map(
		(link) => `UPDATE links SET
		url='${link.url}', name='${link.name}', position='${link.position}', active='${link.active}'
		WHERE id=${link.id} AND user_id=${user.id}`
	);

	return Query.transaction(querys);
};

module.exports = { index, show, store, remove, update, bulkUpdate };
