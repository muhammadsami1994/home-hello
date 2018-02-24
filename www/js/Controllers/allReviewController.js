(function () {
    'use strict';

})();
angular
    .module('homehello.allReviewCtrl', [])
    .controller('allReviewCtrl', ['$scope','$ionicSideMenuDelegate', function ($scope,$ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);
