/// <reference path="../Scripts/angular-1.1.4.js" />
alert('24');

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);
/*

function onDeviceReady() {
    alert('onDeviceReady');
    deviceReady = true;
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}
*/
function checkConnection() {
    console.log(devReady);
    if(devReady === true){
        var networkState = navigator.connection.type;
    }else{
        var networkState = 'browser';
    }
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

function capturePhoto() {
    // console.log(destinationType);
    alert('e '+Camera.DestinationType.DATA_URL);
    alert(navigator.camera.toSource());
  // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: 0, sourceType: 1 });
}

function onPhotoDataSuccess(imageData) {
    alert('onPhotoDataSuccess');
  // Uncomment to view the base64-encoded image data
  console.log(imageData);
    alert('capturePhoto2');
  // Get image handle
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  smallImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: source });
}
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// phoneGap
var app = angular.module('timeT', ['ngRoute','ctrl','ui.bootstrap']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',{controller: 'start',templateUrl: 'layout/start.html'})
        .when('/login',{controller: 'login',templateUrl: 'layout/login.html'})
        .when('/timesheet',{controller: 'timesheet',templateUrl: 'layout/timesheet.html'})
        .when('/timesheet/:d/:m/:y',{controller: 'timesheet',templateUrl: 'layout/timesheet.html'})
        .when('/expenses_list',{controller: 'expenses_list',templateUrl: 'layout/expenses_list.html'})
        .when('/expenses_list/:d/:m/:y',{controller: 'expenses_list',templateUrl: 'layout/expenses_list.html'})
        .when('/lists',{controller: 'lists',templateUrl: 'layout/lists.html'})
        .when('/lists/expense/',{controller: 'lists',templateUrl: 'layout/lists.html'})
        .when('/lists/:projectId',{controller: 'lists',templateUrl: 'layout/lists.html'})
        .when('/lists_a',{controller: 'lists_a',templateUrl: 'layout/lists_a.html'})
        .when('/lists_a/expense/',{controller: 'lists_a',templateUrl: 'layout/lists_a.html'})
        .when('/lists_a/:customerId',{controller: 'lists_a',templateUrl: 'layout/lists_a.html'})
        .when('/lists_e/:projectId',{controller: 'lists_e',templateUrl: 'layout/lists_e.html'})
        .when('/lists_ea/:projectId',{controller: 'lists_e',templateUrl: 'layout/lists_e.html'})
        .when('/add/:item',{controller: 'add',templateUrl: 'layout/add.html'})
        .when('/add/:item/:taskId',{controller: 'add',templateUrl: 'layout/add.html'})
        .when('/add/:item/:taskId/:taskTimeId/:d/:m/:y',{controller: 'add',templateUrl: 'layout/add.html'})
        .when('/add_a/:item',{controller: 'add_a',templateUrl: 'layout/add_a.html'})
        .when('/add_a/:item/:taskId',{controller: 'add_a',templateUrl: 'layout/add_a.html'})
        .when('/add_a/:item/:taskId/:projectId/:taskTimeId/:d/:m/:y',{    controller: 'add_a',    templateUrl: 'layout/add_a.html'})
        .when('/addNote/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote/:pId/:tId/:taskTimeId/:d/:m/:y',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNotea/:pId/:tId/:projectId/:taskTimeId/:d/:m/:y',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNotea/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNotea/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addAmount_expense/:pId/:tId/:expId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addAmount_expense/:pId/:tId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addAmount_expense/:pId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addAmount_expensea/:pId/:tId/:expId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addAmount_expensea/:pId/:tId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addAmount_expensea/:pId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
        .when('/addNote_expense/:pId/:tId/:expId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote_expense/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote_expense/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote_expensea/:pId/:tId/:expId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote_expensea/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/addNote_expensea/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
        .when('/expenses/:item',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/expenses/:item/:taskId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/expenses/:item/:taskId/:expId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/expenses_a/:item',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/expenses_a/:item/:taskId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/expenses_a/:item/:taskId/:expId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
        .when('/account',{controller: 'account',templateUrl: 'layout/account.html'})
        .when('/footer',{controller: 'footer',templateUrl: 'layout/footer.html'})
        .when('/header',{controller: 'header',templateUrl: 'layout/header.html'})
        .when('/pending',{controller: 'pending',templateUrl: 'layout/pending.html'})
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
        project.toSync = localStorage.getItem('toSync') ? JSON.parse(localStorage.getItem('toSync')) : {};

        var saveTime = function(type, item){
            if(!type){
                type = 'timesheet';
                item = project.time;
            }
            // localStorage.setItem(type, '');
            localStorage.setItem(type, JSON.stringify(item));
        }

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
            this.sync = item.sync;
        }

        function Expenses(item){
            this.expense_id = item.expense_id;
            this.unit = item.unit;
            this.unit_price = item.unit_price;
            this.name = item.name;
        }

        var save = function(item, show, saveT, time){
            var id = item.project_id;
            // save the customer
            var customerItem = {};
                customerItem.id = item.customer_id;
                customerItem.name = item.customer_name;
                saveCustomer(customerItem);
            // save the custoemr
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
                            project.taskTimeId[t][id].tasks[idt] = new TaskTimeId(item.task[x], item, item.task[x].hours, item.task[x].notes, idt);
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
            var start = '',
                // connect = checkConnection();
                connect = 'none';
            if(project.selectedDate){
                start = '&start='+project.selectedDate;
            }

            switch (type){
                case "add_a":
                    var h = project.getHours();
                        id = Date.now(),
                        npId = Date.now();
                        p = Date.now(),
                        ta = project.getAdhocTask(tId),
                        t = start,
                        add = true;

                    if(!t){
                        var d = new Date();
                        t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                    }
                    if(!project.taskTimeId[t]){
                        project.taskTimeId[t] = {};
                    }
                    if(!project.taskTimeId[t][npId]){
                        project.taskTimeId[t][npId] = {};
                        project.taskTimeId[t][npId].id = npId;
                        project.taskTimeId[t][npId].tasks = {};
                    }
                    for(x in project.taskTimeId[t][npId].tasks){
                        if(project.taskTimeId[t][npId].tasks[x].task_id == ta.task_id){
                            add = false;
                            $rootScope.$broadcast('addError','Task already added');
                        }
                    }
                    if(add === true){
                        project.taskTimeId[t][npId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
                        saveTime('taskTimeId', project.taskTimeId);
                        project.taskTime[id] = {};
                        project.taskTime[id].start = Date.now();
                        project.taskTime[id].npId = npId;
                        project.taskTime[id].time = t;
                        saveTime('taskTime', project.taskTime);
                    }
                    if(connect != 'none' && connect !='unknown'){
                        $http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&customer_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
                            if(response.data.code == 'ok'){
                                delete project.taskTimeId[t][npId];
                                delete project.taskTime[id];
                                var idn = response.data.response.id;
                                    npId = response.data.response.project_id;
                                if(!project.taskTimeId[t][npId]){
                                    project.taskTimeId[t][npId] = {};
                                    project.taskTimeId[t][npId].id = npId;
                                    project.taskTimeId[t][npId].tasks = {};
                                }
                                id = idn;
                                project.taskTimeId[t][npId].tasks[idn] = new TaskTimeId(ta, p, h, notes, idn);
                                saveTime('taskTimeId', project.taskTimeId);
                                project.taskTime[idn] = {};
                                project.taskTime[idn].start = Date.now();
                                project.taskTime[idn].pId = npId;
                                project.taskTime[idn].time = t;
                                saveTime('taskTime', project.taskTime);
                                if(project.selectedDate){
                                    $location.path('/timesheet/'+project.selectedDate);
                                }else{
                                    $location.path('/timesheet');
                                }
                            }else{
                                if(response.data){
                                    $rootScope.$broadcast('addError',response.data.error_code);
                                }
                                else{
                                    $rootScope.$broadcast('addError',response.error_code);
                                }

                            }
                        });
                    }else{
                        if(add === true){
                            if(project.selectedDate){
                                $location.path('/timesheet/'+project.selectedDate);
                            }else{
                                $location.path('/timesheet');
                            }
                        }
                    }
                    if(add === true){
                        project.addToSync('time',t,npId,pId,tId,id);
                    }
                    break;
                case "expenses":
                    var item = {},
                        amount = project.getAmount(),
                        t = start;
                    item.id = Date.now();
                    item.amount = project.getAmount();
                    item.expense_id = tId;
                    item.expense_name = project.getExpense(tId).name;
                    item.note = notes;
                    item.project_id = pId;
                    item.project_name = project.getProject(pId).project_name;
                    item.unit = project.getExpense(tId).unit;
                    item.unit_price = project.getExpense(tId).unit_price;
                    item.sync = 1;
                    if(!t){
                        var d = new Date();
                        t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                    }
                    if(!project.expense[t]){
                        project.expense[t] = {};
                        project.expense[t][item.id] = new Expense(item);
                    }else{
                        project.expense[t][item.id] = new Expense(item);
                    }
                    saveTime('expenses', project.expense);
                    if(connect != 'none' && connect !='unknown'){
                        $http.get(url+'index.php?do=mobile--mobile-add_expense&'+key+'&project_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+start).then(function(response){
                            if(response.data.code == 'ok'){
                                delete project.expense[t][item.id];
                                item.id = response.data.response[0].id;
                                item.sync = 0;
                                project.expense[t][item.id] = new Expense(item);
                                saveTime('expenses', project.expense);
                                if(project.selectedDate){
                                    $location.path('/expenses_list/'+project.selectedDate);
                                }else{
                                    $location.path('/expenses_list');
                                }
                            }else{
                                $rootScope.$broadcast('addError',response.data.error_code);

                            }
                        });
                    }else{
                        project.addToSync('expense',t,pId,'',tId,item.id);
                        if(project.selectedDate){
                            $location.path('/expenses_list/'+project.selectedDate);
                        }else{
                            $location.path('/expenses_list');
                        }
                    }
                    break;
                case "expenses_a":
                    var item = {},
                        amount = project.getAmount(),
                        t = start;
                    item.id = Date.now();
                    item.amount = project.getAmount();
                    item.expense_id = tId;
                    item.expense_name = project.getExpense(tId).name;
                    item.note = notes;
                    item.project_id = Date.now();
                    item.project_name = 'ad hoc';
                    item.unit = project.getExpense(tId).unit;
                    item.unit_price = project.getExpense(tId).unit_price;
                    item.customer_id = pId;
                    item.customer_name = project.getCustomer(pId).name;
                    item.sync = 1;
                    if(!t){
                        var d = new Date();
                        t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
                    }
                    if(!project.expense[t]){
                        project.expense[t] = {};
                        project.expense[t][item.id] = new Expense(item);
                    }else{
                        project.expense[t][item.id] = new Expense(item);
                    }
                    saveTime('expenses', project.expense);
                    if(connect != 'none' && connect !='unknown'){
                        $http.get(url+'index.php?do=mobile--mobile-add_expense&'+key+'&customer_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+start).then(function(response){
                            if(response.data.code == 'ok'){
                                delete project.expense[t][item.id];
                                item.id = response.data.response[0].id;
                                item.project_id = response.data.response[0].project_id;
                                item.sync = 0;
                                project.expense[t][item.id] = new Expense(item);
                                saveTime('expenses', project.expense);
                                if(project.selectedDate){
                                    $location.path('/expenses_list/'+project.selectedDate);
                                }else{
                                    $location.path('/expenses_list');
                                }
                            }else{
                                $rootScope.$broadcast('addError',response.data.error_code);

                            }
                        });
                    }else{
                        project.addToSync('expense',t,item.project_id,pId,tId,item.id);
                        if(project.selectedDate){
                            $location.path('/expenses_list/'+project.selectedDate);
                        }else{
                            $location.path('/expenses_list');
                        }
                    }
                    break;
                default:
                    var h = project.getHours(),
                        id = Date.now(),
                        p = project.getProject(pId),
                        ta = project.getTask(pId,tId),
                        t = start,
                        add = true;
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
                            add = false;
                            $rootScope.$broadcast('addError','Task already added');
                        }
                    }
                    if(add === true){
                        project.taskTimeId[t][pId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
                        saveTime('taskTimeId', project.taskTimeId);
                        project.taskTime[id] = {};
                        project.taskTime[id].start = Date.now();
                        project.taskTime[id].pId = pId;
                        project.taskTime[id].time = t;
                        saveTime('taskTime', project.taskTime);
                    }

                    if(connect != 'none' && connect !='unknown'){
                        $http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
                            if(response.data.code == 'ok'){
                                delete project.taskTime[id];
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
                                id=idn;
                                project.taskTimeId[t][pId].tasks[idn] = new TaskTimeId(ta, p, h, notes, idn);
                                saveTime('taskTimeId', project.taskTimeId);
                                // delete project.taskTime[id];
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
                                if(response.data){
                                    $rootScope.$broadcast('addError',response.data.error_code);
                                }
                                else{
                                    $rootScope.$broadcast('addError',response.error_code);
                                }
                            }
                        });
                    }else{
                        if(add === true){
                            if(project.selectedDate){
                                $location.path('/timesheet/'+project.selectedDate);
                            }else{
                                $location.path('/timesheet');
                            }
                        }
                    }
                    if(add === true){
                        project.addToSync('time',t,pId,'',tId,id);
                    }
                    break;
            }
        }
        /* end send data to server */

        project.stop = function(item, time){
            item.active = '';
            saveTime('taskTimeId', project.taskTimeId);
            delete project.taskTime[item.task_time_id];
            saveTime('taskTime', project.taskTime);
            $location.path('/timesheet/'+time);
        }

        project.start = function(item, time){
            project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
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
        project.interval = $interval(rune,1000);

        function rune(){
            var d = Date.now();
            for( x in project.taskTime ){
                if(JSON.stringify(project.taskTime[x]) != '{}' ){
                    var newTime = Math.floor((d-project.taskTime[x].start)/1000);
                        newTime = newTime/3600;
                    if(project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x]){
                        project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].hours = newTime;
                        project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].active = 'active';
                        saveTime('taskTimeId', project.taskTimeId);
                    }
                }
            }
            // saveTime('taskTime', project.taskTime);
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
        // syncronization function zhe shiit!
        project.sync = function(){
            // console.log(project.toSync);
            for(x in project.toSync){
                var item = project.toSync[x],
                    itemNr = x;
                if(item.type == 'time' && !item.synced){
                    if(typeof(project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id']) == 'string'){
                        var sendItem = {};
                        sendItem.task_time_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id'];
                        sendItem.hours = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['hours'];
                        sendItem.notes = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['notes'];
                        $http({
                            method: 'POST',
                            url: url+'index.php?do=mobile--mobile-save_time&'+key+'&overwrite=1',
                            data: 'task_time=' + JSON.stringify(Array(sendItem)),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function(res){
                            if(res.data.code == 'ok' && res.data.response.updated[0] == item.id){
                                // delete from sync
                                project.toSync[itemNr].synced = true;
                                if(project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'] != 'active'){
                                    delete project.toSync[itemNr];
                                }
                                $rootScope.$broadcast('syned');
                                saveTime('toSync', project.toSync);
                                return project.sync();
                            }
                        });
                        break;
                    }else{
                        var sendItem = {};
                        sendItem.task_time_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id'];
                        sendItem.hours = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['hours'];
                        sendItem.notes = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['notes'];
                        $http({
                            method: 'POST',
                            url: url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+item.pId+'&customer_id='+item.cId+'&task_id='+item.tId+'&notes='+sendItem.notes+'&hours='+sendItem.hours+'&start='+item.time,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function(res){

                            if(res.data.code == 'ok'){
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id] = {};
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].task_time_id = res.data.response.id;
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].task_id = item.tId;
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].project_id = item.pId;
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].customer_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['customer_id'];
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].hours = sendItem.hours;
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].notes = sendItem.notes;
                                project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].active = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'];
                                delete project.toSync[itemNr];
                                if(project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'] == 'active'){
                                    project.taskTime[res.data.response.id] = {};
                                    project.taskTime[res.data.response.id].start = project.taskTime[sendItem.task_time_id].start;
                                    project.taskTime[res.data.response.id].pId = item.pId;
                                    project.taskTime[res.data.response.id].time = item.time;
                                    delete project.taskTime[sendItem.task_time_id];
                                    project.addToSync('time',item.time,item.pId,item.cId,item.tId,res.data.response.id);
                                    project.toSync[itemNr].synced = true;
                                }
                                delete project.taskTimeId[sendItem.task_time_id];
                                $rootScope.$broadcast('syned');
                                saveTime('toSync', project.toSync);
                                saveTime('taskTimeId', project.taskTimeId);
                                saveTime('taskTime', project.taskTime);
                                return project.sync();
                            }
                        });
                        break;
                    }
                }else if(item.type=='expense' && !item.synced){
                    if(typeof(project.expense[item.time][item.id]['id']) == 'string'){}else{
                        var prId = item.pId,
                            notes = project.expense[item.time][item.id]['note'],
                            amount = project.expense[item.time][item.id]['amount'];
                        if(typeof(item.pId)!='string'){
                            prId = '';
                        }
                        $http({
                            method: 'POST',
                            url: url+'index.php?do=mobile--mobile-add_expense&'+key,
                            data: '&project_id='+prId+'&customer_id='+item.cId+'&expense_id='+item.tId+'&note='+notes+'&amount='+amount+'&start='+item.time,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function(res){
                            if(res.data.code == 'ok'){
                                // delete from sync
                                project.expense[item.time][res.data.response[0].id] = {};
                                project.expense[item.time][res.data.response[0].id].amount = amount;
                                project.expense[item.time][res.data.response[0].id].customer_id = item.cId;
                                project.expense[item.time][res.data.response[0].id].customer_name = project.expense[item.time][item.id]['customer_name'];
                                project.expense[item.time][res.data.response[0].id].expense_id = item.tId;
                                project.expense[item.time][res.data.response[0].id].expense_name = project.expense[item.time][item.id]['expense_name'];
                                project.expense[item.time][res.data.response[0].id].note = notes;
                                project.expense[item.time][res.data.response[0].id].project_id = res.data.response[0].project_id;
                                project.expense[item.time][res.data.response[0].id].project_name = project.expense[item.time][item.id]['project_name'];
                                project.expense[item.time][res.data.response[0].id].unit = project.expense[item.time][item.id]['unit'];
                                project.expense[item.time][res.data.response[0].id].unit_price = project.expense[item.time][item.id]['unit_price'];;
                                delete project.expense[item.time][itemNr];
                                delete project.toSync[itemNr];
                                $rootScope.$broadcast('syned');
                                saveTime('toSync', project.toSync);
                                saveTime('expenses', project.toSync);
                                return project.sync();
                            }
                        });
                    break;
                    }
                }else{

                }
            }
            $rootScope.$broadcast('finish');
        }

        project.addToSync = function(type,time,pId,cId,tId,id){
            if(!project.toSync[id]){
                project.toSync[id] = new SyncItem(type,time,pId,cId,tId,id);
                saveTime('toSync', project.toSync);
            }
        }

        function SyncItem(type,time,pId,cId,tId,id){
            this.type = type;
            this.time = time;
            this.pId = pId;
            this.cId = cId;
            this.tId = tId;
            this.id = id;
            this.synced = false;
        }

        return project;
    }
]);