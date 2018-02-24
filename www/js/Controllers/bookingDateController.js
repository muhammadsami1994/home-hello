(function () {
    'use strict';
    angular
        .module('homehello.BookingDateCtrl', ['flexcalendar', 'pascalprecht.translate'])
        .controller('BookingDateCtrl',['$scope',function ($scope){
            $scope.options = {
                defaultDate: new Date(),
                minDate: "2015-01-01",
                maxDate: "2055-12-31",
                disabledDates: [
                    "2015-06-22",
                    "2015-07-27",
                    "2015-08-13",
                    "2015-10-15",
                    "2015-10-17"
                ],
                dayNamesLength: 3, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
                mondayIsFirstDay: false,//set monday as first day of week. Default is false
                eventClick: function(date) {
                    console.log(date);
                },
                dateClick: function(date) {
                    console.log(date);
                },
                changeMonth: function(month, year) {
                    console.log(month, year);
                }
            };

            $scope.events = [
                {foo: 'bar', date: "2015-08-18"},
                {foo: 'bar', date: "2015-08-20"}
            ];

        }]);
})();

