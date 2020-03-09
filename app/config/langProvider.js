const i18next = require("i18next");
const pt_BR = require("../lang/pt_BR.json")

const init = () => {
	i18next.init({
		lng: "pt_BR",
		resources: {
			pt_BR: pt_BR
		}
	}, function(err) {
		if(err){
			console.log("Internalization ERROR")
		}
	});
}


module.exports = {init, langProvider: i18next}