(() => {
    angular
        .module('app', [
            'ui.router',
            'oc.lazyLoad',
            'access',
            'app.panel',
            'ui.bootstrap'
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/access/login');
        $stateProvider.state('app',{
            url: '/app',
            templateUrl: './app/app.html',
            controller: 'AppCtrl',
            controllerAs: 'app'
        });
    }

})();