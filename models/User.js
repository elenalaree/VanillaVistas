const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormatter");

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

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
			type: Schema.Types.ObjectId,
			ref: "Thought",
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

// remove user's thoughts when deleted
UserSchema.pre('remove', async function(next) {
    await Thought.remove({ _id: { $in: this.thoughts } })
  
    next();
  });


const User = model("User", UserSchema);

module.exports = User;
