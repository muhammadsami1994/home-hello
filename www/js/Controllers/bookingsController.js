(function () {
    'use strict';

})();
angular
    .module('homehello.bookings', [])
    .controller('bookingsCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicPopover','$state', function ($scope, $ionicSideMenuDelegate, $ionicPopover, $state) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.upcomingImagePath = 'img/pastBookingLogo.png';
        $scope.pastImagePath = 'img/upComingbookingIcon.png';
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.bookingHeading = 'UPCOMING BOOKING';
        $scope.isFlipped = false;
        $scope.isFlippedFunc = function (boolean) {
            $scope.isFlipped= boolean;
           if($scope.isFlipped == true){
               $scope.bookingHeading='PAST BOOKING';
               $scope.upcomingImagePath = 'img/upComingbookingBlackIcon.png';
               $scope.pastImagePath = 'img/pastBookingBlackLogo.png';
           }
            else{
               $scope.bookingHeading='UPCOMING BOOKING';
               $scope.upcomingImagePath = 'img/pastBookingLogo.png';
               $scope.pastImagePath = 'img/upComingbookingIcon.png';
           }
        }
    }]);
