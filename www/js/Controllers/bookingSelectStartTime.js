(function () {
    'use strict';

})();
angular
    .module('homehello.bookingSelectStartTime', [])
    .controller('BookingSelectStartTimeCtrl', ['$scope', function ($scope) {
        $scope.startTime = [{am:'6:00am',pm:'1:00pm'},{am:'7:00am',pm:'2:00pm'},{am:'8:00am',pm:'3:00pm'},{am:'9:00am',pm:'4:00pm'},{am:'10:00am',pm:'5:00pm'},{am:'11:00am',pm:'6:00pm'},{am:'12:00am',pm:'7:00pm'}];
        $scope.selectedTimeFunc = function(time){
            $scope.selectedTime = time
        }
    }]);
