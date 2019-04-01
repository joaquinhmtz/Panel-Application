angular.module('app.access')
.service('UserServices', function (AppService) {

	this.access = function (callbackFunction, data) {
		console.log("data: ", data);
		AppService.post('/api/user/login', data, callbackFunction);
	}

});