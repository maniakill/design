/// <reference path="../Scripts/angular-1.1.4.js" />
var connect = 'none';
        // this should be moved when timetracker.js loads
        function onLoad() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        onLoad();
        // device APIs are available
        //

        function onDeviceReady() {
            connect = checkConnection();            
        }

        function checkConnection() {
            var networkState = navigator.connection.type;
            // var states = {};
            // states[Connection.UNKNOWN]  = 'Unknown connection';
            // states[Connection.ETHERNET] = 'Ethernet connection';
            // states[Connection.WIFI]     = 'WiFi connection';
            // states[Connection.CELL_2G]  = 'Cell 2G connection';
            // states[Connection.CELL_3G]  = 'Cell 3G connection';
            // states[Connection.CELL_4G]  = 'Cell 4G connection';
            // states[Connection.CELL]     = 'Cell generic connection';
            // states[Connection.NONE]     = 'No network connection';
            // alert('Connection type: ' + states[networkState]);
            return networkState;
        }

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
        .when('/expenses_list',{
                controller: 'expenses_list',
                templateUrl: 'layout/expenses_list.html'
            })
        .when('/expenses_list/:d/:m/:y',
            {
                controller: 'expenses_list',
                templateUrl: 'layout/expenses_list.html'
            })
        .when('/lists',
            {
                controller: 'lists',
                templateUrl: 'layout/lists.html'
            })
        .when('/lists/expense/',
            {
                controller: 'lists',
                templateUrl: 'layout/lists.html'
            })
        .when('/lists/:projectId',
            {
                controller: 'lists',
                templateUrl: 'layout/lists.html'
            })
        .when('/lists_a',
            {
                controller: 'lists_a',
                templateUrl: 'layout/lists_a.html'
            })
        .when('/lists_a/expense/',
            {
                controller: 'lists_a',
                templateUrl: 'layout/lists_a.html'
            })
        .when('/lists_a/:customerId',
            {
                controller: 'lists_a',
                templateUrl: 'layout/lists_a.html'
            })
        .when('/lists_e/:projectId',
            {
                controller: 'lists_e',
                templateUrl: 'layout/lists_e.html'
            })
        .when('/lists_ea/:projectId',
            {
                controller: 'lists_e',
                templateUrl: 'layout/lists_e.html'
            })
        .when('/add/:item',
            {
                controller: 'add',
                templateUrl: 'layout/add.html'
            })
        .when('/add/:item/:taskId',
            {
                controller: 'add',
                templateUrl: 'layout/add.html'
            })
        .when('/add/:item/:taskId/:taskTimeId/:d/:m/:y',
            {
                controller: 'add',
                templateUrl: 'layout/add.html'
            })
        .when('/add_a/:item',
            {
                controller: 'add_a',
                templateUrl: 'layout/add_a.html'
            })
        .when('/add_a/:item/:taskId',
            {
                controller: 'add_a',
                templateUrl: 'layout/add_a.html'
            })
        .when('/add_a/:item/:taskId/:projectId/:taskTimeId/:d/:m/:y',
            {
                controller: 'add_a',
                templateUrl: 'layout/add_a.html'
            })
        .when('/addNote/:pId/:tId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote/:pId/:tId/:taskTimeId/:d/:m/:y',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote/:pId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNotea/:pId/:tId/:projectId/:taskTimeId/:d/:m/:y',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNotea/:pId/:tId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNotea/:pId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addAmount_expense/:pId/:tId/:expId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addAmount_expense/:pId/:tId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addAmount_expense/:pId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addAmount_expensea/:pId/:tId/:expId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addAmount_expensea/:pId/:tId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addAmount_expensea/:pId',
            {
                controller: 'addAmount',
                templateUrl: 'layout/addAmount.html'
            })
        .when('/addNote_expense/:pId/:tId/:expId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote_expense/:pId/:tId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote_expense/:pId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote_expensea/:pId/:tId/:expId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote_expensea/:pId/:tId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote_expensea/:pId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/expenses/:item',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/expenses/:item/:taskId',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/expenses/:item/:taskId/:expId',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/expenses_a/:item',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/expenses_a/:item/:taskId',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/expenses_a/:item/:taskId/:expId',
            {
                controller: 'expenses',
                templateUrl: 'layout/expenses.html'
            })
        .when('/account',
            {
                controller: 'account',
                templateUrl: 'layout/account.html'
            })
        .when('/footer',
            {
                controller: 'footer',
                templateUrl: 'layout/footer.html'
            })
        .when('/header',
            {
                controller: 'header',
                templateUrl: 'layout/header.html'
            })
        .when('/pending',
            {
                controller: 'pending',
                templateUrl: 'layout/pending.html'
            })
        .otherwise({ redirectTo: '/' });
});

