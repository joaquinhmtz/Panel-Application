(() => {
    'use strict';

    angular
        .module('access')
        .service('AccessService', AccessService);

    AccessService.$inject = ['AppService'];

    function AccessService(AppService){

        return{

        };

    }
})();