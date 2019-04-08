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

		function getUser () {
			vm.user = JSON.parse($window.localStorage.user_panel);
		}

		function init () {
			console.log('dashboardController');
			vm.getUser();
		}

		init();

	}

})();