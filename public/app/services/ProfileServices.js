angular.module('access')
.service('ProfileServices', function (AppService) {

	this.list = function (callbackFunction) {
		AppService.get('/api/profile/all', callbackFunction);
	}

});