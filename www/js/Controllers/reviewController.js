(function () {
    'use strict';

})();
angular
    .module('homehello.review', [])
    .controller('reviewCtrl', ['$scope','$ionicSideMenuDelegate', function ($scope,$ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);
