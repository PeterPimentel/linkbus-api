require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const connection = require("./app/config/db");
const tables = require("./app/config/tables");
const lang = require("./app/config/langProvider");

connection.connect((erro) => {
	if (erro) {
		console.log("Connection Error");
		console.log(erro);
	} else {
		tables.init();
		console.log("Connection with DB success");
	}
});

lang.init();
app.use(
	cors({
		origin: [`${process.env.FRONT_URL}`, "http://localhost:3000"],
		credentials: true,
	})
);

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// routes
require("./app/routes")(app);

app.listen(3777, function () {
	console.log("App is listening on port 3777!");
});