app.factory('project', ['$http','$templateCache', '$location', '$rootScope', '$interval',
    function ($http, $templateCache, $location, $rootScope, $interval) {
        var project = {},
            url = 'https://go.salesassist.eu/pim/mobile/',
            key = 'api_key='+localStorage.token+'&username='+localStorage.username,
            obj = {};

        /* store data */
        project.time = localStorage.getItem('timesheet') ? JSON.parse(localStorage.getItem('timesheet')) : {};
        project.customers = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')) : {};
        project.adhocTask = localStorage.getItem('adhocTasksList') ? JSON.parse(localStorage.getItem('adhocTasksList')) : {};
        project.expense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : {};
        project.expenseList = localStorage.getItem('expensesList') ? JSON.parse(localStorage.getItem('expensesList')) : {};
        project.taskTimeId = localStorage.getItem('taskTimeId') ? JSON.parse(localStorage.getItem('taskTimeId')) : {};
        project.taskTime = localStorage.getItem('taskTime') ? JSON.parse(localStorage.getItem('taskTime')) : {};

        var saveTime = function(type, item){
            if(!type){
                type = 'timesheet';
                item = project.time;
            }
            localStorage.setItem(type, JSON.stringify(item));
        }

        // localStorage.setItem('timesheet', '');
        // localStorage.setItem('taskTime', '');
        // localStorage.setItem('taskTimeId', '');
        // localStorage.setItem('customers', '');
        // localStorage.setItem('expenses', '');

        function TaskTimeId(item, pr, h, notes, id){
            this.task_time_id = id;
            this.task_id = item.task_id ? item.task_id : item.id;
            this.project_id = pr.project_id;
            this.customer_id = pr.customer_id;
            this.hours = h;
            this.notes = notes;
            this.active = '';
        }

        function Task(item, show, saveT, pr, time){
            this.task_name = item.task_name ? item.task_name : item.name;
            this.task_id = item.task_id ? item.task_id : item.id;
            // this.task_time_id = item.task_time_id;
            // this.notes = item.notes; // this will be out
            // this.hours = item.hours; // this will be out
            // this.date = show; // this will be irelevant
            if(saveT){
                var id = item.task_time_id;
                var t = time;
                if(!t){
                    var d = new Date();
                    t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                }
                if(!project.taskTimeId[t]){
                    project.taskTimeId[t] = {};
                }
                if(!project.taskTimeId[t][pr.project_id]){
                    project.taskTimeId[t][pr.project_id] = {};
                    project.taskTimeId[t][pr.project_id].id = pr.project_id;
                    project.taskTimeId[t][pr.project_id].tasks = {};
                }
                project.taskTimeId[t][pr.project_id].tasks[id] = new TaskTimeId(item, pr, item.hours, item.notes, item.task_time_id);
                saveTime('taskTimeId', project.taskTimeId);
            }
        }

        function Proj(item, show, saveT, time){
            this.project_name = item.project_name;
            this.project_id = item.project_id;
            this.customer_name = item.customer_name;
            this.customer_id = item.customer_id;
            this.date = show;
            this.task = {};
            for(x in item.task){
                var id = item.task[x].task_id;
                this.task[id] = new Task(item.task[x], show, saveT, item, time);
            }
        }

        function Cust(item, show){
            this.customer_name = item.name;
            this.customer_id = item.id;
        }

        function AdHoc(item, show){
            this.name = item.name;
            this.id = item.id;
        }

        function Expense(item){
            this.id = item.id;
            this.amount = item.amount;
            this.customer_id = item.customer_id;
            this.customer_name = item.customer_name;
            this.expense_id = item.expense_id;
            this.expense_name = item.expense_name;
            this.note = item.note;
            this.project_id = item.project_id;
            this.project_name = item.project_name;
            this.unit = item.unit;
            this.unit_price = item.unit_price;
        }

        function Expenses(item){
            this.expense_id = item.expense_id;
            this.unit = item.unit;
            this.unit_price = item.unit_price;
            this.name = item.name;
        }

        var save = function(item, show, saveT, time){
            var id = item.project_id
            if(!project.time[id]){
                project.time[id] = new Proj(item, show, saveT, time);
            }else{
                if(!project.time[id].task){
                    project.time[id].task = {};
                }
                for(x in item.task){
                    var t_id = item.task[x].task_id;
                    if(!project.time[id].task[t_id]){
                        project.time[id].task[t_id] = new Task(item.task[x], show, saveT, item, time);
                    }
                    if(saveT){
                        var idt = item.task[x].task_time_id;
                        var t = time;
                        if(!t){
                            var d = new Date();
                            t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                        }
                        if(!project.taskTimeId[t]){
                            project.taskTimeId[t] = {};
                        }
                        if(!project.taskTimeId[t][id]){
                            project.taskTimeId[t][id] = {};
                            project.taskTimeId[t][id].id = id;
                            project.taskTimeId[t][id].tasks = {};
                        }
                        if(!project.taskTimeId[t][id].tasks[idt]){
                            project.taskTimeId[t][id].tasks[idt] = new TaskTimeId(item.task[x], item, item.task[x].hours, item.task[x].notes, item.task[x].task_time_id);    
                        }                        
                        saveTime('taskTimeId', project.taskTimeId);
                    }
                }
            }
            saveTime();
        }

        var saveTask = function(pr, item, show){
            if(project.time[pr]){
                var id = item.id;
                if(!project.time[pr].task[id]){
                    project.time[pr].task[id] = new Task(item,show);
                    saveTime();
                }
            }
        }

        var saveCustomer = function(item, show){
            var id = item.id
            if(!project.customers[id]){
                project.customers[id] = new Cust(item, show);
                saveTime('customers',project.customers);
            }
        }

        var saveAdhocTask = function(item, show){
            var id = item.id;
            if(!project.adhocTask[id]){
                project.adhocTask[id] = new AdHoc(item, show);
                saveTime('adhocTasksList', project.adhocTask);
            }
        }

        var saveExpenses = function(item, time){
            var id = item.id;
            var t = time;
            if(!t){
                var d = new Date();
                t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
            }
            if(!project.expense[t]){
                project.expense[t] = {};
                project.expense[t][id] = new Expense(item);
            }else{
                // if(!project.expense[t][id]){
                    project.expense[t][id] = new Expense(item);
                // }
            }
            saveTime('expenses', project.expense);
        }

        var saveExpens = function(item){
            var id = item.expense_id;
            if(!project.expenseList[id]){
                project.expenseList[id] = new Expenses(item);
            }
        }
        /* end store data */
        /* requests */
        project.getTime = function(time) {
            this.data = $http.get(url+'index.php?do=mobile-time&'+key+'&start='+time).then(function(response){
                if(typeof(response.data.response.project) == 'object' ){
                    var pr = response.data.response.project;
                    for(x in pr){
                        save(pr[x], false, true, time);
                        /*if(project.taskTimeId[time]){
                            for(z in project.taskTimeId[time]){            
                                if(z == pr[x].project_id){
                                    for(y in project.taskTimeId[time][z].tasks){
                                        if(project.taskTimeId[time][z].tasks[y].task_id == tId){
                                            delete project.taskTimeId[time][z].tasks[y];
                                        }
                                    }
                                }
                            }    
                        }   */                     
                    }
                }
                return response.data;
            });
            return this.data;
        }

        project.getProjectList = function(){
            this.data = $http.get(url+'index.php?do=mobile-project_list&'+key).then(function(response){
                if(typeof(response.data.response[0].projects) == 'object'){
                    var pr = response.data.response[0].projects;
                    for(x in pr){
                        save(pr[x], true);
                    }
                }
                return response.data;
            });
            return this.data;
        }

        project.getProjectTaskList = function(item){
            this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&project_id='+item).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response.tasks) == 'object'){
                        var ta = response.data.response.tasks;
                        for(x in ta){
                            saveTask(item,ta[x],true);
                        }
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getCustomerList = function(){
            this.data = $http.get(url+'index.php?do=mobile-customer_list&'+key).then(function(response){
                if(typeof(response.data.response[0].customers) == 'object'){
                    var cu = response.data.response[0].customers;
                    for(x in cu){
                        saveCustomer(cu[x],true);
                    }
                }
                return response.data;
            });
            return this.data;
        }

        project.getCustomerTaskList = function(item){
            this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&customer_id='+item).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response.tasks) == 'object'){
                        var ad = response.data.response.tasks;
                        for(x in ad){
                            saveAdhocTask(ad[x],true);
                        }
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getExpensesList = function(item){
            this.data =  $http.get(url+'index.php?do=mobile-expenses_list&'+key).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response[0].expense) == 'object'){
                        var ex = response.data.response[0].expense;
                        for(x in ex){
                            saveExpens(ex[x]);
                        }
                        saveTime('expensesList', project.expenseList);
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getExpenses = function(time){
            this.data = $http.get(url+'index.php?do=mobile-expenses&'+key+'&start='+time).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response.expense) == 'object'){
                        var ex = response.data.response.expense;
                        for(x in ex){
                            saveExpenses(ex[x], time);
                        }                        
                    }
                }
                return response.data;
            });
            return this.data;
        }
        /* end requests */
        /* geters and seters */
        project.getProject = function(id){
            if (project.time[id] && id) {
                return project.time[id];
            }
            return '';
        }

        project.getTask = function(id, item){
            if (id && item) {
                if(project.time[id]){
                    if(project.time[id].task[item]){
                        return project.time[id].task[item];
                    }
                }
            }
            return '';
        }

        // set the note when adding a timesheet
        project.setNote = function(note){
            obj.note = note;
        }
        // get the note when adding a timesheet
        project.getNote = function(){
            if(obj.note){
                return obj.note;
            }
            return '';
        }

        // set the note when adding a timesheet
        project.setAmount = function(amount){
            obj.amount = amount;
        }
        // get the note when adding a timesheet
        project.getAmount = function(){
            if(obj.amount){
                return obj.amount;
            }
            return '';
        }

        project.setHours = function(hour){
            obj.hours = hour;
        }

        project.getHours = function(){
            if(obj.hours){
                return obj.hours;
            }
            return 0;
        }

        project.getCustomer = function(id){
            if (project.customers[id] && id) {
                return project.customers[id];
            }
            return '';
        }

        project.getAdhocTask = function(id){
            if (project.adhocTask[id] && id) {
                return project.adhocTask[id];
            }
            return '';
        }

        project.getExpense = function(id){
            if (project.expenseList[id] && id) {
                return project.expenseList[id];
            }
            return '';
        }

        project.setDate = function(time){
            project.selectedDate = time;
        }
        /* end geters and seters */
        /* send data to server */
        project.save = function(type, pId, tId,notes){
             // this.data =
            var start = '';
            if(project.selectedDate){
                start = '&start='+project.selectedDate;
            }

            switch (type){
                case "add_a":
                    var h = project.getHours();
                    $http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&customer_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
                        // mai trebuie si sa contorizez timpul
                        if(response.data.code == 'ok'){
                            var id = response.data.response.id,
                                pId = response.data.response.project_id,
                                p = project.getProject(pId),
                                ta = project.getTask(pId,tId),
                                t = start;
                            if(!t){
                                var d = new Date();
                                t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                            }
                            if(!project.taskTimeId[t]){
                                project.taskTimeId[t] = {};
                            }
                            if(!project.taskTimeId[t][pId]){
                                project.taskTimeId[t][pId] = {};
                                project.taskTimeId[t][pId].id = pId;
                                project.taskTimeId[t][pId].tasks = {};
                            }
                            project.taskTimeId[t][pId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
                            saveTime('taskTimeId', project.taskTimeId);
                            project.taskTime[id] = {};
                            project.taskTime[id].start = Date.now();
                            project.taskTime[id].pId = pId;
                            project.taskTime[id].time = t;
                            saveTime('taskTime', project.taskTime);

                            if(project.selectedDate){
                                $location.path('/timesheet/'+project.selectedDate);
                            }else{
                                $location.path('/timesheet');
                            }
                        }else{
                            $rootScope.$broadcast('addError',response.data.error_code);

                        }
                    });
                    break;
                case "expenses":
                    var amount = project.getAmount();
                    $http.get(url+'index.php?do=mobile--mobile-add_expense&'+key+'&project_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+start).then(function(response){
                        if(response.data.code == 'ok'){
                            if(project.selectedDate){
                                $location.path('/expenses_list/'+project.selectedDate);
                            }else{
                                $location.path('/expenses_list');
                            }
                        }else{
                            $rootScope.$broadcast('addError',response.data.error_code);

                        }
                    });
                    break;
                case "expenses_a":
                    var amount = project.getAmount();
                    $http.get(url+'index.php?do=mobile--mobile-add_expense&'+key+'&customer_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+start).then(function(response){
                        if(response.data.code == 'ok'){
                            if(project.selectedDate){
                                $location.path('/expenses_list/'+project.selectedDate);
                            }else{
                                $location.path('/expenses_list');
                            }
                        }else{
                            $rootScope.$broadcast('addError',response.data.error_code);

                        }
                    });
                    break;
                default:
                    var h = project.getHours(),
                        id = Date.now(),
                        p = project.getProject(pId),
                        ta = project.getTask(pId,tId),
                        t = start;
                    if(!t){
                        var d = new Date();
                        t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                    }
                    if(!project.taskTimeId[t]){
                        project.taskTimeId[t] = {};
                    }
                    if(!project.taskTimeId[t][pId]){
                        project.taskTimeId[t][pId] = {};
                        project.taskTimeId[t][pId].id = pId;
                        project.taskTimeId[t][pId].tasks = {};
                    }
                    for(x in project.taskTimeId[t][pId].tasks){
                        if(project.taskTimeId[t][pId].tasks[x].task_id == ta.task_id){
                            //dont add it;
                        }
                    }
                    project.taskTimeId[t][pId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
                    saveTime('taskTimeId', project.taskTimeId);
                    project.taskTime[id] = {};
                    project.taskTime[id].start = Date.now();
                    project.taskTime[id].pId = pId;
                    project.taskTime[id].time = t;
                    saveTime('taskTime', project.taskTime);
                    alert(connect);
                    console.log(connect);
                    if(connect == wifi ){
                        alert('ma-ta');
                    }
                    if(connect == 'wifi' ){
                        alert('ma-ta cu');
                    }
                    if(connect == 'none' ){
                        alert('ma-ta none');
                    }
                    if(connect == none ){
                        alert('ma-ta none fara');
                    }
                    if(connect != 'none' || connect !='unknown'){
                        alert('e1');
                        $http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
                            if(response.data.code == 'ok'){
                                var idn = response.data.response.id;
                                for(x in project.taskTimeId[t]){            
                                    if(x == pId){
                                        for(y in project.taskTimeId[t][x].tasks){
                                            if(project.taskTimeId[t][x].tasks[y].task_id == tId){
                                                delete project.taskTimeId[t][x].tasks[y];
                                            }
                                        }
                                    }
                                }
                                
                                project.taskTimeId[t][pId].tasks[idn] = new TaskTimeId(ta, p, h, notes, idn);
                                saveTime('taskTimeId', project.taskTimeId);
                                delete project.taskTime[id];
                                project.taskTime[idn] = {};
                                project.taskTime[idn].start = Date.now();
                                project.taskTime[idn].pId = pId;
                                project.taskTime[idn].time = t;
                                saveTime('taskTime', project.taskTime);
                                if(project.selectedDate){
                                    $location.path('/timesheet/'+project.selectedDate);
                                }else{
                                    $location.path('/timesheet');
                                }
                            }else{
                                $rootScope.$broadcast('addError',response.data.error_code);

                            }
                        });
                    }else{
                        alert('f');
                        if(project.selectedDate){
                            $location.path('/timesheet/'+project.selectedDate);
                        }else{
                            $location.path('/timesheet');
                        }
                    }
                    break;
            }
        }
        /* end send data to server */

        project.stop = function(item, time){
            item.active = '';
            saveTime('taskTimeId', project.taskTimeId);
            project.taskTime[item.task_time_id] = {};
            saveTime('taskTime', project.taskTime);
            $location.path('/timesheet/'+time);
        }

        project.start = function(item, time){
            item.active = 'active';
            saveTime('taskTimeId', project.taskTimeId);
            var d = Date.now();
            var newd = d-item.hours*3600*1000;
            project.taskTime[item.task_time_id] = {};
            project.taskTime[item.task_time_id].start = newd;
            project.taskTime[item.task_time_id].pId = item.project_id;
            project.taskTime[item.task_time_id].time = time;
            saveTime('taskTime', project.taskTime);
            $location.path('/timesheet/'+time);
        }

        // var t = window.setInterval( rune, 1000 ); I don't know why this doesn't work and the line below works
        $interval(rune,1000);

        function rune(){
            var d = Date.now();
            for( x in project.taskTime ){
                if(JSON.stringify(project.taskTime[x]) != '{}' ){
                    var newTime = Math.floor((d-project.taskTime[x].start)/1000);
                        newTime = newTime/3600;
                    if(project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x]){
                        project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].hours = newTime;
                        project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].active = 'active';
                    }
                }
            }
            saveTime('taskTime', project.taskTime);
            saveTime('taskTimeId', project.taskTimeId);
        }
        // rune();

        project.addNewTask = function() {
            $rootScope.$broadcast('clickAdd');
        };

        project.isLoged = function(){
            if(!localStorage.token || !localStorage.username){
                return false;
            }
            return true;
        }

        return project;
    }
]);