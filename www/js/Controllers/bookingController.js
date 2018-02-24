(function () {
    'use strict';

})();
angular
    .module('homehello.bookingCtrl', [])
    .controller('BookingCtrl', ['$scope', '$q', 'Auth', '$state', 'SessionData', '$stateParams', 'Booking', 'cachePromise', 'User','$ionicModal', function ($scope, $q, Auth, $state, SessionData, $stateParams, Booking, cachePromise, User, $ionicModal) {
        var steps = {
                'postcode': cachePromise(function (data) {
                    var d = $q.defer();
                    if ((data.postcode + '').match(/^[0-9]{4}$/)) {
                        Booking.postcodeCheck(data.postcode).then(function (has) {
                            if (has) {
                                d.resolve({
                                    postcode: data.postcode
                                });
                            } else {
                                d.resolve();
                            }
                        }, function () {
                            d.resolve();
                        });
                    } else {
                        d.resolve();
                    }

                    return d.promise;
                }),
                'rooms': function (data) {
                    var r = {
                        bedrooms: parseInt(data.bedrooms, 10),
                        bathrooms: parseInt(data.bathrooms, 10)
                    };

                    if (!isNaN(r.bedrooms) && !isNaN(r.bathrooms) && r.bedrooms >= 0 && r.bathrooms >= 0) {
                        if (r.bathrooms > 0 || r.bedrooms > 0) {
                            return r;
                        }
                    }
                },
                'extra': function (data) {
                    return {
                        services: {
                            cabinets: data.cabinet ? '1' : '0',
                            fridge: data.fridge ? '1' : '0',
                            ironing: data.ironing ? '1' : '0',
                            oven: data.oven ? '1' : '0',
                            washing: data.washing ? '1' : '0',
                            windows: data.window ? '1' : '0'
                        }
                    };
                },
                'home': function (data) {
                    if (typeof data.pets === 'undefined' || (data.pets !== null && !data.pets.dogs && !data.pets.cats)) {
                        return;
                    }
                    if (typeof data.supply !== 'undefined') {
                        var pets = [];
                        if (data.pets) {
                            if (data.pets.dogs) {
                                pets.push('2');
                            }
                            if (data.pets.cats) {
                                pets.push('1');
                            }
                        }
                        return {
                            cleaning_products: data.supply == '1' ? '1' : '0',
                            pets: pets,
                            entry: data.entry
                        };
                    }
                },
                'address': function (data) {
                    if (data.state && data.postcode) {
                        return {
                            address: {
                                street: data.address,
                                city: data.suburb,
                                state: data.state,
                                post_code: data.postcode
                            }
                        };
                    }
                },
                'contact': function (data) {
                    if (data.name && data.email && data.phone) {
                        return {
                            u_names: data.name,
                            u_email: data.email,
                            u_phone_number: data.phone
                        };
                    }
                },
                'periodic': cachePromise(function (data) {
                    var d = $q.defer();

                    getBookingPricing().then(function (pricing) {
                        var found;

                        angular.forEach(pricing, function (v, k) {
                            if (data.periodic == k) {
                                found = { pricing: v };
                            }
                        });

                        d.resolve(found);
                    }, function () {
                        d.resolve();
                    });

                    return d.promise;
                }),
                'date': cachePromise(function (data) {
                    var d = $q.defer();
                    if (data.date) {
                        var date = moment.utc(data.date, 'YYYY-MM-DD');
                        getAvailabilityDates({
                            duration: getDuration(),
                            postcode: $scope.booking.postcode.postcode,
                            date: moment(date).startOf('month')
                        }).then(function (dates) {
                            if (
                                dates.map(function (d) {
                                    return d.date && d.date.diff(date, 'days') === 0;
                                }).indexOf(true) !== -1
                            ) {
                                d.resolve({
                                    date: data.date
                                });
                            } else {
                                d.resolve();
                            }
                        }, function () {
                            d.resolve();
                        });
                    } else {
                        d.resolve();
                    }

                    return d.promise;
                }),
                'time': function (data) {
                    if (data.time) {
                        return {
                            time: data.time
                        };
                    }
                },
                'payment': function (data) {
                    if (data.cardholder && data.cardnumber && data.ccv && data.expiremonth && data.expireyear) {
                        return {
                            cardholder: data.cardholder,
                            payment_cc: data.cardnumber,
                            payment_cvv: data.ccv,
                            exp_month: data.expiremonth,
                            exp_year: data.expireyear
                        };
                    }
                },
                'register': function () {
                    //
                }
            },
            emptyBooking = function () {
                var obj = {};
                angular.forEach(steps, function (v, k) {
                    obj[k] = {};
                });
                return obj;
            },
            getNextStep  = function () {
                var previousStateIsCurrent = false,
                    nextStep;

                angular.forEach(steps, function (value, key) {
                    if (previousStateIsCurrent) {
                        nextStep = key;
                        previousStateIsCurrent = false;
                    } else if (key === $stateParams.step) {
                        previousStateIsCurrent = true;
                    }
                });

                return nextStep;
            },
            checkPreviousSteps = function () {
                var isPastStep = true,
                    previousSteps = {};

                angular.forEach(steps, function (getStepData, step) {
                    if (step !== $stateParams.step && isPastStep) {
                        previousSteps[step] = getStepData($scope.booking[step]);
                    }
                    if (step === $stateParams.step) {
                        isPastStep = false;
                    }
                });

                $q.all(previousSteps).then(function (stepsData) {
                    var redirect;

                    angular.forEach(stepsData, function (value, step) {
                        if (redirect) {
                            return;
                        }
                        if (!value) {
                            redirect = step;
                        }
                    });

                    if (redirect) {
                        $state.transitionTo('booking', { step: redirect });
                    }
                }, function () {
                    $state.transitionTo('booking');
                });

            },
            getDuration = function () {
                var hoursTable = {
                    0: {1: 2.5, 2: 2.5, 3: 3, 4: 4.5, 5: 4},
                    1: {1: 2.5, 2: 3, 3: 4, 4: 4.5, 5: 5.5},
                    2: {1: 3, 2: 3.5, 3: 4.5, 4: 5, 5: 6},
                    3: {1: 3.5, 2: 4, 3: 5, 4: 5.5, 5: 6.5},
                    4: {1: 4, 2: 4.5, 3: 5.5, 4: 6, 5: 7},
                    5: {1: 4.5, 2: 5, 3: 6, 4: 6.5, 5: 7.5}
                };
                return hoursTable[$scope.booking.rooms.bedrooms][$scope.booking.rooms.bathrooms] +
                    ($scope.booking.extra.washing ? 1 : 0) +
                    ($scope.booking.extra.window ? 1 : 0) +
                    ($scope.booking.extra.fridge ? 1 : 0) +
                    ($scope.booking.extra.ironing ? 1 : 0) +
                    ($scope.booking.extra.cabinet ? 1 : 0) +
                    ($scope.booking.extra.oven ? 1 : 0);
            },
            getAvailabilityDates = cachePromise(function (d) {
                return Booking.availabilityDates(d.duration, d.postcode, d.date);
            }),
            getBookingPricing = cachePromise(function () {
                return Booking.getBookingPricing();
            });

        $scope.booking = SessionData.get('booking') ? JSON.parse(SessionData.get('booking')) : emptyBooking();

        if ($stateParams.step !== 'register') {
            checkPreviousSteps();
        }

        $scope.step = $scope.booking[$stateParams.step];

        if ($stateParams.step === 'home') {
            $scope.noPets = function (v) {
                if (typeof v === 'undefined') {
                    return typeof $scope.step.pets === 'undefined' ? false : !$scope.step.pets;
                } else {
                    if (v) {
                        $scope.step.pets = null;
                    } else {
                        $scope.step.pets = {};
                    }
                }
            };
        }

        if ($stateParams.step === 'date') {
            $scope.selectDate = function (date) {
                $scope.step.date = date.format('YYYY-MM-DD');
            };

            $scope.getAllDates = function (date, cb) {
                getAvailabilityDates({
                    duration: getDuration(),
                    postcode: $scope.booking.postcode.postcode,
                    date: moment.utc(date).startOf('month')
                }).then(cb);
            };
        }

        if ($stateParams.step === 'periodic') {
            getBookingPricing().then(function (pricing) {
                $scope.pricing = pricing;
            });
        }

        if ($stateParams.step === 'time') {
            getAvailabilityDates({
                duration: getDuration(),
                postcode: $scope.booking.postcode.postcode,
                date: moment.utc($scope.booking.date.date)
            }).then(function (dates) {
                var date = moment.utc($scope.booking.date.date);
                angular.forEach(dates, function (d) {
                    if (d.date && d.date.diff(date) === 0) {
                        $scope.availableTimes = d.availabilities
                            .map(function (av) {
                                return av.from;
                            })
                            .sort()
                            .filter(function (value, key, obj) {
                                return obj.indexOf(value) === key;
                            });
                    }
                });
            });

            $scope.selectTime = function (time) {
                $scope.step.time = time;
            };
        }

        if ($stateParams.step === 'payment') {
            $scope.submitBooking = function () {
                var stepsData = {};
                angular.forEach(steps, function (getStepData, step) {
                    stepsData[step] = getStepData($scope.booking[step]);
                });
                $q.all(stepsData).then(function (data) {
                    var formData = angular.extend(
                        {
                            start_time: moment.utc(data.date.date + ' ' + data.time.time, 'YYYY-MM-DD HH:mm')
                                .toISOString(),
                            duration: getDuration(),
                            duration_selected: getDuration()
                        },
                        data.postcode, data.rooms, data.extra, data.home,
                        data.address, data.contact, data.periodic, data.payment
                    );

                    Booking.submitBooking(formData).then(function (d) {
                        if (d.status === 200) {
                            if (d.data.data.password) {
                                Auth.login(d.data.data.client_id, d.data.data.password);
                            }
                            $scope.step.booking_id = d.data.data.booking_id;

                            $state.transitionTo('booking', { step: 'register' });
                        }
                    });
                });
            };
        }

        if ($stateParams.step === 'register') {
            $scope.register = function () {
                User.changePassword($scope.step.password);
            };
        }

        $scope.isValidStep = false;

        $scope.$watch('step', function (data) {
            $q.when(steps[$stateParams.step](data)).then(function (data) {
                $scope.isValidStep = !!data;
            }, function () {
                $scope.isValidStep = false;
            })
        }, true);

        $scope.next = function () {
            var nextStep = getNextStep();
            if (nextStep && $scope.isValidStep) {
                SessionData.set('booking', JSON.stringify($scope.booking));
                $state.transitionTo('booking', { step: nextStep });
            }
        };
        $scope.allBookings = [];
    }]);
