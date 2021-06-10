const { Relationship } = require("@keystonejs/fields");

module.exports = {
	site: {
		type: Relationship,
		ref: "Site.exterior",
		many: false
	},
	body: {
		type: Relationship,
		ref: "Color",
		many: true
	},
	stain: {
		type: Relationship,
		ref: "Stain",
		many: true
	},
	trim: {
		type: Relationship,
		ref: "Color",
		many: true
	}
};
