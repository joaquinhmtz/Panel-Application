(() => {
    angular
        .module('access', [])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('access',{
                url: '/access',
                template : '<div ui-view></div>',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/access/access.service.js'
                        ]);
                    }]
                }
            })
            .state('access.login',{
                url: '/login',
                templateUrl: 'app/modules/access/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/access/login/login.ctrl.js',
                            'app/services/UserServices.js'
                        ]);
                    }]
                }
            });

        /*
        * Por cada modulo tener un service y un module - ejemplo: access, public, admin-panel
        * */
    }

})();


