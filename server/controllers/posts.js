var Post = require('./../models/post');
var User = require('./../models/user');

module.exports = {
	index: function(req, res) {
		Post.find({}).populate('_user').populate('comments').exec(function(err, users_posts) {
			if (err) {
				res.json(err);
			} else {
				res.json(users_posts);			
			}
		});
	},

	create: function(req, res) {
		User.findOne({_id: req.body.user_id}, function(err, selectedUser) {
			var post = new Post({text: req.body.text});
			post._user = selectedUser._id; 
			post.save(function(err) {
				selectedUser.posts.push(post);
				selectedUser.save(function(err) {
					if (err) {
						res.json(err);
					} else {
						res.json(post);
					}
				});
			});
		});
	},
};