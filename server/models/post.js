var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
		required: true, 
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);