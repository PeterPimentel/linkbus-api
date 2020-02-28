require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const connection = require("./app/config/db")

connection.connect(erro => {
	if (erro) {
		console.log(erro)
	}
	console.log("Connection with DB success")
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// routes
require("./app/routes")(app)

app.listen(3777, function () {
	console.log("App is listening on port 3777!");
});
