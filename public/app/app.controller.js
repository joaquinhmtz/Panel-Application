
(() => {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', MainController);

    MainController.$inject = ['AppService', '$state'];

    function MainController(AppService, $state) {
        var app = this;

        start();

        app.go = function () {
            console.log('hola perro del mal')
            $state.go('app.access.login');
        }

        function start() {
            console.log('Hey! Im the main controller')
        }
    }
})();
