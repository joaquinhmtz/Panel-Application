'use strict';

module.exports = function (app, router) {

	var UserModel = require('../models/UserModel.js');
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	var secret = process.env.SECRET;

	app.post('/api/user/create', createUser);
	app.post('/api/user/login', login);

	function createUser (req, res, next) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				req.body.password = hash;
				var model = new UserModel(req.body);
        		model.save(function (err, user) {
        			if (err) {
        				res.status(400).send(err);
        			} else {
        				res.status(201).send(user);
        			}
        		})
    		});
		});
	}

	function login (req, res, next) {
		UserModel.findOne({$or : [{ email : req.body.username }, { username : req.body.username }]}, function (err, user) {
			if (err) {
				res.status(400).send(err);
			} else {
				bcrypt.compare(req.body.password, user.password, function(err, valid) {
    				if (valid) {
    					var obj = {
    						_id : user._id,
    						fullname : user.fullname,
    						email : user.email,
    						profile : user.profile
    					};
    					var token = jwt.sign({obj}, secret, {expiresIn : 20});
    					res.status(201).send({user: obj, token: token});
    				}
				});
			}
		})
	}
}