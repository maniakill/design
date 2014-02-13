var ctrl = angular.module('ctrl', []);
// start
ctrl.controller('start',['$scope', '$timeout', '$location',
    function ($scope,$timeout,$location){
        var token = localStorage.getItem('token');
        var target = token ? '/timesheet' : '/login';
        $timeout(function() {
            $location.path(target);
            // $navigate.go(target,'slide');
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
                        localStorage.setItem('token',data.response);
                        localStorage.setItem('username',$scope.params['username']);
                        $location.path('/timesheet');
                        // $navigate.go('/timesheet','slide')
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
            var d = new Date();
            var time=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
        }
        $scope.no_project = true;

        if(!project.taskTimeId[time]){
            project.taskTimeId[time] = {};
        }

        $scope.projects = project.taskTimeId[time];
        // console.log(project.taskTimeId[time]);
        if(JSON.stringify(project.taskTimeId[time]) == '{}'){
            $scope.no_project = false;
        }

        project.getTime(time).then(function(){
            $scope.no_project = true;
            if(JSON.stringify(project.taskTimeId[time]) == '{}'){
                $scope.no_project = false;
            }
        });

        $scope.getP = function(item){
            var p = project.getProject(item);
            return p.project_name;
        }

        $scope.getTaskName = function(pr, item){
            var t = project.getTask(pr, item);
            return t.task_name;
        }

        $scope.showh = function(item){
            return number2hour(item);
        }

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

        $scope.editTask = function(pId, tId, notes, adhoc, cId, taskTimeId){
            project.setNote(notes);
            if(adhoc == 'ad hoc'){
                // $navigate.go('/add_a/'+cId+'/'+tId+'/'+pId+'/'+taskTimeId+'/'+time,'slide');
                $location.path('/add_a/'+cId+'/'+tId+'/'+pId+'/'+taskTimeId+'/'+time);
            }else{
                $location.path('/add/'+pId+'/'+tId+'/'+taskTimeId+'/'+time);
                // $navigate.go('/add/'+pId+'/'+tId+'/'+taskTimeId+'/'+time,'slide');
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
    function ($scope, $timeout, $routeParams, $location, $route, $modal, project){
        var link = $route.current.originalPath.search('expense') > 0 ? ($route.current.originalPath.search('expensea') > 0 ? '/expenses_a/' : '/expenses/') : ( $route.current.originalPath.search('Notea') > 0 ? '/add_a/' : '/add/'),
            link2 = $route.current.originalPath.search('expense') > 0 ? '/expenses_list' : '/timesheet',
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
                $scope.add_page = false;
                break;
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
            var url = link2;
            if($routeParams.y && $routeParams.m && $routeParams.d){
                url += '/'+ $routeParams.d +'/'+ $routeParams.m +'/'+ $routeParams.y;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
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
            if($routeParams.taskTimeId){
                if($routeParams.projectId){
                    url += '/'+$routeParams.projectId;
                }
                url += '/'+ $routeParams.taskTimeId +'/'+ $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
            }
            if($routeParams.expId){
                url += '/'+$routeParams.expId;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
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

        $scope.$on('clickAdd', function() {
            $scope.add();
        });
    }
]);
// add
ctrl.controller('add',['$scope','$routeParams', 'project', '$location', '$timeout',
    function ($scope, $routeParams, project, $location, $timeout){
        var alertText = ['project','task'],
            time = '';
        $scope.date = 'today';
        $scope.customer = 'Customer Name';
        $scope.project = 'Project Name';
        $scope.task = 'Select Task';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;

        if($routeParams.item){
            var p = project.getProject($routeParams.item);
            if(p){
                $scope.project = p.project_name;
                $scope.customer = p.customer_name;
                $scope.projectId = p.project_id;
                if($routeParams.taskId){
                    var t = project.getTask($routeParams.item,$routeParams.taskId);
                    if(t){
                        $scope.no_task = true;
                        $scope.task = t.task_name;
                        $scope.taskId = t.task_id;
                    }
                    if($routeParams.taskTimeId){
                        time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
                        var h = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].hours;
                        var d = new Date();
                        d.setHours( Math.floor(h) );
                        //  calculating the minutes
                        var minutes = h;
                        if(isNaN(minutes)){
                            minutes = 0;
                        }
                        minutes = Math.round(minutes * 60);
                        if(minutes >= 60){
                            var n = Math.floor(minutes/60);
                            minutes = minutes - (60*n);
                        }
                        d.setMinutes( minutes );
                        //  calculating the minutes
                        $scope.mytime = d;
                    }
                }
            }else{
                // $navigate.go('/timesheet','slide');
                $location.path('/timesheet');
            }
        }

        $scope.today = function() {
            $scope.dta = new Date();
        };
        $scope.today();

        $scope.open = function() {
            if(!$routeParams.taskTimeId){
                $timeout(function() {
                    $scope.opened = true;
                });
            }
        };

        $scope.selectTask = function(id){
            if(!$routeParams.taskTimeId){
                $location.path('/lists/'+id);
                // $navigate.go('/lists/'+id,'slide');
            }
        }

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        /*timepicker*/
        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = false;

        $scope.update = function() {
            var d = new Date();
            d.setHours( 0 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        if(!$routeParams.taskTimeId){
            $scope.update();
            $scope.mode = false;
        }else{
            $scope.time2 = time;
            var item  = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId];
            if(item.active){
                $scope.mode = true;
            }else{
                $scope.mode = false;
            }
        }

        $scope.save = function(){
            if(!$routeParams.item){
                $scope.alerts = [{ type: 'error', msg: "Please select a "+alertText[0] }];
                $timeout(function(){
                    $scope.closeAlert(0);
                },3000);
                return false;
            }
            if(!$routeParams.taskId){
                $scope.alerts = [{ type: 'error', msg: "Please select a "+alertText[1] }];
                $timeout(function(){
                    $scope.closeAlert(0);
                },3000);
                return false;
            }
            var notes = project.getNote();
            if($routeParams.taskTimeId){
                project.start(item,$scope.time2);
            }else{
                project.save('',$routeParams.item,$routeParams.taskId,notes);
            }
        }

        $scope.stop = function(){
            project.stop(item,$scope.time2);
        }

        $scope.changed = function () {
            if(!$routeParams.taskTimeId){
                var hours = $scope.mytime.getHours(),
                minutes = $scope.mytime.getMinutes();
                t = hours + minutes/60;
                project.setHours(t);
            }
        };

        /*timepicker end*/

        $scope.addNote = function(pId,tId){
            var url = '/addNote/'+pId;
            if(tId){
                url += '/'+tId;
            }
            if($routeParams.taskTimeId){
                url += '/'+ $routeParams.taskTimeId +'/'+ $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
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
            },3000);
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
            // $navigate.go(url,'slide');
            $scope.cancel();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

]);
ctrl.controller('task_type1',['$scope','$modalInstance','items', '$location', 'types',
    function ($scope, $modalInstance, items, $location, types) {
        $scope.items = items;
        $scope.types = types;

        $scope.open = function(url){
            switch(url){
                case 'capturePhoto()':
                    capturePhoto();
                    break;
                case 'getPhoto(pictureSource.PHOTOLIBRARY)':
                    getPhoto(pictureSource.PHOTOLIBRARY);
                    break;
            }
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
        $scope.projs = project.time;
        $scope.items = [];
        $scope.tasks = [];
        $scope.projectList = true;
        $scope.taskList = true;

        if($routeParams.projectId){
            $scope.taskList = false;
            $scope.projectId = $routeParams.projectId;
            $scope.tasks = project.time[$scope.projectId].task;
            project.getProjectTaskList($scope.projectId);
            /*project.getProjectTaskList($routeParams.projectId).then(function(results){
                if(typeof(results.tasks) == 'object'){
                    $scope.tasks = results.tasks;
                }
            });*/
        }else{
            $scope.projectList = false;
            $scope.items = noAdHocP($scope.projs);
            project.getProjectList().then(function(results){
                if(typeof(results.response[0].projects) == 'object'){
                    $scope.items = noAdHocP($scope.projs);
                }
            });
        }

        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);
                // $navigate.go(link+pId+'/'+tId,'slide');
            }else{
                $location.path(link+pId);
                // $navigate.go(link+pId,'slide')
            }
        }

        function noAdHocP(p){
            var ps = {};
            if(p){
                for(x in p){
                    if(p[x].project_name != 'ad hoc'){
                        ps[x] = p[x];
                    }
                }
            }
            return ps;
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
            $scope.tasks = project.adhocTask;
            project.getCustomerTaskList($routeParams.customerId);
        }else{
            $scope.projectList = false;
            $scope.items = project.customers;
            project.getCustomerList();
        }

        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);
                // $navigate.go(link+pId+'/'+tId,'slide');
            }else{
                $location.path(link+pId);
                // $navigate.go(link+pId,'slide');
            }
        }

    }
]);
// lists
ctrl.controller('lists_e',['$scope', '$http', '$location', 'project', '$routeParams', '$route',
    function ($scope, $http, $location, project, $routeParams, $route){
        var prj = $route.current.originalPath.search('_ea') > 0 ? false : true;
        var link = prj ? '/expenses/' : '/expenses_a/' ;
        $scope.expense = project.expenseList;
        $scope.projectId = $routeParams.projectId;
        project.getExpensesList();

        $scope.open = function (pId,tId){
            if(tId){
                $location.path(link+pId+'/'+tId);
                // $navigate.go(link+pId+'/'+tId,'slide')
            }else{
                $location.path(link+pId);
                // $navigate.go(link+pId,'slide');
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
ctrl.controller('expenses',['$scope','$routeParams', 'project', '$location', '$timeout', '$route', '$modal',
    function ($scope, $routeParams, project, $location, $timeout, $route, $modal){
        var prj = $route.current.originalPath.search('_a') > 0 ? false : true,
            type = $route.current.originalPath.search('_a') > 0 ? 'expenses_a' : 'expenses',
            alertText = ['project','expense','amount'];
        $scope.date = 'today';
        $scope.customer = 'Select Expense';
        $scope.project = 'Project Name';
        $scope.task = 'Receipt Photo';
        $scope.amount = project.getAmount() ? project.getAmount() : 'Select Amount';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;
        $scope.task_type = [ { title: 'Take Photo', url: 'capturePhoto()' }, { title: 'Go to galery', url: 'getPhoto(pictureSource.PHOTOLIBRARY)'} ];

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
                    $location.path('/expenses_list');
                    // $navigate.go('expenses_list','slide');
                }
            }else{
                var p = project.getCustomer($routeParams.item);
                if(p){
                    $scope.project = p.customer_name;
                    $scope.projectId = p.customer_id;
                    if($routeParams.taskId){
                        var t = project.getExpense($routeParams.taskId);
                        if(t){
                            $scope.no_task = true;
                            $scope.customer = t.name;
                            $scope.taskId = t.expense_id;
                        }
                    }
                }else{
                    $location.path('/expenses_list');
                    // $navigate.go('/expenses_list','slide');
                }
            }
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.save = function(){
            if(!$routeParams.item){
                $scope.alerts = [{ type: 'error', msg: "Please select a "+alertText[0] }];
                $timeout(function(){
                    $scope.closeAlert(0);
                },3000);
                return false;
            }
            if(!$routeParams.taskId){
                $scope.alerts = [{ type: 'error', msg: "Please select a "+alertText[1] }];
                $timeout(function(){
                    $scope.closeAlert(0);
                },3000);
                return false;
            }
            if(isNaN($scope.amount) || $scope.amount == 0){
                $scope.alerts = [{ type: 'error', msg: "Please select a "+alertText[2] }];
                $timeout(function(){
                    $scope.closeAlert(0);
                },3000);
                return false;
            }
            var notes = project.getNote();
            project.save(type,$routeParams.item,$routeParams.taskId,notes);
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
            if(!$routeParams.expId){
                $timeout(function() {
                    $scope.opened = true;
                });
            }
        };

        $scope.selectExpense = function(id){
            if(!$routeParams.expId){
                if(prj){
                    $location.path('/lists_e/'+id);
                    // $navigate.go('/lists_e/'+id,'slide');
                }else{
                    $location.path('/lists_ea/'+id);
                    // $navigate.go('/lists_ea/'+id,'slide');
                }
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
            if($routeParams.expId){
                url += '/'+$routeParams.expId;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
        }

        $scope.addAmount = function(pId,tId){
            var url = '/addAmount_expense/'+pId;
            if(!prj){
                url = '/addAmount_expensea/'+pId;
            }
            if(tId){
                url += '/'+tId;
            }
            if($routeParams.expId){
                url += '/'+$routeParams.expId;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
        }

        $scope.selectTask = function(){
            $scope.add();
        }

        /*modal*/

        $scope.add = function () {
            var modalInstance = $modal.open({
              templateUrl: 'layout/task_type.html',
              controller: 'task_type1',
              resolve: {
                items: function () {
                    return $scope.task_type;
                },
                types: function(){
                    return $scope.types;
                }
              }
            });
        };
        /*modalend*/

    }
]);
//acount
ctrl.controller('account',['$scope', '$location', 'project',
    function ($scope, $location, project){
        $scope.username = localStorage.username;

        //deleting the database
        var removeStuff = function (){
            localStorage.setItem('timesheet', '');
            localStorage.setItem('taskTime', '');
            localStorage.setItem('taskTimeId', '');
            project.time = {};
            project.taskTimeId = {};
            project.taskTime = {};
        }

        $scope.logout = function (){
            localStorage.setItem('username','');
            localStorage.setItem('token','');
            removeStuff(); // this is for testiung only and shall be removed when going live
            $location.path('/start');
            // $navigate.go('/start','slide');
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
        var time = '',
            alertText = ['project','task'];
        $scope.date = 'today';
        $scope.customer = 'Customer Name';
        $scope.task = 'Select Task';
        $scope.notes =  project.getNote() ? project.getNote() : 'Add note';
        $scope.no_task = false;

        if($routeParams.item){
            var p = project.getCustomer($routeParams.item);
            if(p){
                $scope.customer = p.customer_name;
                $scope.customerId = p.customer_id;
                if($routeParams.taskId){
                    var t = project.getAdhocTask($routeParams.taskId);
                    if(t){
                        $scope.no_task = true;
                        $scope.task = t.name;
                        $scope.taskId = t.id;
                    }
                    if($routeParams.taskTimeId){
                        $scope.projectId = $routeParams.projectId;
                        t = project.getTask($scope.projectId,$routeParams.taskId);
                        if(t){
                            $scope.no_task = true;
                            $scope.task = t.task_name;
                            $scope.taskId = t.task_id;
                        }
                        time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
                        var h = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].hours;
                        var d = new Date();
                        d.setHours( Math.floor(h) );
                        //  calculating the minutes
                        var minutes = h;
                        if(isNaN(minutes)){
                            minutes = 0;
                        }
                        minutes = Math.round(minutes * 60);
                        if(minutes >= 60){
                            var n = Math.floor(minutes/60);
                            minutes = minutes - (60*n);
                        }
                        d.setMinutes( minutes );
                        //  calculating the minutes
                        $scope.mytime = d;
                    }
                }
            }else{
                $location.path('/timesheet');
                // $navigate.go('/timesheet','slide');
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
            if(!$routeParams.taskTimeId){
                $timeout(function() {
                    $scope.opened = true;
                });
            }
        };

        $scope.selectTask = function(id){
            if(!$routeParams.taskTimeId){
                $location.path('/lists_a/'+id);
                // $navigate.go('/lists_a/'+id,'slide');
            }
        }

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        /*timepicker*/
        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = false;

        $scope.update = function() {
            var d = new Date();
            d.setHours( 0 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };
        // $scope.update();
        if(!$routeParams.taskTimeId){
            $scope.update();
            $scope.mode = false;
        }else{
            $scope.projectId = $routeParams.projectId;
            time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
            $scope.time2 = time;
            var item  = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId];
            if(item.active){
                $scope.mode = true;
            }else{
                $scope.mode = false;
            }
        }

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
            if($routeParams.taskTimeId){
                project.start(item,$scope.time2);
            }else{
                project.save('add_a',$routeParams.item,$routeParams.taskId,notes);
            }
        }

        $scope.stop = function(){
            project.stop(item,$scope.time2);
        }

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.mytime);
        };

        /*timepicker end*/

        $scope.addNote = function(pId,tId){
            var url = '/addNotea/'+pId;
            if(tId){
                url += '/'+tId;
            }
            if($routeParams.taskTimeId){
                url += '/'+ $routeParams.projectId +'/'+ $routeParams.taskTimeId +'/'+ $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
            }
            $location.path(url);
            // $navigate.go(url,'slide');
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
        $scope.expense = [];
        if($routeParams.y && $routeParams.m && $routeParams.d){
            var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y;
        }else{
            var d = new Date();
            var time= d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
        }

        if(!project.expense[time]){
            project.expense[time] = {};
        }
        $scope.no_project = true;
        $scope.expense = project.expense[time];

        if(JSON.stringify(project.expense[time]) == '{}'){
            $scope.no_project = false;
        }
        project.getExpenses(time).then(function(){
            $scope.no_project = true;
            if(JSON.stringify(project.expense[time]) == '{}'){
                $scope.no_project = false;
            }
        });

        $scope.editTask = function(pId, tId, notes, amount, adhoc, cId, expId){
            project.setNote(notes);
            project.setAmount(amount);
            if(adhoc == "ad hoc"){
                $location.path('/expenses_a/'+cId+'/'+tId+'/'+expId);
                // $navigate.go('/expenses_a/'+cId+'/'+tId+'/'+expId,'slide');
            }else{
                $location.path('/expenses/'+pId+'/'+tId+'/'+expId);
                // $navigate.go('/expenses/'+pId+'/'+tId+'/'+expId);
            }
        }

        $scope.addNewTask = function(){
            project.addNewTask();
        }
    }
]);