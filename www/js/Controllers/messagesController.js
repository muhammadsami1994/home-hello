(function () {
    'use strict';

})();
angular
    .module('homehello.messages', [])
    .controller('messagesCtrl', ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.deleteMessage =true
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true
        $scope.messages = [
            {
                message: 'Change to booking process, HI love, to help',
                name:'HomeHello',
                time:'a moment ago',
                del :false,
                status : 'Unread'
            }, {
                message: 'Sorry,I am gonna late for 10 mins.',
                name:'Jenny',
                time:'10 min ago',
                del :false,
                status : 'Unread'
            }, {
                message: 'Change to booking process, HI love, to help',
                name:'Steven',
                time:'May 06 2015',
                del :false,
                status : 'Read'
            }, {
                message: 'Change to booking process, HI love, to help',
                name:'Marry',
                time:'May 06 2015',
                del :false,
                status : 'Read'
            }, {
                message: 'Change to booking process, HI love, to help',
                name:'Sales HomeHello',
                time:'May 06 2015',
                del :false,
                status : 'Read'
            }, {
                message: 'Change to booking process, HI love, to help',
                name:'Ling',
                time:'May 06 2015',
                del :false,
                status : 'Read'
            }
        ]
        $scope.showDel = function(index){
            $scope.messages[index].del = !$scope.messages[index].del;
        }
    }]);
