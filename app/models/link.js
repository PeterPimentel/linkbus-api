const Sequelize = require("sequelize")
const sequelize = require("../config/db")
const Model = Sequelize.Model;

class Link extends Model {}

Link.init({
	url: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, { sequelize, modelName: "link" });

module.exports = Link
