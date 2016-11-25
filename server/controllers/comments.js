var Post = require('./../models/post');
var Comment = require('./../models/comment');

var User = require('./../models/user');

module.exports = {
	index: function(req, res) {
		Comment.find({}).populate('_post').populate('_user').exec(function(err, allComments) {
			res.json(allComments);
		});
	},

	create: function(req, res) {
		Post.findOne({_id: req.body.post_id}, function(err, selectedPost) {
			var comment = new Comment({text: req.body.text, _user: req.body.user_id, _post: req.body.post_id});
			comment.save(function(err) {
				selectedPost.comments.push(comment);
				selectedPost.save(function(err) {
					if (err) {
						res.json(err);
					} else {
						res.json(comment);
					}
				});
			});

			// Does the order of the collection saving matter?
				// selectedPost.comments.push(comment);
				// selectedPost.save(function(err) {

				// })
		});
	},
};