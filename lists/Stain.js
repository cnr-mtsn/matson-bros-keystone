const { Text } = require("@keystonejs/fields");

module.exports = {
	name: {
		type: Text,
		isRequired: true
	},
	code: {
		type: Text
	},
	image: {
		type: Text,
	},
	notes: {
		type: Text,
	}
};
