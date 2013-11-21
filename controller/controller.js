var ctrl = angular.module('ctrl', []);

ctrl.controller('start',['$scope', '$timeout', '$location',
    function ($scope,$timeout,$location){
        var d = new Date(),
            timed = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
        var target = localStorage.token ? '/timesheet/'+timed : '/login';
        $timeout(function() {
            $location.path(target);
        }, 2000);
    }
]);

ctrl.controller('login',['$scope', '$http', '$templateCache','$location',
    function ($scope, $http, $templateCache, $location) {
        $scope.method = 'POST';
        $scope.url = 'https://go.salesassist.eu/pim/mobile/';
        $scope.loged = '';
        $scope.params = [];
        
        $scope.fetch = function() {
            $scope.params['username'] = $scope.username;
            $scope.params['password'] = $scope.password;
            if($scope.params['username'] && $scope.params['password']){ 
                $http({method: $scope.method, url: $scope.url, cache: $templateCache, params: $scope.params }).
                success(function(data, status) {
                    if(data.code == 'ok'){
                        localStorage.token = data.response;
                        localStorage.username = $scope.params['username'];
                        var d = new Date(),
                            timed = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                        $location.path('/timesheet/'+timed);
                    }else{
                        // something went very wrong!!! (maybe script error)
                    }
                }).
                error(function(data, status) {
                   // something went very wrong!!! (maybe server error)
                });
            }
        };         
    }
]);

ctrl.controller('timesheet',['$scope', '$timeout','project', '$routeParams',
    function ($scope, $timeout ,project, $routeParams){
        $scope.projects = [];
        var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
        project.getProjects(time, function(results) {
            if(typeof(results.response.project) == 'object'){
                $scope.projects = results.response.project;
                for(x in $scope.projects){
                    for(y in $scope.projects[x]['task']){
                        $scope.projects[x]['task'][y]['hours'] = number2hour($scope.projects[x]['task'][y]['hours']);                        
                    }                
                }
            }
        });        
    
        $scope.today = function() {
            $scope.dt = new Date($routeParams.y, $routeParams.m-1, $routeParams.d);            
        };
        $scope.today();

        $scope.open = function() {
            $timeout(function() {
                $scope.opened = true;
            });
        };
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        function number2hour(number){
            var value = '0:00';
            if(isNaN(number) === true){
                return value;
            }else{
                var minutes = number;
                if(isNaN(minutes)){
                    minutes = 0;
                }
                minutes = Math.round(minutes * 60);
                if(minutes >=60){
                    var n = Math.floor(minutes/60);
                    minutes = minutes - (60*n);
                    if(minutes.toString().length == 1){
                        minutes = '0'+minutes;
                    }
                    value = n +":"+minutes;
                }
                else{
                    if(minutes.toString().length == 1){
                        minutes = '0'+minutes;
                    }
                    value = "0:"+minutes;
                }
            }
            return value;
        }
    }
]);