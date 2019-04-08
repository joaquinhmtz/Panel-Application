'use strict';

module.exports = function (app, router) {

	var UserModel = require('../models/UserModel.js');
	var ProfileModel = require('../models/ProfileModel.js');
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	var secret = process.env.SECRET;
	var async = require('async');

	app.post('/api/user/create', createUser);
	app.post('/api/user/login', login);
	app.post('/api/user/all', getUsers);
	app.put('/api/user/update', updateUser);

	function createUser (req, res, next) {
		var data = req.body;
		var operations = [
			async.apply(searchUser, data),
			saveUser
		];

		async.waterfall(operations, function (err, response) {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(201).send(response.exists);
			}
		});
	}

	function searchUser (item, cb) {
		UserModel.find({$or : [{ email : item.username }, { username : item.username }]}, function (err, response) {
			if (err) {
				cb (err);
			} else {
 				if (response.length > 0) {
 					response.exists = true;
 					cb (null, response)
 				} else {
 					item.exists = false;
 					cb (null, item);
 				}
			}
		})
	}

	function saveUser (item, cb) {
		if (!item.exists) {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(item.password, salt, function(err, hash) {
					item.password = hash;
					var model = new UserModel(item);
					model.save(function (err, user) {
						if (err) {
							cb (err);
						} else {
							cb (null, user)
						}
					})
				});
			});	
		} else {
			cb (null, item);
		}
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
    						profile : user.profile
    					};
    					var token = jwt.sign({obj}, secret, {expiresIn : 20});
    					ProfileModel.find({ _id : obj.profile._id}, function (err, response) {
    						if (err) {
    							res.status(401).send(err);
    						} else {
    							obj.profile = response;
    							res.status(201).send({user: obj, token: token});
    						}
    					})
    				}
				});
			}
		})
	}

	function getUsers (req, res, next) {
		var data = req.body;
		var matchQuery = {
			query : createQuery(data),
			filters : req.body
		};
		var operations = [
			async.apply(searchItems, matchQuery)
		];

		async.waterfall(operations, function (err, response) {
			if (err) {
				res.status(400).send(err);
				console.log('err: ', err);
			} else {
				res.send(201, response);
				console.log('response: ', response);
			}
		})
	}

	function createQuery (data) {
		var query = {};

		if (data.fullname) {
			query['fullname'] = data.fullname;
		}

		if (data.email) {
			query['email'] = data.email;
		}

		return query;
	}

	function searchItems (query, cb) {
		var aggregate_count = [
			{ 
				$match : query.query
			},
			{
				$count : 'count'
			}
		];

		UserModel
		.aggregate(aggregate_count)
		.exec(function (err, count) {
			if (!err) {
				var aggregate_temp = [
					{
					 	$match : query.query 
					},
					{
						$project : {
							_id : 1,
							username : 1,
							name : 1,
							lastname : 1,
							fullname : 1,
							email : 1,
							profile : 1
						}
					},
					{
						$sort : {
							fullname : 1
						}
					}
				];

				var filters = query.filters;

				UserModel
				.aggregate(aggregate_temp)
				.skip(filters.currentPage > 0 ? ((filters.currentPage - 1) * filters.itemsPerPage) : 0)
				.limit(parseInt(filters.itemsPerPage))
				.exec(function (err, response) {
					if (err) {
						cb (err)
					} else {

						var obj = {};
						if (response.length === 0) {
							obj = {
								response : response,
								count : 0
							};
						} else {
							obj = {
								response : response,
								count : count[0].count
							};
						}

						cb (null, obj);
					}
				})
			}
		})
	}
}