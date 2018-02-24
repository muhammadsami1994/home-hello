(function () {
    'use strict';
    angular
        .module('homehello.bookingCleanAndPet', [])
        .controller('BookingCleanAndPetCtrl',['$scope',function ($scope){
            $scope.clicked = [false,false,false,false,false]
        }]);

})();
