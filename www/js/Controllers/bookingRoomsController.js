(function () {
    'use strict';

})();
angular
    .module('homehello.bookingRooms', [])
    .controller('bookingRoomsCtrl', ['$scope','$ionicSlideBoxDelegate','$ionicScrollDelegate','$timeout',
        function ($scope,$ionicSlideBoxDelegate,$ionicScrollDelegate,$timeout) {
            $scope.gesture = {
                used :''
            }
            $scope.items = [{data:''},{data:''},{data:''},{data:1,xAxis1:0,xAxis2:100,xAxis3:150},{data:2,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:3,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:4,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:5,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:6,
                    xAxis1:50,
                    xAxis2:90,
                    xAxis3:135},
                {data:7,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:8,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:9,
                    xAxis1:45,
                    xAxis2:90,
                    xAxis3:135},
                {data:''},
                {data:''},
                {data:''}
            ];
            $scope.selectedIndex1 = 4;
            $scope.selectedIndex = 4;
            $scope.scrollMainToTop = function(index,data) {
                if($scope.selectedIndex1 == data){
                    $scope.selectedIndex1 = data;
                    console.log($scope.selectedIndex1);
                }
                if(data<$scope.selectedIndex1){
                    if(($scope.selectedIndex1-1) ==data) {
                        if(($scope.selectedIndex1 - 1) == data && ($scope.selectedIndex1 - 1)==1){
                            $scope.selectedIndex1 = data;
                            $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(-50, 0, [true]);
                        }else{
                            $scope.selectedIndex1 = data;
                            $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(-$scope.items[index].xAxis1, 0, [true]);
                        }
                    }else if(($scope.selectedIndex1-2)==data){
                        $scope.selectedIndex1 = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(-$scope.items[index].xAxis2, 0, [true]);
                    }else if(($scope.selectedIndex1-3)==data){
                        $scope.selectedIndex1 = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(-$scope.items[index].xAxis3, 0, [true]);
                    }
                }
                if(data>$scope.selectedIndex1){
                    if((data-1) ==$scope.selectedIndex1) {
                        $scope.selectedIndex1 = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy($scope.items[index].xAxis1, 0, [true]);
                    }else if((data-2)==$scope.selectedIndex1){
                        $scope.selectedIndex1 = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy($scope.items[index].xAxis2, 0, [true]);
                    }else if((data-3)== $scope.selectedIndex1){
                        $scope.selectedIndex1 = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy($scope.items[index].xAxis3, 0, [true]);
                    }
                }


            };
            $scope.scrollMainToTopBath = function(index,data) {
                if($scope.selectedIndex == data){
                    $scope.selectedIndex = data;
                    console.log($scope.selectedIndex);
                }
                if(data<$scope.selectedIndex){
                    if(($scope.selectedIndex-1) ==data) {
                        if(($scope.selectedIndex - 1) == data && ($scope.selectedIndex - 1)==1){
                            $scope.selectedIndex = data;
                            $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy(-50, 0, [true]);
                        }else{
                            $scope.selectedIndex = data;
                            $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy(-$scope.items[index].xAxis1, 0, [true]);
                        }
                    }else if(($scope.selectedIndex-2)==data){
                        $scope.selectedIndex = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy(-$scope.items[index].xAxis2, 0, [true]);
                    }else if(($scope.selectedIndex-3)==data){
                        $scope.selectedIndex = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy(-$scope.items[index].xAxis3, 0, [true]);
                    }
                }
                if(data>$scope.selectedIndex){
                    if((data-1) ==$scope.selectedIndex) {
                        $scope.selectedIndex = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy($scope.items[index].xAxis1, 0, [true]);
                    }else if((data-2)==$scope.selectedIndex){
                        $scope.selectedIndex = data;
                        $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy($scope.items[index].xAxis2, 0, [true]);
                    }else if((data-3)== $scope.selectedIndex){
                        $scope.selectedIndex= data;
                        $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy($scope.items[index].xAxis3, 0, [true]);
                    }
                }


            };
            $scope.onGesture = function(gesture) {
                $scope.gesture.used = gesture;
                console.log(gesture);
            }
            function init (){
                $timeout(function(){
                    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(135, 0, [true]);
                    $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll([true]);
                    $ionicScrollDelegate.$getByHandle('mainScroll2').scrollBy(135, 0, [true]);
                    $ionicScrollDelegate.$getByHandle('mainScroll2').freezeScroll([true]);
                },20)
            }
            init();
            $scope.scrollTop = function() {
                $ionicScrollDelegate.scrollTop();
            };
            $scope.scrollSmallToTop = function() {
                $ionicScrollDelegate.$getByHandle('small').scrollTop();
            };

        }]);
