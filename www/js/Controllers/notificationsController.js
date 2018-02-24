(function () {
    'use strict';

})();
angular
    .module('homehello.notifications', [])
    .controller('notificationsCtrl', ['$scope','$ionicModal','$state', function ($scope,$ionicModal,$state) {
        $scope.userRating = [false, false, false, false, false,false, false, false, false, false];
        $scope.changeRating = function (index) {
            if ($scope.userRating[index] == false) {
                for (var i = 0; i <= index; i++) {
                    $scope.userRating[i] = true;
                }
            }
            else {
                for (var j = $scope.userRating.length - 1; j > index; j--) {
                    $scope.userRating[j] = false;
                }
            }
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
            $state.go(state);
        }
    }]);
