(function () {
    'use strict';

})();
angular
    .module('homehello.dashboard', [])
    .controller('dashboardCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal','$state',
        function ($scope, $ionicSideMenuDelegate, $ionicModal ,$state) {

            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };
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
                $scope.toggleLeft();
                $state.go(state);
            }
        }]);
