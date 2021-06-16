const dotenv = require("dotenv").config();
const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { createItems } = require("@keystonejs/server-side-graphql-client");

/*****	 DATA TYPES 	******/
const builderSchema = require("./lists/Builder");
const colorSchema = require("./lists/Color");
const siteSchema = require("./lists/Site");
const userSchema = require("./lists/User");
const interiorSchema = require("./lists/Interior");
const exteriorSchema = require("./lists/Exterior");
const stainSchema = require('./lists/Stain');
/*****	 DATA TYPES 	******/

/******  Imported Colors *******/
// const { sherwinColors } = require("./seed-data/colors");
// const { swInteriorStains } = require("./seed-data/interiorStain");
// const { swExteriorStains } = require("./seed-data/exteriorStain");
// TODO: interior/exterior stain
/******  Imported Colors *******/

/******  Access control functions	******/
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
	return !user ? false : { id: user.id };
};
const userIsAdminOrOwner = auth => {
	const isAdmin = access.userIsAdmin(auth);
	const isOwner = access.userOwnsItem(auth);
	return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };
/******  Access control functions	******/

/****** 	INITIALIZE KEYSTONE 	******/
const adapterConfig = { mongoUri: process.env.DATABASE_URI };
const keystone = new Keystone({
	adapter: new Adapter(adapterConfig),
	cookieSecret: process.env.COOKIE_SECRET,
	// Seed data on database connect
	onConnect: async keystone => {
		// await createItems({
		// 	keystone,
		// 	listKey: "Stain",
		// 	items: swExteriorStains
		// });
		console.log(`connected to database`)
	}
	// TODO: Park Ridge 111 ceilings/walls: crushed ice, enamel: iron ore, matson white
});
keystone.createList("Builder", {
	fields: builderSchema,
	access: {
		delete: access.userIsAdmin,
		update: access.userIsAdmin
	},
});
keystone.createList("Color", {
	fields: colorSchema,
	access: {
		update: access.userIsAdmin,
		delete: access.userIsAdmin
	},
});
keystone.createList("Interior", {
	fields: interiorSchema,
	labelResolver: item => item.site
});
// TODO: Interior Stain
keystone.createList("Stain", {
	fields: stainSchema,
})
keystone.createList("Exterior", {
	fields: exteriorSchema,
	labelResolver: item => item.site
});
keystone.createList("Site", {
	fields: siteSchema,
	labelResolver: item => item.location,
	access: {
		update: access.userIsAdmin,
		delete: access.userIsAdmin
	}

});
keystone.createList("User", {
	fields: userSchema,
	access: {
		update: access.userIsAdmin,
		delete: access.userIsAdmin,
		create: access.userIsAdmin
	}
});
/****** 	INITIALIZE KEYSTONE 	******/

/****** 	DEFINE AUTH STRATEGY 	******/
const authStrategy = keystone.createAuthStrategy({
	type: PasswordAuthStrategy,
	list: "User",
	config: { protectIdentities: process.env.NODE_ENV === "production" }
});
/****** 	DEFINE AUTH STRATEGY 	******/

module.exports = {
	keystone,
	apps: [
		new GraphQLApp(),
		new AdminUIApp({
			name: process.env.SITE_NAME,
			enableDefaultRoute: true,
			authStrategy
		})
	]
};
