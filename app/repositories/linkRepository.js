const Query = require("./query")

const index = () => {
	const query = "SELECT * FROM links"
	return Query(query)
}

const store = (data) => {
	const query = `INSERT INTO links(url) VALUES('${data.url}')`
	return Query(query)
}

module.exports = { index, store }
