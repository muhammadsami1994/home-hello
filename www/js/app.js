'use strict';


(function () {

    angular
        .module('homehello', [
            'ionic',
            'homehello.utils',
            'homehello.services',
            'homehello.homeCtrl',
            'homehello.bookingCtrl',
            'homehello.bookingExtraCtrl',
            'homehello.bookingCleanAndPet',
            'homehello.bookingSelectStartTime',
            'homehello.bookingPaymentCtrl',
            'homehello.dashboard',
            'homehello.bookings',
            'homehello.recurringDetails',
            'homehello.review',
            'homehello.BookingDateCtrl',
            'tabSlideBox',
            'tabsSlideBox',
            'homehello.allReviewCtrl',
            'homehello.writeAReview',
            'homehello.messages',
            'homehello.account',
            'homehello.payment',
            'homehello.security',
            'homehello.bookingDetails',
            'homehello.bookingHowOften',
            'homehello.settings',
            'homehello.notifications',
            'homehello.bookingRooms'
        ])
        .config(configuration)
        .run(function ($rootScope, $ionicLoading, $ionicPlatform) {
            $rootScope.$on('loading:show', function () {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner>'
                })
            });

            $rootScope.$on('loading:hide', function () {
                $ionicLoading.hide()
            });

            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });

    function configuration ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                name: 'home',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .state('booking', {
                name: 'booking',
                url: '/booking/{step:(?:postcode|rooms|extra|home|address|contact|periodic|date|time|payment|register)}',
                params: { step: 'postcode' },
                templateUrl: function (stateParams) {
                    return 'templates/booking' + (stateParams.step.charAt(0).toUpperCase() + stateParams.step.slice(1)) + '.html';
                },
                controller: 'BookingCtrl'
            })
            .state('bookingExtra', {
                name: 'bookingExtra',
                url: '/bookingExtra',
                templateUrl: 'templates/bookingExtra.html',
                controller : 'BookingExtraCtrl'
            })
            .state('bookingCleanandPet', {
                name: 'bookingCleanandPet',
                url: '/bookingCleanandPet',
                templateUrl: 'templates/bookingCleanandPet.html',
                controller: 'BookingCleanAndPetCtrl'
            })
            .state('bookingAddress', {
                name: 'bookingAddress',
                url: '/bookingAddress',
                templateUrl: 'templates/bookingAddress.html'
            })
            .state('bookingContact', {
                name: 'bookingContact',
                url: '/bookingContact',
                templateUrl: 'templates/bookingContact.html'
            })
            .state('bookingRooms', {
                name: 'bookingRooms',
                url: '/bookingRooms',
                templateUrl: 'templates/bookingRooms.html',
                controller:'bookingRoomsCtrl'
            })
            .state('bookingHowOften', {
                name: 'bookingHowOften',
                url: '/bookingHowOften',
                templateUrl: 'templates/bookingHowOften.html',
                controller: 'bookingHowOftenCtrl'
            })
            .state('bookingSelectStartTime', {
                name: 'bookingSelectStartTime',
                url: '/bookingSelectStartTime',
                templateUrl: 'templates/bookingSelectStartTime.html',
                controller:'BookingSelectStartTimeCtrl'
            })
            .state('bookingPayment', {
                name: 'bookingPayment',
                url: '/bookingPayment',
                templateUrl: 'templates/bookingPayment.html',
                controller: 'BookingPaymentCtrl'
            })
            .state('bookingRegister', {
                name: 'bookingRegister',
                url: '/bookingRegister',
                templateUrl: 'templates/bookingRegister.html'
            })
            .state('bookingLogin', {
                name: 'bookingLogin',
                url: '/bookingLogin',
                templateUrl: 'templates/bookingLogin.html'
            })
            .state('dashboard', {
                name: 'dashboard',
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html',
                controller:'dashboardCtrl'
            })
            .state('referral', {
                name: 'referral',
                url: '/referral',
                templateUrl: 'templates/referral.html'
            })
            .state('bookings', {
                name: 'bookings',
                url: '/bookings',
                templateUrl: 'templates/bookings.html',
                controller : 'bookingsCtrl'
            })
            .state('recurringDetails', {
                name: 'recurringDetails',
                url: '/recurringDetails',
                templateUrl: 'templates/recurringDetails.html',
                controller : 'recurringDetailsCtrl'
            })
            .state('review', {
                name: 'review',
                url: '/review',
                templateUrl: 'templates/review.html',
                controller : 'reviewCtrl'
            })
            .state('allReview', {
                name: 'allReview',
                url: '/allReview',
                templateUrl: 'templates/allReview.html'
            })
            .state('reviewDetails', {
                name: 'reviewDetails',
                url: '/reviewDetails',
                templateUrl: 'templates/reviewDetails.html'
            })
            .state('incompleteReview', {
                name: 'incompleteReview',
                url: '/incompleteReview',
                templateUrl: 'templates/incompleteReview.html'
            })
            .state('incompleteReviewPage2', {
                name: 'incompleteReviewPage2',
                url: '/incompleteReviewPage2',
                templateUrl: 'templates/incompleteReviewPage2.html'
            })
            .state('writeAReview', {
                name: 'writeAReview',
                url: '/writeAReview',
                templateUrl: 'templates/writeAReview.html',
                controller : 'writeAReviewCtrl'
            })
            .state('messages', {
                name: 'messages',
                url: '/messages',
                templateUrl: 'templates/messages.html',
                controller : 'messagesCtrl'
            })
            .state('account', {
                name: 'account',
                url: '/account',
                templateUrl: 'templates/account.html',
                controller : 'accountCtrl'
            })
            .state('payment', {
                name: 'payment',
                url: '/payment',
                templateUrl: 'templates/payment.html',
                controller : 'paymentCtrl'
            })
            .state('security', {
                name: 'security',
                url: '/security',
                templateUrl: 'templates/security.html',
                controller : 'securityCtrl'
            })
            .state('notification', {
                name: 'notification',
                url: '/notification',
                templateUrl: 'templates/notification.html',
                controller : 'notificationsCtrl'
            })
            .state('settings', {
                name: 'settings',
                url: '/settings',
                templateUrl: 'templates/settings.html'
            })
            .state('bookingDetails', {
                name: 'bookingDetails',
                url: '/bookingDetails',
                templateUrl: 'templates/bookingDetails.html',
                controller : 'bookingDetailsCtrl'
            })
            .state('bookingDate', {
                name: 'bookingDate',
                url: '/bookingDate',
                templateUrl: 'templates/bookingDate.html',
                controller: 'BookingDateCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    }
}());
