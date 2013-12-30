var ctrl = angular.module('ctrl', []);
// start
ctrl.controller('start',['$scope', '$timeout', '$location',
    function ($scope,$timeout,$location){
        var target = localStorage.token ? '/timesheet' : '/login';
        $timeout(function() {
            $location.path(target);
        }, 4000);
    }
]);
// login
ctrl.controller('login',['$scope', '$http', '$templateCache','$location', '$timeout',
    function ($scope, $http, $templateCache, $location, $timeout) {
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
                        $scope.alerts = [
                            { type: 'error', msg: data.error_code }                            
                        ];
                        $timeout(function(){
                            $scope.closeAlert(0);
                        },3000)
                        
                    }
                }).
                error(function(data, status) {
                   // something went very wrong!!! (maybe server error)
                   $scope.alerts = [
                        { type: 'error', msg: 'Server error. Please try later' }
                    ];
                    $timeout(function(){
                        $scope.closeAlert(0);
                    },3000)
                });
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };         
    }
]);
// timesheet
ctrl.controller('timesheet',['$scope', '$timeout','project', '$routeParams', '$location',
    function ($scope, $timeout ,project, $routeParams, $location){
        $scope.projects = [];
        if($routeParams.y && $routeParams.m && $routeParams.d){ 
            var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
        }else{
            var time='';
        }
        $scope.no_project = false;
        
        function onLoad() {
            alert('start');
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        onLoad();
        // device APIs are available
        //
        function onDeviceReady() {
            document.addEventListener("online", onOnline, false);
            alert('Device Ready');
        }

        // Handle the online event
        //
        function onOnline() {
            alert('Connected to the internet');
        }


        project.getTime(time).then(function(results){
            if(typeof(results.response.project) == 'object'){
                $scope.no_project = true;
                $scope.projects = results.response.project;
                for(x in $scope.projects){
                    for(y in $scope.projects[x]['task']){
                        $scope.projects[x]['task'][y]['hours'] = number2hour($scope.projects[x]['task'][y]['hours']);                        
                    }
                }
                // console.log($scope.projects);      
            }
        });

        $scope.test = function(){
            $scope.projects.task[0].hours='1:00';
        }

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

        $scope.editTask = function(pId, tId, notes, adhoc, cId){
            project.setNote(notes);
            if(adhoc == 'ad hoc'){
                $location.path('/add_a/'+cId+'/'+tId);
            }else{
                $location.path('/add/'+pId+'/'+tId);                
            }
        }

        $scope.addNewTask = function(){
            project.addNewTask();
        }
    }
]);
// footer
ctrl.controller('footer',['$scope', '$routeParams', '$route', '$modal', 'project',
    function ($scope, $routeParams, $route, $modal, project){
        var d = new Date();
        // $scope.timed = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
        $scope.timesheet = true;
        $scope.expense = true;
        $scope.account = true;

        switch($route.current.controller){
            case 'expenses':
            case 'expenses_list':
            case "lists_e":
                $scope.expense = false;
                $scope.expenseAct = 'act';
                break;
            case 'account':
                $scope.account = false;
                $scope.accountAct = 'act';
                break;
            default:
                $scope.timesheet = false;
                $scope.timesheetAct = 'act';
                break;
        }
        
        switch($route.current.originalPath){
            case "/lists/expense/":
            case "/lists_a/expense/":

                $scope.expense = false;
                $scope.expenseAct = 'act';
                $scope.timesheet = true;
                $scope.timesheetAct = '';
                break;
        }
    }
]);
// header
ctrl.controller('header',['$scope', '$timeout', '$routeParams', '$location', '$route', '$modal', 'project',
    function ($scope, $timeout, $routeParams, $location, $route, $modal, project ){
        var link = $route.current.originalPath.search('expense') > 0 ? ($route.current.originalPath.search('expensea') > 0 ? '/expenses_a/' : '/expenses/') : ( $route.current.originalPath.search('Notea') > 0 ? '/add_a/' : '/add/'),
            note = $route.current.originalPath.search('Amount') > 0 ? false : true,
            type = $route.current.originalPath.search('expense') > 0 ? ($route.current.originalPath.search('_a') > 0 ? 'expenses_a' : 'expenses') : ( $route.current.originalPath.search('_a') > 0 ? 'add_a' : ''),
            alertText = ['project','task'];
        $scope.timesheet = true;
        $scope.add_page = true;
        $scope.add_note = true;
            
        switch($route.current.controller){
            case 'timesheet':
                $scope.timesheet = false;
                $scope.task_type = [ { title: 'Add Task for Project', url: '/lists' }, { title: 'Add Ad Hoc Task', url: '/lists_a'} ];
                $scope.types = 'Task';
                break;
            case 'expenses_list':
                $scope.timesheet = false;
                $scope.task_type = [ { title: 'Add Expense for Project', url: '/lists/expense' }, {title: 'Add Ad Hoc Expense', url: '/lists_a/expense'} ];
                $scope.types = 'Expense';                
                break;
            case 'add':
            case 'add_a':
            case 'lists':
            case 'lists_a':
            case 'lists_e':
                $scope.add_page = false;
                break;
            case 'expenses':
                $scope.add_page = false;
                alertText = ['project','expense'];
                break;
            case 'addNote':
            case 'addAmount':
                $scope.add_note = false;
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

        $scope.times = function(){
            $location.path('/timesheet');
        }

        $scope.addpage = function(write){
            if(write){
                if($scope.notes){ project.setNote($scope.notes); }
                if($scope.amount){ project.setAmount($scope.amount); }
            }
            var url = link+$routeParams.pId;
            if($routeParams.tId){
                url += '/'+$routeParams.tId;
            }
            $location.path(url);    
        }

        /*modal*/

        $scope.add = function () {
            var modalInstance = $modal.open({
              templateUrl: 'layout/task_type.html',
              controller: 'task_type',
              resolve: {
                items: function () {
                    project.setNote();
                    project.setAmount();
                    project.setHours();
                    project.setDate();
                    return $scope.task_type;
                },
                types: function(){
                    return $scope.types;
                }
              }
            });
        };
        /*modalend*/

        $scope.save = function(){
            if(!$routeParams.item){
                alert("Please select a "+alertText[0]);
                return false;
            }
            if(!$routeParams.taskId){
                alert("Please select a "+alertText[1]);
                return false;
            }
            var notes = project.getNote();

            project.save(type,$routeParams.item,$routeParams.taskId,notes);
        }

        $scope.$on('clickAdd', function() {
            $scope.add();
        }); 
    }
]);
// add
ctrl.controller('add',['$scope','$routeParams', 'project', '$location', '$timeout',
    function ($scope, $routeParams, project, $location, $timeout){
        $scope.date = 'today';
        $scope.customer = 'Customer Name';
        $scope.project = 'Project Name';
        $scope.task = 'Select Task';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;
        // $scope.no_notes = project.getNote() ? true : false;
        if($routeParams.item){
            var p = project.getProject($routeParams.item);
            if(p){
                $scope.project = p.project_name;
                $scope.customer = p.customer_name;
                $scope.projectId = p.project_id;
                if($routeParams.taskId){
                    var t = project.getTask($routeParams.taskId);
                    if(t){
                        $scope.no_task = true;
                        $scope.task = t.name;
                        $scope.taskId = t.id;
                    }
                }
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
        
        $scope.selectTask = function(id){
            $location.path('/lists/'+id);
        }

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        /*timepicker*/
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = false;
       
        $scope.update = function() {
            var d = new Date();
            d.setHours( 0 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };
        $scope.update();

        $scope.changed = function () {
            var hours = $scope.mytime.getHours(),
                minutes = $scope.mytime.getMinutes();
                t = hours + minutes/60;
            project.setHours(t);
        };

        /*timepicker end*/

        $scope.addNote = function(pId,tId){
            var url = '/addNote/'+pId;
            if(tId){
                url += '/'+tId; 
            }
            $location.path(url);
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.$on('addError', function(arg,args) {
            $scope.alerts = [
                { type: 'error', msg: args }
            ];
            $timeout(function(){
                $scope.closeAlert(0);
            },3000)
        }); 
        

    }
]);
// task_type
ctrl.controller('task_type',['$scope','$modalInstance','items', '$location', 'types',
    function ($scope, $modalInstance, items, $location, types) {
        $scope.items = items;
        $scope.types = types;
        
        $scope.open = function(url){
            $location.path(url);
            $scope.cancel();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

]);
// lists
ctrl.controller('lists',['$scope', '$http', '$location', 'project', '$routeParams', '$route',
    function ($scope, $http, $location, project, $routeParams, $route){
        var link = $route.current.originalPath == '/lists/expense/' ? '/expenses/' : '/add/';
        $scope.items = [];
        $scope.tasks = [];
        $scope.projectList = true;
        $scope.taskList = true;
        
        if($routeParams.projectId){
            $scope.taskList = false;
            $scope.projectId = $routeParams.projectId;
            project.getProjectTaskList($routeParams.projectId).then(function(results){
                if(typeof(results.tasks) == 'object'){
                    $scope.tasks = results.tasks;               
                }                
            });
        }else{
            $scope.projectList = false;
            project.getProjectList().then(function(results){
                if(typeof(results.response[0].projects) == 'object'){
                    $scope.items = results.response[0].projects;               
                }
            });
        }

        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);    
            }else{
                $location.path(link+pId);                
            }
        }

    }
]);
// lists_a
ctrl.controller('lists_a',['$scope', '$http', '$location', 'project', '$routeParams', '$route',
    function ($scope, $http, $location, project, $routeParams, $route){
        var link = $route.current.originalPath == '/lists_a/expense/' ? '/expenses_a/' : '/add_a/';
        $scope.items = [];
        $scope.tasks = [];
        $scope.projectList = true;
        $scope.taskList = true;
        
        if($routeParams.customerId){
            $scope.taskList = false;
            $scope.customerId = $routeParams.customerId;
            project.getCustomerTaskList($routeParams.customerId).then(function(results){
                if(typeof(results.tasks) == 'object'){
                    $scope.tasks = results.tasks;               
                }                
            });
        }else{
            $scope.projectList = false;
            project.getCustomerList().then(function(results){
                if(typeof(results.response[0].customers) == 'object'){
                    $scope.items = results.response[0].customers;               
                }
            });
        }

        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);    
            }else{
                $location.path(link+pId);                
            }
        }

    }
]);
// lists
ctrl.controller('lists_e',['$scope', '$http', '$location', 'project', '$routeParams', '$route',
    function ($scope, $http, $location, project, $routeParams, $route){
        var prj = $route.current.originalPath.search('_ea') > 0 ? false : true;
        var link = prj ? '/expenses/' : '/expenses_a/' ;
        $scope.expense = [];
        $scope.projectId = $routeParams.projectId;
        
        project.getExpensesList().then(function(results){
            if(typeof(results[0].expense) == 'object'){
                $scope.expense = results[0].expense;               
            }
        });
        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);
            }else{
                $location.path(link+pId);                
            }
        }

    }
]);
// addNote
ctrl.controller('addNote',['$scope', 'project', 
    function ($scope, project){
        $scope.notes =  project.getNote() ? project.getNote() : '';
    }
]);
// addAmount
ctrl.controller('addAmount',['$scope', 'project',
    function ($scope, project, $route){
        $scope.amount =  project.getAmount() ? project.getAmount() : '';
    }
]);
// expenses
ctrl.controller('expenses',['$scope','$routeParams', 'project', '$location', '$timeout', '$route',
    function ($scope, $routeParams, project, $location, $timeout, $route){ 
        var prj = $route.current.originalPath.search('_a') > 0 ? false : true;
        $scope.date = 'today';
        $scope.customer = 'Select Expense';
        $scope.project = 'Project Name';
        $scope.task = 'Receipt Photo';
        $scope.amount = project.getAmount() ? project.getAmount() : 'Select Amount';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;

        if($routeParams.item){
            if(prj){
                var p = project.getProject($routeParams.item);
                if(p){
                    $scope.project = p.project_name;
                    $scope.projectId = p.project_id;
                    if($routeParams.taskId){
                        var t = project.getExpense($routeParams.taskId);
                        if(t){
                            $scope.no_task = true;
                            $scope.customer = t.name;
                            $scope.taskId = t.expense_id;
                        }
                    }
                }else{
                    // $location.path('/timesheet');
                }
            }else{
                var p = project.getCustomer($routeParams.item);
                if(p){
                    $scope.project = p.name;
                    $scope.projectId = p.id;
                    if($routeParams.taskId){
                        var t = project.getExpense($routeParams.taskId);
                        if(t){
                            $scope.no_task = true;
                            $scope.customer = t.name;
                            $scope.taskId = t.expense_id;
                        }
                    }
                }else{
                    // $location.path('/timesheet');
                }
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
        
        $scope.selectExpense = function(id){
            if(prj){
                $location.path('/lists_e/'+id);
            }else{
                $location.path('/lists_ea/'+id);
            }
        }

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        /*timepicker*/
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = false;
       
        $scope.update = function() {
            var d = new Date();
            d.setHours( 0 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };
        $scope.update();

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.mytime);
        };

        /*timepicker end*/

        $scope.addNote = function(pId,tId){
            var url = '/addNote_expense/'+pId;
            if(!prj){
                url = '/addNote_expensea/'+pId;
            }
            if(tId){
                url += '/'+tId; 
            }
            $location.path(url);
        }

        $scope.addAmount = function(pId,tId){
            var url = '/addAmount_expense/'+pId;
            if(!prj){
                url = '/addAmount_expensea/'+pId;
            }
            if(tId){
                url += '/'+tId; 
            }
            $location.path(url);
        }

    }
]);
//acount
ctrl.controller('account',['$scope', '$location',
    function ($scope, $location){
        $scope.username = localStorage.username;

        $scope.logout = function (){
            localStorage.username = '';
            localStorage.token = '';
            $location.path('/start');
        }
    }
]);
//pending
ctrl.controller('pending',['$scope', '$location',
    function ($scope, $location){
       
    }
]);

// add adhoc
ctrl.controller('add_a',['$scope','$routeParams', 'project', '$location', '$timeout',
    function ($scope, $routeParams, project, $location, $timeout){
        $scope.date = 'today';
        $scope.customer = 'Customer Name';
        $scope.task = 'Select Task';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;
        
        // $scope.no_notes = project.getNote() ? true : false;
        if($routeParams.item){
            var p = project.getCustomer($routeParams.item);
            if(p){
                $scope.customer = p.name;
                $scope.customerId = p.id;
                if($routeParams.taskId){
                    var t = project.getAdhocTask($routeParams.taskId);
                    if(t){
                        $scope.no_task = true;
                        $scope.task = t.name;
                        $scope.taskId = t.id;
                    }
                }
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
        
        $scope.selectTask = function(id){
            $location.path('/lists_a/'+id);
        }

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        /*timepicker*/
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = false;
        
        $scope.update = function() {
            var d = new Date();
            d.setHours( 0 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };
        $scope.update();

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.mytime);
        };

        /*timepicker end*/

        $scope.addNote = function(pId,tId){
            var url = '/addNotea/'+pId;
            if(tId){
                url += '/'+tId; 
            }
            $location.path(url);
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.$on('addError', function(arg,args) {
            $scope.alerts = [
                { type: 'error', msg: args }
            ];
            $timeout(function(){
                $scope.closeAlert(0);
            },3000)
        });

    }
]);
// timesheet
ctrl.controller('expenses_list',['$scope', '$timeout','project', '$routeParams', '$location',
    function ($scope, $timeout ,project, $routeParams, $location){
        $scope.projects = [];
        if($routeParams.y && $routeParams.m && $routeParams.d){ 
            var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
        }else{
            var time='';
        }
        $scope.no_project = false;
        
        project.getExpenses(time).then(function(results){
            if(typeof(results.response.expense) == 'object'){
                $scope.no_project = true;
                $scope.expense = results.response.expense;                
            }
        });

        $scope.editTask = function(pId, tId, notes, amount, adhoc, cId){
            project.setNote(notes);
            project.setAmount(amount);
            if(adhoc == "ad hoc"){
                $location.path('/expenses_a/'+cId+'/'+tId);    
            }else{
                $location.path('/expenses/'+pId+'/'+tId);                
            }
        }

        $scope.addNewTask = function(){
            project.addNewTask();
        }
    }
]);