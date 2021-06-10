const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
	builder: {
		type: Relationship,
		ref: "Builder.sites",
		many: false
	},
	location: {
		type: Text,
		isRequired: true
	},
	interior: {
		type: Relationship,
		ref: 'Interior.site',
		many: false
	},
	exterior: {
		type: Relationship,
		ref: 'Exterior.site',
		many: false
	},

};
