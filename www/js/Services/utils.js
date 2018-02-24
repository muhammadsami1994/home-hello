(function () {
    'use strict';

    angular
        .module('homehello.utils', [])
        .factory('$localstorage', ['$window', function ($window) {
            return {
                set: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                setObject: function (key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function (key) {
                    return JSON.parse($window.localStorage[key] || '{}');
                }
            }
        }])

        .factory('cachePromise', ['$q', function ($q) {
            var cache = {};
            return function (fn) {
                var fnCache = cache[fn.toString()] || {},
                    setFnCache = function (args, val) {
                        cache[fn.toString()] = {
                            args: JSON.stringify(args),
                            lastValue: val
                        };
                    };
                return function () {
                    var args = arguments;

                    if (JSON.stringify(args) === fnCache.args) {
                        return $q.resolve(fnCache.lastValue);
                    }

                    return fn.apply(null, args).then(function (val) {
                        setFnCache(args, val);
                        return val;
                    }, function (err) {
                        setFnCache(args, null);
                        return $q.reject(err);
                    });
                };
            };
        }])

        .factory('SessionData', ['$localstorage', function ($localstorage) {
            var getData = function () {
                    return JSON.parse($localstorage.get('sessionData', "{}"));
                },
                setData = function (data) {
                    $localstorage.set('sessionData', JSON.stringify(data))
                },
                clear = function () {
                    setData({});
                },
                setValue = function (key, value) {
                    var data = getData();

                    if (value === null) {
                        delete data[key];
                    } else {
                        data[key] = value;
                    }

                    setData(data);
                },
                setValues = function (values) {
                    angular.forEach(values, function (value, key) {
                        setValue(key, value);
                    });
                },
                deleteValue = function (key) {
                    var data = getData();
                    delete data[key];
                    setData(data);
                },
                getValue = function (key) {
                    var data = getData();
                    return typeof key === 'undefined' ? data : data[key];
                },
                sessionData = function (key, value) {
                    if (key === null) {
                        clear();
                    }

                    if (typeof value === 'undefined') {
                        if (typeof key === 'undefined') {
                            return getData();
                        } else if (typeof key === 'object') {
                            setValues(key);
                        } else {
                            return getValue(key);
                        }
                    }

                    if (value === null) {
                        deleteValue();
                    } else {
                        setValue(key, value);
                    }
                };

            sessionData.clear = clear;
            sessionData.set = setValue;
            sessionData.setValues = setValues;
            sessionData.delete = deleteValue;
            sessionData.get = getValue;

            return sessionData;
        }]);
})();
