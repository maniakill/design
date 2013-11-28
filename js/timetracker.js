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
        .when('/timesheet',{
                controller: 'timesheet',
                templateUrl: 'layout/timesheet.html'
            })
        .when('/timesheet/:d/:m/:y',
            {
                controller: 'timesheet',
                templateUrl: 'layout/timesheet.html'
            })
        .when('/lists',
            {
                controller: 'lists',
                templateUrl: 'layout/lists.html'
            })
        // .when('/add',
        //     {
        //         controller: 'add',
        //         templateUrl: 'layout/add.html'
        //     })
        .when('/add/:item',
            {
                controller: 'add',
                templateUrl: 'layout/add.html'
            })
        .otherwise({ redirectTo: '/' });
});

app.factory('project', ['$http','$templateCache',
    function ($http, $templateCache) {
        var project = {},
            url = 'https://go.salesassist.eu/pim/mobile/',
            key = 'api_key='+localStorage.token+'&username='+localStorage.username,
            project_list = [];
        
        project.getTime = function(time) {
            this.data = $http.get(url+'index.php?do=mobile-time&'+key+'&start='+time).then(function(response){
                return response.data;
            });
            return this.data;
        }

        project.getProjectList = function(){
            this.data = $http.get(url+'index.php?do=mobile-project_list&'+key).then(function(response){
                if(typeof(response.data.response[0].projects) == 'object'){
                   project_list = response.data.response[0].projects;               
                }
                return response.data;
            });
            return this.data;
        }

        project.getProject = function(id){
            for (x in project_list) {
                if (project_list[x].project_id === id) {
                    return project_list[x];
                }
            }
            return null;
        }
        
        return project;
    }
]);


