angular.module('access')
.service('UserServices', function (AppService) {

	this.access = function (callbackFunction, data) {
		AppService.post('/api/user/login', data, callbackFunction);
	}

	this.create = function (callbackFunction, data) {
		AppService.post('/api/user/create', data, callbackFunction);
	}

	this.list = function (callbackFunction, data) {
		AppService.post('/api/user/all', data, callbackFunction);
	}

	this.update = function (callbackFunction, data) {
		AppService.post('/api/user/update', data, callbackFunction);
	}

});