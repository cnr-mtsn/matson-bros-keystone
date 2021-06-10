const { Relationship } = require("@keystonejs/fields");

module.exports = {
	site: {
		type: Relationship,
		ref: "Site.interior",
		many: false
	},
	ceiling: {
		type: Relationship,
		ref: 'Color',
		many: true,
	},
	closet: {
		type: Relationship,
		ref: 'Color',
		many: true,
	},
	stain: {
		type: Relationship,
		ref: 'Stain',
		many: true,
	},
	trim: {
		type: Relationship,
		ref: 'Color',
		many: true,
	},
	walls: {
		type: Relationship,
		ref: 'Color',
		many: true,
	}

};
