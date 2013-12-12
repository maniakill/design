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

app.factory('project', ['$http','$templateCache',
    function ($http, $templateCache) {
        var project = {},
            url = 'https://go.salesassist.eu/pim/mobile/',
            key = 'api_key='+localStorage.token+'&username='+localStorage.username,
            project_list = localStorage.projects ? JSON.parse(localStorage.projects) : [],
            customers_list = localStorage.customers ? JSON.parse(localStorage.customers) : [],
            task_list = localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
            adhoc_task_list = localStorage.adhocTasks ? JSON.parse(localStorage.adhocTasks) : [],
            expenses_list = localStorage.expenses_list ? JSON.parse(localStorage.expenses_list) : [],
            obj = {};
        
        project.getTime = function(time) {
            this.data = $http.get(url+'index.php?do=mobile-time&'+key+'&start='+time).then(function(response){
                return response.data;
            });
            return this.data;
        }

        project.getProjectList = function(){
            this.data = $http.get(url+'index.php?do=mobile-project_list&'+key).then(function(response){
                if(typeof(response.data.response[0].projects) == 'object'){
                    localStorage.projects = JSON.stringify(response.data.response[0].projects);
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
                    break;
                }
            }
            return null;
        }

        project.getProjectTaskList = function(item){
            task_list = [];
            this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&project_id='+item).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response.tasks) == 'object'){
                        localStorage.tasks = JSON.stringify(response.data.response.tasks);
                        task_list = response.data.response.tasks;
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getTask = function(id){
            for (x in task_list) {
                if (task_list[x].id === id) {
                    return task_list[x];
                    break;
                }
            }
            return null;
        }
        // set the note when adding a timesheet 
        project.setNote = function(note){
            obj.note = note;
        }
        // get the note when adding a timesheet
        project.getNote = function(){
            return obj.note;
        }

        // set the note when adding a timesheet 
        project.setAmount = function(amount){
            obj.amount = amount;
        }
        // get the note when adding a timesheet
        project.getAmount = function(){
            return obj.amount;
        }

        project.getCustomerList = function(){
            this.data = $http.get(url+'index.php?do=mobile-customer_list&'+key).then(function(response){
                if(typeof(response.data.response[0].customers) == 'object'){
                    localStorage.customers = JSON.stringify(response.data.response[0].customers);
                    customers_list = response.data.response[0].customers;               
                }
                return response.data;
            });
            return this.data;
        }

        project.getCustomer = function(id){
            for (x in customers_list) {
                if (customers_list[x].id === id) {
                    return customers_list[x];
                    break;
                }
            }
            return null;
        }

        project.getCustomerTaskList = function(item){
            adhoc_task_list = [];
            this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&customer_id='+item).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response.tasks) == 'object'){
                        localStorage.adhocTasks = JSON.stringify(response.data.response.tasks);
                        adhoc_task_list = response.data.response.tasks;
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getAdhocTask = function(id){
            for (x in adhoc_task_list) {
                if (adhoc_task_list[x].id === id) {
                    return adhoc_task_list[x];
                    break;
                }
            }
            return null;
        }
        
        project.getExpensesList = function(item){
            expenses_list = [];
            this.data =  $http.get(url+'index.php?do=mobile-expenses_list&'+key).then(function(response){
                if(response.data.code == 'ok'){
                    if(typeof(response.data.response[0].expense) == 'object'){
                        localStorage.expenses_list = JSON.stringify(response.data.response[0].expense);
                        expenses_list = response.data.response[0].expense;
                    }
                }
                return response.data.response;
            });
            return this.data;
        }

        project.getExpense = function(id){
            for (x in expenses_list) {
                if (expenses_list[x].expense_id === id) {
                    return expenses_list[x];
                    break;
                }
            }
            return null;
        }

        return project;
    }
]);


