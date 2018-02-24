(function () {
    'use strict';
    angular
        .module('homehello.bookingExtraCtrl', [])
        .controller('BookingExtraCtrl',['$scope',function ($scope){
            $scope.clicked = [false,false,false,false,false,false]
        }]);

})();
