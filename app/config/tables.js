const { execute } = require("../repositories/query");
const HandleError = require("../utils/ErrorHandler");
const { getMessage } = require("../utils/messages");

const createTable = (query) => {
	execute(query);
};

const createUsers = () => {
	const query = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    );`;
	createTable(query);
};

const createLinks = () => {
	const query = `CREATE TABLE IF NOT EXISTS links (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(150),
        url VARCHAR(255),
        user_id INT,
        active BOOLEAN,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;

	createTable(query);
};

const createProfiles = () => {
	const query = `CREATE TABLE IF NOT EXISTS profiles (
        id INT NOT NULL AUTO_INCREMENT,
        avatar VARCHAR(255),
        primary_color VARCHAR(70),
				secondary_color	VARCHAR(70),
				image_url VARCHAR(255),
				background_type VARCHAR(8) DEFAULT "COLOR",
        user_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;

	createTable(query);
};

const init = () => {
	const usersPromise = createUsers();
	const linksPromise = createLinks();
	const profilesPromise = createProfiles();

	Promise.all([usersPromise, linksPromise, profilesPromise])
		.then(() => {
			console.log("[Table] [Init] - Tabelas criadas com sucesso...");
		})
		.catch((err) => {
			throw HandleError({ message: getMessage("unexpectedError") }, err);
		});
};

module.exports = { init };
