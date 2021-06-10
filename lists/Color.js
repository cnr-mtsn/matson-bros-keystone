const { Text } = require("@keystonejs/fields");

module.exports = {
	name: {
		type: Text,
		isRequired: true
	},
	code: {
		type: Text
	}
};
