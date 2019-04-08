
(() => {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', MainController);

    MainController.$inject = ['AppService', '$state'];

    function MainController(AppService, $state) {
        var app = this;

        start();

        function start() {
            console.log('Hey! Im the main controller')
        }
    }
})();
