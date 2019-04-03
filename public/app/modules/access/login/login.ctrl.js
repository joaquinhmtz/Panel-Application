(() => {
	'use strict';
	angular
	.module('access')
	.controller('loginController', loginController);

	loginController.$inject = [ '$state', 'UserServices', '$window'];

	function loginController($state, UserServices, $window) {
		var vm = this;
		vm.login = {};

		vm.access = access;

		function access () {
			UserServices.access(function (err, response) {
				if (err) {
					console.log('err', err);
				} else {
					console.log('response: ', response);
					saveInLocal(response);
				}
			}, vm.login);
		}

		function saveInLocal (item) {
			$window.localStorage['user_panel'] = JSON.stringify(item);
		}

		function init () {
			console.log('loginController');
		}

		init();

	}

})();