(function () {
    'use strict';
    angular
        .module('homehello.homeCtrl', [])
        .controller('HomeCtrl', ['$scope', 'Auth', '$state', function ($scope, Auth, $state) {
            if (Auth.isLoggedIn()) {
                $state.transitionTo('dash');
            }
        }]);
})();
