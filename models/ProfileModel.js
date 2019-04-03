var mongoose = require('mongoose');
	Schema = mongoose.Schema;

	ProfileModel = new Schema({
		_id : { type : String },
		name : { type : String },
		permissions : [{
			module_id : { type : String },
			privileges : {
				create : { type : Boolean },
				read : { type : Boolean },
				update : { type : Boolean },
				remove : { type : Boolean }
			}
		}]
});

module.exports = mongoose.model('profiles', ProfileModel);