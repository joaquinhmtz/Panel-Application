(() => {
    angular
        .module('app.panel', [])
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

        /*
        * Por cada modulo tener un service y un module - ejemplo: access, public, admin-panel
        * */
    }

})();