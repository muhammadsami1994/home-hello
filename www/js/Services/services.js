(function () {

    'use strict';
    //var api = "https://homehello.com.au/api/v2/",
    var api = "http://anshul.sandbox.dev/api/v2/";

    angular
        .module('homehello.services', ['homehello.utils'])
        .factory('Auth', ['$http', '$localstorage', 'SessionData', function ($http, $localstorage, SessionData) {
            return {
                login: function (email, password) {
                    return $http.post(api + 'users/' + encodeURIComponent(email) + "/session", {
                        login_password: password,
                        device_id: $localstorage.get('PushRegId')
                    }).then(function (data) {
                        console.info('success login', data);
                        SessionData({
                            authHeader: btoa(data.data.data.u_email + ':' + data.data.data.current_token),
                            userId: data.data.data.id
                        });

                        return data.data.data;
                    });
                },

                logout: function () {
                    SessionData.clear();
                },

                isLoggedIn: function () {
                    return !!SessionData('authHeader');
                }
            };
        }])
        .factory('User', ['$http', 'SessionData', function ($http, SessionData) {
            return {
                changePassword: function (password) {
                    console.info('session data', SessionData());
                    return $http.put(api + 'users/' + SessionData('userId'), {
                        user: { password: password }
                    });
                }
            };
        }])
        .factory('Booking', ['$http', '$q', function ($http, $q) {
            return {
                postcodeCheck: function (postcode) {
                    return $http.get(api + 'cleaners/' + postcode + '/check_postcode/quick')
                        .then(function (data) {
                            return !data.error;
                        }, function (data) {
                            return $q.reject(data.error);
                        });
                },
                availabilityDates: function (duration, postcode, month) {
                    var getDates = function () {
                        var dates = [],
                            date = moment.utc(month).startOf('month'),
                            endDate = moment.utc(month).endOf('month');

                        while (date.isBefore(endDate)) {
                            dates.push(moment.utc(date));
                            date.add(1, 'days');
                        }

                        return dates;
                    };

                    return $http.post(api + 'bookings/all/availableTimes', {
                        duration: duration,
                        postcode: postcode,
                        dates: getDates()
                    }).then(function (data) {
                        var availsOut = [];

                        angular.forEach(data.data.data, function (availsList) {
                            var availOut = {};
                            angular.forEach(availsList, function (avail) {
                                availOut.date = moment.utc(avail.date, 'YYYY-MM-DD');
                                if (!availOut.availabilities) {
                                    availOut.availabilities = [];
                                }
                                availOut.availabilities.push(
                                    {
                                        cleaner: avail.cleaner,
                                        from: avail.from,
                                        to: avail.to
                                    }
                                );
                            });
                            availsOut.push(availOut);
                        });

                        return availsOut;
                    });
                },
                getBookingPricing: function () {
                    return $http.get(api + 'booking-pricings').then(function (data) {
                        return data.data.data;
                    });
                },
                submitBooking: function (data) {
                    return $http.post(api + 'bookings', data);
                }
            };
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$location', 'SessionData', function ($q, $location, SessionData) {
                return {
                    request: function (config) {
                        var authHeader = SessionData('authHeader');

                        if (!authHeader) {
                            authHeader = btoa("restapi@homehello.com.au:q0XnfstMXtKOWIatQV5DwnnDaDhwaRUU");
                        }

                        if (!config.noAuth && config.url.indexOf(api) === 0 && authHeader) {
                            config.headers['Authorization'] = 'Basic ' + authHeader;
                        }

                        return config;
                    },
                    responseError: function (rejection) {
                        if (!rejection.config.noAuth && rejection.config.url.indexOf(api) === 0) {
                            if (rejection.status == 401 || rejection.status == 403) {
                                SessionData.clear();
                                $location.path('/home');
                            }
                        }

                        return $q.reject(rejection);
                    }
                };
            }]);
        }]);
})();
