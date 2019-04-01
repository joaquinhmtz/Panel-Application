(() => {
    angular
        .module('app.access', [ 'oc.lazyLoad','ui.router',])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/access');
        $stateProvider
            .state({
                name: 'app.access',
                url: '/access',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/access/access.service.js'
                        ]);
                    }]
                }
            })
            .state({
                name: 'app.access.login',
                url: '/login',
                templateUrl: 'app/modules/access/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        console.log('Here perro!')
                        return $ocLazyLoad.load([
                            'app/modules/access/access.service.js',
                            'app/modules/access/login/login.ctrl.js',
                            'app/services/UserServices.js'
                        ]);
                    }]
                }
            })

        /*
        * Por cada modulo tener un service y un module - ejemplo: access, public, admin-panel
        * */
    }

})();