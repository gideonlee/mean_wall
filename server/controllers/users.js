var User = require('./../models/user');

module.exports = {
	index: function(req, res) {
		User.find({}, function(err, allUsers) {
			if (err) {
				res.json(err);
			} else {
				res.json(allUsers);
			}
		})
	},

	create: function(req, res) {
		var newUser = new User(req.body);
		var errors = newUser.validateSync();

		if (!errors) {
			if (newUser.comparePasswords(req.body.password_confirm)) {
				newUser.password = newUser.encryptPassword();
				newUser.email = req.body.email.toLowerCase();
				newUser.save(function(err, user) {
					if (err) {
						res.json(err);
					} else {
						res.json(user);
					}
 				});
			} else {
				res.json({errors: 'Passwords do not match.'});
			}
		} else {
			res.status(400);
			res.json(errors);
		}
	},

	findUser: function(req, res) {
		User.find({_id: req.params.id}, function(err, selectedUser) {
			if (err) {
				res.json(err);
			} else {
				res.json(selectedUser[0]);
			}
		})
	},

	login: function(req, res) {
		if (req.body.email === undefined) {
			res.status(400);
			res.json({errors: 'Email Field is empty.'});
		} else {
			User.find({email: req.body.email.toLowerCase()}, function(err, selectedUser) {
				if (err) {
					res.json(err);
				} else {
					if (selectedUser[0] && selectedUser[0].decryptPassword(req.body.password)) {
						res.json(selectedUser[0]);
					} else {
						res.status(400);
						res.json({errors: 'Email/Password is invalid.'});
					}
				}
			});			
		}
	},
};