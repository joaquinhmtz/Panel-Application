(() => {
	'use strict';
	angular
	.module('access')
	.controller('userEditController', userEditController);

	userEditController.$inject = [ '$state', 'UserServices', '$window', 'ProfileServices', '$timeout', '$rootScope', '$scope', '$uibModalInstance'];

	function userEditController($state, UserServices, $window, ProfileServices, $timeout, $rootScope, $scope, $uibModalInstance) {
		
		$scope.user = {};
		$scope.profiles = {};
		$scope.flags = {};

		$scope.verifyFields = verifyFields;
		$scope.update = update;
		$scope.close = close;

		function update () {
			if ($scope.verifyFields()) {
				UserServices.update(function (err, response) {
					if (err) {
						console.log('err: ', err);
					} else {
						if (response) 
							alertWarning('Usuario existente', 'Favor de revisar email y/o usuario.');
						else
							alertSuccess('Guardado exitoso.', 'Usuario creado correctamente.');
					}
				}, $scope.user);
			}
		}

		function verifyFields () {
			$scope.flags.save = true;
			if (!$scope.user.name) {
				$scope.flags.name = true;
				return false;
			} else {
				$scope.flags.name = false;
			}

			if (!$scope.user.lastname) {
				$scope.flags.lastname = true;
				return false;
			} else {
				$scope.flags.lastname = false;
			}

			if (!$scope.user.email) {
				$scope.flags.email = true;
				return false;
			} else {
				$scope.flags.email = false;
			}

			if (!$scope.user.username) {
				$scope.flags.username = true;
				return false;
			} else {
				$scope.flags.username = false;
			}

			if (!$scope.user.profile) {
				$scope.flags.profile = true;
				return false;
			} else {
				$scope.flags.profile = false;
			}

			if (!$scope.user.password) {
				$scope.flags.password = true;
				return false;
			} else {
				$scope.flags.password = false;
			}

			if (!$scope.user.password2) {
				$scope.flags.password2 = true;
				return false;
			} else {
				$scope.flags.password2 = false;
			}

			return true;
		}

		function close () {
			$uibModalInstance.dismiss('cancel');
		}

		function alertSuccess (title, text) {
			Swal.fire({
				type: 'success',
				title: title,
				text: text,
				customClass: 'swal-wide',
			})
		}

		function alertWarning (title, text) {
			Swal.fire({
				type: 'warning',
				title: title,
				text: text,
				customClass: 'swal-wide',
			})
		}

		function init () {
			$(document).ready(function () {
				$timeout(function () {
					$scope.user = $scope.item;
				}, 300);
			});
			ProfileServices.list(function (err, response) {
				if (err) {
					console.log('err: ', err);
				} else {
					$scope.profiles = response;
				}
			})
		}

		init();

	}

})();