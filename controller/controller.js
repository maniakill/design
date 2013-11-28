var ctrl = angular.module('ctrl', []);

ctrl.controller('start',['$scope', '$timeout', '$location',
    function ($scope,$timeout,$location){
        var target = localStorage.token ? '/timesheet' : '/login';
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
                        $location.path('/timesheet');
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
        if($routeParams.y && $routeParams.m && $routeParams.d){ 
            var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
        }else{
            var time='';
        }
        
        project.getTime(time).then(function(results){
            if(typeof(results.response.project) == 'object'){
                $scope.projects = results.response.project;
                for(x in $scope.projects){
                    for(y in $scope.projects[x]['task']){
                        $scope.projects[x]['task'][y]['hours'] = number2hour($scope.projects[x]['task'][y]['hours']);                        
                    }                
                }
            }
        });

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

ctrl.controller('footer',['$scope', '$routeParams',
    function ($scope, $routeParams){
        var d = new Date();
        $scope.timed = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    }
]);

ctrl.controller('header',['$scope', '$timeout', '$routeParams', '$location', '$route', '$modal', '$log',
    function ($scope, $timeout, $routeParams,$location, $route, $modal, $log){
        $scope.timesheet = true;
        $scope.add_page = true;

        switch($route.current.controller){
            case 'timesheet':
                $scope.timesheet = false;
                break;
            case 'add':
                $scope.add_page = false;
                break;
            case 'lists':
                $scope.add_page = false;
                break;
            default:
                $scope.timesheet = false;
                break;
        }

        $scope.today = function() {
            if($routeParams.y && $routeParams.m && $routeParams.d){ 
                $scope.dt = new Date($routeParams.y, $routeParams.m-1, $routeParams.d);                
            }else{
                $scope.dt = new Date();                
            }
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

        /*$scope.add = function(){
            $location.path('/add');
        }*/
        
        $scope.times = function(){
            $location.path('/timesheet');   
        }

        /*modal*/
        $scope.task_type = [ { title: 'Add Task for Project', url: '/lists' }, {title: 'Add Ad Hoc Task', url: '/lists/adhoc'} ];

        $scope.add = function () {

            var modalInstance = $modal.open({
              templateUrl: 'layout/task_type.html',
              controller: 'task_type',
              resolve: {
                items: function () {
                  return $scope.task_type;
                }
              }
            });

            /*modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              // $log.info('Modal dismissed at: ' + new Date());
            });*/
        };
        /*modalend*/
    }
]);

ctrl.controller('add',['$scope','$routeParams', 'project', '$location',
    function ($scope, $routeParams, project, $location){
        $scope.date = 'today';
        $scope.customer = 'Customer Name';
        $scope.project = 'Project Name';
        $scope.task = 'Select Task';

        if($routeParams.item){
            var p = project.getProject($routeParams.item);
            if(p){
                $scope.project = p.project_name;
                $scope.customer = p.customer_name;
            }else{
                $location.path('/timesheet');
            }
        }

        $scope.today = function() {
            if($routeParams.y && $routeParams.m && $routeParams.d){ 
                $scope.dta = new Date($routeParams.y, $routeParams.m-1, $routeParams.d);
            }else{
                $scope.dta = new Date();
            }
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
    }
]);

ctrl.controller('task_type',['$scope','$modalInstance','items', '$location',
    function ($scope, $modalInstance, items, $location) {
        $scope.items = items;
        
        $scope.open = function(url){
            $location.path(url);
            $scope.cancel();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

]);

ctrl.controller('lists',['$scope', '$http', '$location', 'project',
    function ($scope, $http, $location, project ){
        $scope.items = [];

        project.getProjectList().then(function(results){
            if(typeof(results.response[0].projects) == 'object'){
                $scope.items = results.response[0].projects;               
            }
        });

        $scope.open = function (item){
            $location.path('/add/'+item)
        }

    }
]);