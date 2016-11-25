var mongoose = require('mongoose');
var path = require('path');
mongoose.Promise = global.Promise; // Makes mongoose's promise use JS's native promise.
var fs = require('fs');

mongoose.connect('mongodb://localhost/mean_wall_users');

// Creates a path that points to where all the models live
var models_path = path.join(__dirname, './../models');

// Read all the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
	if (file.indexOf('.js') >= 0) {
		require(models_path + '/' + file);
	}
})