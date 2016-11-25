var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	_post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
	},
	text: {
		type: String,
		required: true,
	}

}, {timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);