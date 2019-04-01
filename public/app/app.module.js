(() => {
    angular
        .module('app', [
            'ui.router',
            'oc.lazyLoad',
            'app.access'
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvider.state({
            name: 'app',
            url: '/app',
            templateUrl: './app/modules/access/login/login.html',
            //templateUrl: './app/app.html',
            controller: 'AppCtrl',
            controllerAs: 'app'
        });
    }

})();