(() => {
    'use strict';

    angular
        .module('app.panel')
        .service('PanelService', PanelService);

    PanelService.$inject = ['AppService'];

    function PanelService(AppService){

        return{

        };

    }
})();