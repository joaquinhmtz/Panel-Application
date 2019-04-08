(() => {
	'use strict';
	angular
	.module('access')
	.controller('userCreateController', userCreateController);

	userCreateController.$inject = [ '$state', 'UserServices', '$window', 'ProfileServices'];

	function userCreateController($state, UserServices, $window, ProfileServices) {
		var vm = this;

		vm.user = {};
		vm.profiles = {};
		vm.flags = {};

		vm.verifyFields = verifyFields;
		vm.save = save;

		function save () {
			if (vm.verifyFields()) {
				UserServices.create(function (err, response) {
					if (err) {
						console.log('err: ', err);
					} else {
						if (response) 
							alertWarning('Usuario existente', 'Favor de revisar email y/o usuario.');
						else
							alertSuccess('Guardado exitoso.', 'Usuario creado correctamente.');
					}
				}, vm.user);
			}
		}

		function verifyFields () {
			vm.flags.save = true;
			if (!vm.user.name) {
				vm.flags.name = true;
				return false;
			} else {
				vm.flags.name = false;
			}

			if (!vm.user.lastname) {
				vm.flags.lastname = true;
				return false;
			} else {
				vm.flags.lastname = false;
			}

			if (!vm.user.email) {
				vm.flags.email = true;
				return false;
			} else {
				vm.flags.email = false;
			}

			if (!vm.user.username) {
				vm.flags.username = true;
				return false;
			} else {
				vm.flags.username = false;
			}

			if (!vm.user.profile) {
				vm.flags.profile = true;
				return false;
			} else {
				vm.flags.profile = false;
			}

			if (!vm.user.password) {
				vm.flags.password = true;
				return false;
			} else {
				vm.flags.password = false;
			}

			if (!vm.user.password2) {
				vm.flags.password2 = true;
				return false;
			} else {
				vm.flags.password2 = false;
			}

			return true;
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
			ProfileServices.list(function (err, response) {
				if (err) {
					console.log('err: ', err);
				} else {
					console.log('response: ', response);
					vm.profiles = response;
				}
			})
			console.log('userCreateController');
		}

		init();

	}

})();