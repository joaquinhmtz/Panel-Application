(() => {
    'use strict';

    angular
        .module('app')
        .service('AppService', MainService);

    MainService.$inject = ['$http'];

    function MainService($http) {

        return {
            get: get,
            post: post,
            put: put,
            del: del
        }

        function get(url, callback) {
            return $http({
                method: 'get',
                url: url,
                headers: {}
            }).then(function (response) {
                callback(null, response.data);
            }, function (err) {
                callback(err);
            });
        }

        function post(url, body, callback) {
            $http({
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: body
            }).then(function (response) {
                callback(null, response.data);
            }, function (err) {
                callback(err);
            });
        }

        function put(url, body, callback) {
            $http({
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: body
            }).then(function (response) {
                callback(null, response.data);
            }, function (err) {
                callback(err);
            });
        }

        function del(url, body, callback) {
            $http({
                method: 'delete',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: body
            }).then(function (response) {
                callback(null, response.data);
            }, function (err) {
                callback(err);
            });
        }

    }
})();