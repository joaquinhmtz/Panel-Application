(() => {
	'use strict';
	angular
	.module('app.access')
	.controller('loginController', loginController);

	loginController.$inject = ['PaymentMethodServices', '$state', 'UserServices'];

	function loginController($state, UserServices) {

		var vm = this;
		vm.login = {};

		vm.access = access;

		function access () {
			console.log('vm.login: ', vm.login);
			UserServices.access(function (err, response) {
				if (err) {
					console.log('err', err);
				} else {
					console.log('response: ', response);
				}
			})
		}

		function init () {
			console.log('loginController');
		}

		init();

	}

})();