(() => {
	'use strict';
	angular
	.module('access')
	.controller('dashboardController', dashboardController);

	dashboardController.$inject = ['$state', '$window'];

	function dashboardController($state, $window) {
		var vm = this;
		vm.user = {};

		vm.getUser = getUser;
		vm.closeSession = closeSession;

		function getUser () {
			vm.user = JSON.parse($window.localStorage.user_panel);
		}

		function closeSession () {
			delete $window.localStorage.user_panel;
			$state.go('access.login');
		}

		function init () {
			vm.getUser();
		}

		init();

	}

})();