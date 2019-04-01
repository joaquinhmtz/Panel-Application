var mongoose = require('mongoose');
	Schema = mongoose.Schema;

	UserModel = new Schema({
		username : { type : String },
		email : { type : String },
		password : { type : String },
		name : { type : String },
		lastname : { type : String },
		lastname2 : { type : String },
		fullname : { type : String },
		creationDate : { type : Date, default : Date.now },
		lastModifiedDate : { type : Date, default : Date.now },
		profile : {
			_id : { type : String }
		}
});

var getFullname = function (next) {
	var fullname = '';
	if (this.name != '') fullname += this.name;
    if (this.lastname != '') fullname += ' ' + this.lastname;
    if (this.lastname2 != '') fullname += ' ' + this.lastname2;
    this.fullname = fullname;
    this.last_modified_date = new Date();
    next();
}

UserModel.pre('save', getFullname);

module.exports = mongoose.model('users', UserModel);