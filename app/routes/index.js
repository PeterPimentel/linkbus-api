module.exports = (app) => {
	app.use("/link", require("./link")),
	app.use("/user", require("./user"))
	app.use("/profile", require("./profile"))
	app.use("/auth", require("./auth"))

	//Add routes before that
	app.use("/", require("./vcard"))
}
