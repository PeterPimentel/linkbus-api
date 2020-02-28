module.exports = (app) => {
	app.use("/link", require("./link")),
	app.use("/user", require("./user"))
}
