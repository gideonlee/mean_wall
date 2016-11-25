var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: function(name) {
				return name.length > 1;
			},
			message: 'Name must be longer than one character.',
		}
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(email) {
				var emailRegex = /^[\w\.+_-]+@[\w\._-]+\.[\w]*$/;
				return emailRegex.test(email);
			},
			message: 'Email is not valid'
		}
	},
	password: {
		type: String,
		required: true, 
		validate: {
			validator: function(password) {
				return password.length >= 4;
			},
			message: 'Password is too short.'
		}
	},
	posts: [
		{ 
			type: Schema.Types.ObjectId, 
			ref: 'Post'
		}
	],
}, {timestamps: true});

UserSchema.methods.comparePasswords = function(password_confirm) {
	return this.password === password_confirm; 
};

UserSchema.methods.encryptPassword = function() {
	return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
};

UserSchema.methods.decryptPassword = function(user_input_pw) {
	return bcrypt.compareSync(user_input_pw, this.password);
};

module.exports = mongoose.model('User', UserSchema);
