'use strict';

module.exports = function (app, router) {

	var ProfileModel = require('../models/ProfileModel.js');

	app.get('/api/profile/all', getAllProfiles);

	function getAllProfiles (req, res, next) {
		ProfileModel.find({}, function (err, response) {
			if (err) {
				console.log('err: ', err);
			} else {
				console.log('response: ', response);
				res.status(201).send(response);
			}
		});
	}

}