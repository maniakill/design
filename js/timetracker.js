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
        .when('/add/:item/:taskId',
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
        .when('/addNote/:pId/:tId',
            {
                controller: 'addNote',
                templateUrl: 'layout/addNote.html'
            })
        .when('/addNote/:pId',
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

app.factory('project', ['$http','$templateCache', '$location', '$rootScope',
    function ($http, $templateCache, $location, $rootScope) {
        var project = {},
            url = 'https://go.salesassist.eu/pim/mobile/',
            key = 'api_key='+localStorage.token+'&username='+localStorage.username,
            // adhoc_task_list = localStorage.adhocTasks ? JSON.parse(localStorage.adhocTasks) : [],
            // expenses_list = localStorage.expenses_list ? JSON.parse(localStorage.expenses_list) : [],
            obj = {};            
        
        /* store data */
        project.time = localStorage.getItem('timesheet') ? JSON.parse(localStorage.getItem('timesheet')) : {};
        project.customers = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')) : {};
        project.adhocTask = localStorage.getItem('adhocTasksList') ? JSON.parse(localStorage.getItem('adhocTasksList')) : {};
        project.expense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : {};
        project.expenseList = localStorage.getItem('expensesList') ? JSON.parse(localStorage.getItem('expensesList')) : {};
        project.taskTimeId = localStorage.getItem('taskTimeId') ? JSON.parse(localStorage.getItem('taskTimeId')) : {};

        project.taskTime = {};

        var saveTime = function(type, item){
            if(!type){
                type = 'timesheet';
                item = project.time;
            }            
            localStorage.setItem(type, JSON.stringify(item));
        }

        // localStorage.setItem('timesheet', '');
        // localStorage.setItem('customers', '');
        // localStorage.setItem('expenses', '');
        
        function Task(item, show, saveT){
            this.task_name = item.task_name ? item.task_name : item.name;
            this.task_id = item.task_id ? item.task_id : item.id;
            this.time_time_id = item.task_time_id;
            this.notes = item.notes;
            this.hours = item.hours;
            this.date = show;
            if(saveT){
                // aici trebuie sa salvez timesheet
                // ma gandesc ca trebuie as fie ceva de genu 
                // data => task_time_id, task_id, project_id, hours, notes
            }
        }

        function Proj(item, show, saveT){
            this.project_name = item.project_name;
            this.project_id = item.project_id;
            this.customer_name = item.customer_name;
            this.customer_id = item.customer_id;
            this.date = show;
            this.task = {};
            for(x in item.task){
                var id = item.task[x].task_id;
                this.task[id] = new Task(item.task[x], show, saveT);
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

        var save = function(item, show, saveT){
            var id = item.project_id
            if(!project.time[id]){
                project.time[id] = new Proj(item, show, saveT);
                saveTime();
            }
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
                console.log(response.data.response.project);
                if(typeof(response.data.response.project) == 'object' ){
                    var pr = response.data.response.project;
                    for(x in pr){
                        save(pr[x], false, true);
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
                        saveTime('expenses', project.expense);
                    }
                }
                return response.data;
            });
            return this.data;
        }
        /* end requests */
        /* geters and seters */
        project.getProject = function(id){
            if (project.time[id]) {
                return project.time[id];
            }
            return null;
        }

        project.getTask = function(id, item){
            if (project.time[id].task[item]) {
                return project.time[id].task[item];
            }
            return null;
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
            if (project.customers[id]) {
                return project.customers[id];
            }
            return null;
        }

        project.getAdhocTask = function(id){
            if (project.adhocTask[id]) {
                return project.adhocTask[id];
            }
            return null;
        }

        project.getExpense = function(id){
            if (project.expenseList[id]) {
                return project.expenseList[id];
            }
            return null;
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
                    var h = project.getHours();
                    $http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
                        if(response.data.code == 'ok'){
                            project.taskTime[response.data.response.id] = {};
                            project.taskTime[response.data.response.id].started = true;
                            project.taskTime[response.data.response.id].hours = h;
                            project.taskTime[response.data.response.id].start = Date.now();
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
            }
        }
        /* end send data to server */

        // var t = window.setInterval( rune, 1000 );

        function rune(){
            console.log($rootScope);
            var d = Date.now()
            for( x in project.taskTime ){
                if(project.taskTime[x].started === true){
                    var newTime = Math.floor(d-project.taskTime[x].start);

                }
            }
        }

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


