(() => {
	'use strict';
	angular
	.module('access')
	.controller('userListController', userListController);

	userListController.$inject = ['$state', 'UserServices', '$window', 'ProfileServices' , '$rootScope', '$uibModal'];

	function userListController($state, UserServices, $window, ProfileServices, $rootScope, $uibModal) {
		var vm = this;

		vm.users = {};
		vm.filters = {
			totalItems : 1, 
			currentPage : 1,
			itemsPerPage : '10'
		};

		vm.getIndex = getIndex;
		vm.details = details;

		function getIndex (index) {
			var index = index;
			if (vm.filters.currentPage > 1) {
				index = ((vm.filters.currentPage - 1) * vm.filters.itemsPerPage) + index;
				return index;
			}
		}

		function details (item) {
			var scope = $rootScope.$new();
			scope.item = item;
			var modalInstance = $uibModal.open({
				templateUrl : 'app/modules/panel/users/edit/users-edit.html',
				controller : 'userEditController',
				backdrop : 'static',
				keyboard : false,
				size : 'md',
				scope : scope
			});

			modalInstance.result.then(function () {

			});
		};

		function alertSuccess (title, text) {
			Swal.fire({
				type: 'success',
				title: title,
				text: text,
				customClass: 'swal-wide',
			})
		}

		function init () {
			UserServices.list(function (err, response) {
				if (err) {
					console.log('err: ', err);
				} else {
					vm.users = response.response;
					vm.filters.totalItems = response.count;
				}
			}, vm.filters);
		}

		init();

	}

})();