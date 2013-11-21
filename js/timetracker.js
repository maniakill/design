/// <reference path="../Scripts/angular-1.1.4.js" />

var app = angular.module('timeT', ['ngRoute','ctrl','ui.bootstrap']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'start',
                templateUrl: 'layout/start.html'
            })
        .when('/login',
            {
                controller: 'login',
                templateUrl: 'layout/login.html'
            })
        .when('/timesheet/:d/:m/:y',
            {
                controller: 'timesheet',
                templateUrl: 'layout/timesheet.html'
            })
        .otherwise({ redirectTo: '/' });
});

app.factory('project', ['$http','$templateCache',
    function ($http, $templateCache) {
        return {
            getProjects: function(time,callback) {
                $http.get('https://go.salesassist.eu/pim/mobile/index.php?do=mobile-time&api_key='+localStorage.token+'&username='+localStorage.username+'&start='+time).success(callback);
            }
        };
        
    }
]);


