const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormatter");

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	thoughts: [
		{
			type: ObjectId,
			ref: "Thoughts",
		},
	],
	friends: [
		{
			type: ObjectId,
			ref: "User",
		},
	],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
