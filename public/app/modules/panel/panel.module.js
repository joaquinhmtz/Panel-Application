(() => {
    angular
        .module('app.panel', ['ui.bootstrap'])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.panel',{
                url: '/panel',
                template : '<div ui-view></div>',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/panel/panel.service.js'
                        ]);
                    }]
                }
            })
            .state('app.panel.dashboard',{
                url: '/dashboard',
                templateUrl : './app/modules/panel/panel-dashboard.html',
                controller: 'dashboardController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/panel/panel.service.js',
                            'app/modules/panel/panel-dashboard.ctrl.js'
                        ]);
                    }]
                }
            })
            .state('app.panel.dashboard.users-create',{
                url: '/users/create',
                templateUrl : './app/modules/panel/users/create/users-create.html',
                controller: 'userCreateController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/panel/panel.service.js',
                            'app/modules/panel/users/create/users-create.ctrl.js',
                            'app/services/UserServices.js',
                            'app/services/ProfileServices.js'
                        ]);
                    }]
                }
            })
            .state('app.panel.dashboard.users-list',{
                url: '/users/list',
                templateUrl : './app/modules/panel/users/list/users-list.html',
                controller: 'userListController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/modules/panel/panel.service.js',
                            'app/modules/panel/users/list/users-list.ctrl.js',
                            'app/services/UserServices.js',
                            'app/services/ProfileServices.js',
                            'app/modules/panel/users/edit/users-edit.ctrl.js'
                        ]);
                    }]
                }
            })

        /*
        * Por cada modulo tener un service y un module - ejemplo: access, public, admin-panel
        * */
    }

})();