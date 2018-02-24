(function () {
    'use strict';
    angular
        .module('homehello.bookingHowOften', ['flexcalendar', 'pascalprecht.translate'])
        .controller('bookingHowOftenCtrl',['$scope',function ($scope){
            $scope.selectedIndex = [false,false,false,false,true];
            $scope.changeValue = function(to,notTo1,notTo2,notTo3,notTo4){
                $scope.selectedIndex[to]=true;
                $scope.selectedIndex[notTo1]=false;
                $scope.selectedIndex[notTo2]=false;
                $scope.selectedIndex[notTo3]=false;
                $scope.selectedIndex[notTo4]=false;


            }



        }]);
})();

