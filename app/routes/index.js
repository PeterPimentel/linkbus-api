module.exports = (app) => {
	app.use("/link", require("./link")),
	app.use("/user", require("./user"))

	//Add routes before that
	app.use("/", require("./vcard"))
}
