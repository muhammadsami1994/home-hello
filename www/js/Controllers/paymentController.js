(function () {
    'use strict';

})();
angular
    .module('homehello.payment', [])
    .controller('paymentCtrl', ['$scope','$ionicModal','$state', function ($scope,$ionicModal,$state) {
        $scope.nameOnCard ='BRITNEY SPEAR';
        $scope.cardNumber ='xxxx-xxxx-xxxx-3421';
        $scope.sercurityCode ='xxx';
        $scope.expiryMonth='02';
        $scope.expiryYear='2019';
        $ionicModal.fromTemplateUrl('templates/settings.html', function(modal){
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
        $scope.changeState = function(state){
            $scope.closeModal();
            $state.go(state);
        }
    }]);
