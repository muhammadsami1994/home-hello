(function () {
    'use strict';

})();
angular
    .module('homehello.recurringDetails', [])
    .controller('recurringDetailsCtrl', ['$scope','$ionicSideMenuDelegate', function ($scope,$ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);
