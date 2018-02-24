(function () {
    'use strict';
    angular
        .module('homehello.bookingPaymentCtrl', [])
        .controller('BookingPaymentCtrl',['$scope','$ionicModal',function ($scope,$ionicModal){
            $ionicModal.fromTemplateUrl('templates/bookingScanCard.html', function(modal){
                $scope.modal = modal;
            },{
                scope: $scope,
                animation:'slide-in-up'
            });
            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
            };
        }]);

})();
