(() => {
    'use strict';

    angular
        .module('app.access')
        .service('AccessService', AccessService);

    AccessService.$inject = ['AppService'];

    function AccessService(AppService){

        return{

        };

    }
})();