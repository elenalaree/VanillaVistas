const { User, Thought } = require("../models");

const userController = {
	//get all users
	getAllUsers(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//get one user by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })

			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(400).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//create User
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
	addFriend({ params}, res) { 
		User.findOneAndUpdate(
			{_id: params.userId },
			{$push: { friends: params.friendId } },
			{ new: true}
		)
		.select("-__v")
		.then(dbUserData => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with that Id '});
				return;
			}
			res.json({ message: 'User added to friend list!', dbUserData })
		})
		.catch(err => res.status(400).json(err));
	},


	//update user
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	//delete User
	deleteUser({ params }, res) {
		console.log(params)
		User.findById({ _id: params.id })
            .select('-__v')
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
				}
				
				return Thought.findOneAndUpdate(
					{_id : params.id },
					{$pull: {thoughts: params.thoughtId }},
					{ new: true }
				)
				
				.then(dbUserData => {
					res.json({ message: `The user ${dbUserData.username} was deleted.`, dbUserData, dbThoughtData})
				})
			})
			.catch((err) => res.status(400).json(err));
	},
	removeFriend({params}, res) {
		User.findOneAndUpdate(
			{ _id: params.userId},
			{ $pull: {friends: params.friendId}},
			{ new: true }
		)
		.select('-__v')
		.then(dbUserData => {
			if(!dbUserData) {
				res.status(404).json({ message: "No user was found"});
				return;
			}
			res.json({ message: "That User was removed from your list", dbUserData });
		})
		.catch(err => res.status(400).json(err));
	}
};

module.exports = userController;
