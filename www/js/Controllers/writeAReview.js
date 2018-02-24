(function () {
    'use strict';

})();
angular
    .module('homehello.writeAReview', [])
    .controller('writeAReviewCtrl', ['$scope', function ($scope) {
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
    }]);
