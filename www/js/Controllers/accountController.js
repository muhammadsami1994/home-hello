(function () {
    'use strict';

})();
angular
    .module('homehello.account', [])
    .controller('accountCtrl', ['$scope','$ionicModal','$state', function ($scope,$ionicModal,$state) {
        $scope.name ='Britney Spear';
        $scope.email ='bris.s@yahoo.com';
        $scope.phone ='042198920130';
        $scope.streetAddress='1 Pitt Str';
        $scope.suburb='Sydney';
        $scope.state='NSW';
        $scope.postCode= 2000;
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
