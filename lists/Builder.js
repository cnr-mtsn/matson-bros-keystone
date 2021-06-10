const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
	name: {
		type: Text,
		isRequired: true,
		schemaDoc: "Name of a builder"
	},
	phone: {
		type: Text,
		schemaDoc: "Phone number of a builder"
	},
	sites: {
		type: Relationship,
		ref: "Site.builder",
		many: true
	}
};
