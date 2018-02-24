(function () {
    'use strict';

})();
angular
    .module('homehello.bookingDetails', [])
    .controller('bookingDetailsCtrl', ['$scope','$ionicSideMenuDelegate','$ionicPopover', function ($scope,$ionicSideMenuDelegate,$ionicPopover) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);
