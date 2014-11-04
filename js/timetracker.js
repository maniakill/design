window.addEventListener('load', function() { FastClick.attach(document.body); }, false);
function checkConnection() {
	if(devReady === true){ var networkState = navigator.connection.type; }
	else if(navigator){ var networkState = navigator.onLine; }
	else{ var networkState = 'browser'; }
	return networkState;
}
function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,targetWidth: 1024,
	targetHeight: 1024,destinationType: destinationType.DATA_URL });
}
function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
}
function onFail(message) { alert('Failed because: ' + message); }
function getPhoto(source) {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,targetWidth: 1024,
	targetHeight: 1024, destinationType: destinationType.DATA_URL, sourceType: source });
}
function onPhotoURISuccess(imageURI) {
  var largeImage = document.getElementById('smallImage');
  largeImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageURI;
}
/*! angularjs-geolocation 11-09-2013 */
angular.module("geolocation",[]).constant("geolocation_msgs",{"errors.location.unsupportedBrowser":"Browser does not support location services","errors.location.notFound":"Unable to determine your location"}),angular.module("geolocation").factory("geolocation",["$q","$rootScope","$window","geolocation_msgs",function(a,b,c,d){return{getLocation:function(){var e=a.defer();return c.navigator&&c.navigator.geolocation?c.navigator.geolocation.getCurrentPosition(function(a){b.$apply(function(){e.resolve(a)})},function(){b.$broadcast("error",d["errors.location.notFound"]),b.$apply(function(){e.reject(d["errors.location.notFound"])})}):(b.$broadcast("error",d["errors.location.unsupportedBrowser"]),b.$apply(function(){e.reject(d["errors.location.unsupportedBrowser"])})),e.promise}}}]);
var app = angular.module('timeT', ['ngRoute','angular-gestures','ctrl','ui.bootstrap','geolocation']);
app.config(function ($routeProvider) {
	$routeProvider
		.when('/',{controller: 'login',templateUrl: 'layout/login.html'})
		// .when('/login',{controller: 'login',templateUrl: 'layout/login.html'})
		.when('/login/:error',{controller: 'login',templateUrl: 'layout/login.html'})
		.when('/timesheet',{controller: 'timesheet',templateUrl: 'layout/timesheet.html'})
		.when('/timesheet/:d/:m/:y',{controller: 'timesheet',templateUrl: 'layout/timesheet.html'})
		.when('/expenses_list',{controller: 'expenses_list',templateUrl: 'layout/expenses_list.html'})
		.when('/expenses_list/:d/:m/:y',{controller: 'expenses_list',templateUrl: 'layout/expenses_list.html'})
		.when('/lists',{controller: 'lists',templateUrl: 'layout/lists.html'})
		.when('/lists/expense/',{controller: 'lists',templateUrl: 'layout/lists.html'})
		.when('/lists/expense/:projectId',{controller: 'lists',templateUrl: 'layout/lists.html'})
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
		.when('/addAmount_expense/:pId/:tId/:expId/:d/:m/:y',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addAmount_expense/:pId/:tId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addAmount_expense/:pId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addAmount_expensea/:pId/:tId/:expId/:d/:m/:y',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addAmount_expensea/:pId/:tId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addAmount_expensea/:pId',{controller: 'addAmount',templateUrl: 'layout/addAmount.html'})
		.when('/addNote_expense/:pId/:tId/:expId/:d/:m/:y',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/addNote_expense/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/addNote_expense/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/addNote_expensea/:pId/:tId/:expId/:d/:m/:y',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/addNote_expensea/:pId/:tId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/addNote_expensea/:pId',{controller: 'addNote',templateUrl: 'layout/addNote.html'})
		.when('/expenses/:item',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/expenses/:item/:taskId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/expenses/:item/:taskId/:expId/:d/:m/:y',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/expenses_a/:item',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/expenses_a/:item/:taskId',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/expenses_a/:item/:taskId/:expId/:d/:m/:y',{controller: 'expenses',templateUrl: 'layout/expenses.html'})
		.when('/account',{controller: 'account',templateUrl: 'layout/account.html'})
		.when('/footer',{controller: 'footer',templateUrl: 'layout/footer.html'})
		.when('/header',{controller: 'header',templateUrl: 'layout/header.html'})
		.when('/pending',{controller: 'pending',templateUrl: 'layout/pending.html'})
		.otherwise({ redirectTo: '/' });
}).factory('vibrate', function (){
  return {
    vib: function (milliseconds) {
      if(navigator.vibrate){ navigator.vibrate(milliseconds); }
    }
  };
});
app.factory('project', ['$http','$templateCache','$location','$rootScope','$interval',
	function ($http,$templateCache,$location,$rootScope,$interval) {
		var project = {}, url = 'https://app.salesassist.eu/pim/mobile/', key = 'api_key='+localStorage.token+'&username='+localStorage.username, obj = {};
		/* store data */
		var init = function(){
		project.lang = localStorage.getItem("TLang") ? JSON.parse(localStorage.getItem("TLang")) : 2;
		project.time = localStorage.getItem('timesheet'+localStorage.username) ? JSON.parse(localStorage.getItem('timesheet'+localStorage.username)) : {};
		project.customers = localStorage.getItem('customers'+localStorage.username) ? JSON.parse(localStorage.getItem('customers'+localStorage.username)) : {};
		project.adhocTask = localStorage.getItem('adhocTasksList'+localStorage.username) ? JSON.parse(localStorage.getItem('adhocTasksList'+localStorage.username)) : {};
		project.expense = localStorage.getItem('expenses'+localStorage.username) ? JSON.parse(localStorage.getItem('expenses'+localStorage.username)) : {};
		project.expenseList = localStorage.getItem('expensesList'+localStorage.username) ? JSON.parse(localStorage.getItem('expensesList'+localStorage.username)) : {};
		project.taskTimeId = localStorage.getItem('taskTimeId'+localStorage.username) ? JSON.parse(localStorage.getItem('taskTimeId'+localStorage.username)) : {};
		project.taskTime = localStorage.getItem('taskTime'+localStorage.username) ? JSON.parse(localStorage.getItem('taskTime'+localStorage.username)) : {};
		project.toSync = localStorage.getItem('toSync'+localStorage.username) ? JSON.parse(localStorage.getItem('toSync'+localStorage.username)) : {};
		project.alerts={};
		project.synceded = true;
		project.menuUpdate = undefined;
		}
		init();
		var saveTime = function(type, item){
			if(!localStorage.username){ return false; }
			if(!type){ type = 'timesheet'; item = project.time; }
			localStorage.setItem(type+localStorage.username, JSON.stringify(item));
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
				var id = item.task_time_id, t = time;
				if(!t){
					var d = new Date();
					t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
				}
				if(!project.taskTimeId[t]){ project.taskTimeId[t] = {}; }
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
		function Cust(item, show){ this.customer_name = item.name; this.customer_id = item.id; }
		function AdHoc(item, show){ this.name = item.name; this.id = item.id; }
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
			this.picture = item.picture ? item.picture : '';
			this.unit = item.unit;
			this.unit_price = item.unit_price;
			this.sync = item.sync;
		}
		function Expenses(item){
			this.expense_id = item.expense_id;
			this.unit = item.unit;
			this.unit_price = item.unit_price;
			this.name = item.expense_name ? item.expense_name : item.name;
		}
		var save = function(item, show, saveT, time){
			var id = item.project_id;
			// save the customer
			var customerItem = {};
			customerItem.id = item.customer_id;
			customerItem.name = item.customer_name;
			saveCustomer(customerItem);
			// save the customer
			if(!project.time[id]){ project.time[id] = new Proj(item, show, saveT, time); }
			else{
				if(!project.time[id].task){ project.time[id].task = {}; }
				for(x in item.task){
					var t_id = item.task[x].task_id;
					if(!project.time[id].task[t_id]){ project.time[id].task[t_id] = new Task(item.task[x], show, saveT, item, time); }
					if(saveT){
						var idt = item.task[x].task_time_id;
						var t = time;
						if(!t){
							var d = new Date();
							t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
						}
						if(!project.taskTimeId[t]){ project.taskTimeId[t] = {}; }
						if(!project.taskTimeId[t][id]){
							project.taskTimeId[t][id] = {};
							project.taskTimeId[t][id].id = id;
							project.taskTimeId[t][id].tasks = {};
						}
						if(!project.taskTimeId[t][id].tasks[idt]){ project.taskTimeId[t][id].tasks[idt] = new TaskTimeId(item.task[x], item, item.task[x].hours, item.task[x].notes, idt);
						}else{
							project.taskTimeId[t][id].tasks[idt].notes = item.task[x].notes /*when we get notes from upstairs*/
							project.taskTimeId[t][id].tasks[idt].hours = item.task[x].hours /*when we get hours from upstairs*/
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
			saveExpens(item);
			if(!t){
				var d = new Date();
				t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
			}
			save(item,false,true,t);
			if(!project.expense[t]){
				project.expense[t] = {};
				project.expense[t][id] = new Expense(item);
			}else{
				if(!project.expense[t][id]){ project.expense[t][id] = new Expense(item); }
			}
			saveTime('expenses', project.expense);
		}
		var saveExpens = function(item){
			var id = item.expense_id;
			if(!project.expenseList[id]){ project.expenseList[id] = new Expenses(item); }
			saveTime('expensesList', project.expenseList);
		}
		/* end store data */
		/* requests */
		project.getTime = function(time) {
			this.data = $http.get(url+'index.php?do=mobile-time&'+key+'&start='+time).then(function(response){
				if(response.data.code=='ok'){
					if(typeof(response.data.response.project) == 'object' ){
						var pr = response.data.response.project;
						for(x in pr){ save(pr[x], false, true, time); }
					}
				}
				if(response.data.code=='error'){ project.logout(response.data); }
				return response.data;
			});
			return this.data;
		}
		project.getProjectList = function(){
			//project.loading();
			this.data = $http.get(url+'index.php?do=mobile-project_list&'+key+'&all=1').then(function(response){
				if(response.data.code=='ok'){
					if(typeof(response.data.response[0].projects) == 'object'){
						var pr = response.data.response[0].projects;
						for(x in pr){ save(pr[x], true); }
					}
				}
				if(response.data.code=='error'){ project.logout(response.data); }
				return response.data;
			});
			return this.data;
		}
		project.getProjectTaskList = function(item){
			//project.loading();
			this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&project_id='+item+'&all=1').then(function(response){
				if(response.data.code == 'ok'){
					if(typeof(response.data.response.tasks) == 'object'){
						var ta = response.data.response.tasks;
						for(x in ta){ saveTask(item,ta[x],true); }
					}
				}else{ project.logout(response.data); }
				project.stopLoading();
				return response.data.response;
			},function(){ project.stopLoading(); });
			return this.data;
		}
		project.getCustomerList = function(){
			//project.loading();
			this.data = $http.get(url+'index.php?do=mobile-customer_list&'+key+'&all=1').then(function(response){
				if(response.data.code=='ok'){
					if(typeof(response.data.response[0].customers) == 'object'){
						var cu = response.data.response[0].customers;
						for(x in cu){ saveCustomer(cu[x],true); }
					}
				}
				if(response.data.code =='error'){ project.logout(response.data); }
				project.stopLoading();
				return response.data;
			},function(){ project.stopLoading(); });
			return this.data;
		}
		project.getCustomerTaskList = function(item){
			//project.loading();
			this.data =  $http.get(url+'index.php?do=mobile-task_list&'+key+'&customer_id='+item+'&all=1').then(function(response){
				if(response.data.code == 'ok'){
					if(typeof(response.data.response.tasks) == 'object'){
						var ad = response.data.response.tasks;
						for(x in ad){ saveAdhocTask(ad[x],true); }
					}
				}else{ project.logout(response.data); }
				project.stopLoading();
				return response.data.response;
			},function(){ project.stopLoading(); });
			return this.data;
		}
		project.getExpensesList = function(item){
			//project.loading();
			this.data = $http.get(url+'index.php?do=mobile-expenses_list&'+key+'&all=1').then(function(response){
				if(response.data.code == 'ok'){
					if(typeof(response.data.response[0].expense) == 'object'){
						var ex = response.data.response[0].expense;
						for(x in ex){ saveExpens(ex[x]); }
					}
				}else{ project.logout(response.data); }
				project.stopLoading();
				return response.data.response;
			},function(){ project.stopLoading(); });
			return this.data;
		}
		project.getExpenses = function(time){
			this.data = $http.get(url+'index.php?do=mobile-expenses&'+key+'&start='+time).then(function(response){
				if(response.data.code == 'ok'){
					if(typeof(response.data.response.expense) == 'object'){
						var ex = response.data.response.expense;
						for(x in ex){ saveExpenses(ex[x], time); }
					}
				}else{ project.logout(response.data); }
				project.stopLoading();
				return response.data;
			},function(){ project.stopLoading(); });
			return this.data;
		}
		/* end requests */
		/* geters and seters */
		project.getProject = function(id){ if (project.time[id] && id) { return project.time[id]; } return ''; }
		project.getTask = function(id, item){ if (id && item) { if(project.time[id]){ if(project.time[id].task[item]){ return project.time[id].task[item]; } } } return ''; }
		project.setNote = function(note){ obj.note = note; }
		project.getNote = function(){ if(obj.note){ return obj.note; } return ''; }
		project.setAmount = function(amount){ obj.amount = amount; }
		project.getAmount = function(){ if(obj.amount){ return obj.amount; } return ''; }
		project.setHours = function(hour){ obj.hours = hour; }
		project.getHours = function(){ if(obj.hours){ return obj.hours; } return 0; }
		project.getCustomer = function(id){ if (project.customers[id] && id) { return project.customers[id]; } return ''; }
		project.getAdhocTask = function(id){ if (project.adhocTask[id] && id) { return project.adhocTask[id]; } return ''; }
		project.getExpense = function(id){ if (project.expenseList[id] && id) { return project.expenseList[id]; } return ''; }
		project.setDate = function(time,d){ project.selectedDate = time; project.Date = d; }
		/* end geters and seters */
		/* send data to server */
		project.save = function(type, pId, tId,notes,noStart,expamount){
			var start = '',
				start2 = '',
				noStart = noStart ? true : false,
				connect = checkConnection();
				// connect = 'none';
			if(project.selectedDate){
				start = '&start='+project.selectedDate;
				start2 = project.selectedDate;
			}
			project.loading();
			switch (type){
				case "add_a":
					var h = project.getHours(), id = Date.now(), npId = Date.now(), p = Date.now(), ta = project.getAdhocTask(tId), t = start2, add = true;
					if(!t){
						var d = new Date();
						t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
					}
					if(!project.taskTimeId[t]){ project.taskTimeId[t] = {}; }
					if(!project.taskTimeId[t][npId]){
						project.taskTimeId[t][npId] = {};
						project.taskTimeId[t][npId].id = npId;
						project.taskTimeId[t][npId].tasks = {};
					}
					for(x in project.taskTimeId[t][npId].tasks){
						if(project.taskTimeId[t][npId].tasks[x].task_id == ta.task_id){
							add = false;
							$rootScope.$broadcast('addError',LANG[project.lang]['Task already added']);
						}
					}
					if(add === true){
						project.taskTimeId[t][npId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
						project.taskTimeId[t][npId].tasks[id].project_id = p;
						project.taskTimeId[t][npId].tasks[id].customer_id = pId;
						saveTime('taskTimeId', project.taskTimeId);
						if(noStart === false){
							project.taskTime[id] = {};
							project.taskTime[id].start = Date.now()-h*3600*1000;
							project.taskTime[id].pId = npId;
							project.taskTime[id].time = t;
							saveTime('taskTime', project.taskTime);
						}
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
								project.taskTimeId[t][npId].tasks[idn].project_id = npId;
								project.taskTimeId[t][npId].tasks[idn].customer_id = pId;
								saveTime('taskTimeId', project.taskTimeId);
								if(noStart === false){
									project.taskTime[idn] = {};
									project.taskTime[idn].start = Date.now()-h*3600*1000;
									project.taskTime[idn].pId = npId;
									project.taskTime[idn].time = t;
									saveTime('taskTime', project.taskTime);
								}
								if(add === true && noStart===false){ project.addToSync('time',t,npId,pId,tId,id); }
								project.alert('success',LANG[project.lang]['Time entry synced.']);
								project.stopLoading();
								if(project.selectedDate){ $location.path('/timesheet/'+project.selectedDate); }
								else{ $location.path('/timesheet'); }
							}else{
								delete project.taskTimeId[t][npId];
								delete project.taskTime[id];
								project.stopLoading();
								if(response.data){ $rootScope.$broadcast('addError',response.data.error_code); project.logout(response.data); }
								else{ $rootScope.$broadcast('addError',response.error_code); }
							}
						},function(){project.stopLoading();});
					}else{
						if(add === true){
							var temp_p = new Proj('','','','');
							temp_p.customer_id = pId;
							temp_p.customer_name = project.getCustomer(pId).customer_name;
							temp_p.project_id = p;
							temp_p.project_name = 'ad hoc';
							temp_p.task = {};
							temp_p.task[tId] = new Task('','','','','');
							temp_p.task[tId].task_name = project.getAdhocTask(tId).name;
							temp_p.task[tId].task_id = tId;
							project.time[p] = temp_p;
							saveTime();
							if(noStart === false){ project.addToSync('time',t,p,pId,tId,id); }
							if(project.selectedDate){ $location.path('/timesheet/'+project.selectedDate); }
							else{ $location.path('/timesheet'); }
						}
						project.stopLoading();
					}
					break;
				case "expenses":
					var item = {}, amount = expamount, t = start2, smallImage = document.getElementById('smallImage');
					item.id = Date.now();
					item.amount = expamount;
					item.expense_id = tId;
					item.expense_name = project.getExpense(tId).name;
					item.note = notes;
					item.project_id = pId;
					item.project_name = project.getProject(pId).project_name;
					item.customer_id = project.getProject(pId).customer_id;
					item.customer_name = project.getProject(pId).customer_name;
					item.unit = project.getExpense(tId).unit;
					item.unit_price = project.getExpense(tId).unit_price;
					item.sync = 1;
					item.picture = smallImage.src.search('base64') > 0 ? smallImage.src : '';
					if(!t){
						var d = new Date();
						t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
					}
					if(!project.expense[t]){
						project.expense[t] = {};
						project.expense[t][item.id] = new Expense(item);
					}else{ project.expense[t][item.id] = new Expense(item); }
					saveTime('expenses', project.expense);
					if(connect != 'none' && connect !='unknown'){
						var pic = '';
						if(item.picture){ pic ='&picture='+item.picture; }
						$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-add_expense&'+key, data: '&project_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+pic+'&start='+start, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
						.then(function(response){
							if(response.data.code == 'ok'){
								delete project.expense[t][item.id];
								item.id = response.data.response[0].id;
								item.sync = 0;
								project.expense[t][item.id] = new Expense(item);
								saveTime('expenses', project.expense);
								project.alert('success',LANG[project.lang]['Expense synced.']);
								project.stopLoading();
								if(project.selectedDate){ $location.path('/expenses_list/'+project.selectedDate); }
								else{ $location.path('/expenses_list'); }
							}else{ project.stopLoading(); $rootScope.$broadcast('addError',response.data.error_code); project.logout(response.data); }
						},function(){ project.stopLoading(); });
					}else{
						project.addToSync('expense',t,pId,'',tId,item.id);
						project.stopLoading();
						if(project.selectedDate){ $location.path('/expenses_list/'+project.selectedDate); }
						else{ $location.path('/expenses_list'); }
					}
					break;
				case "expenses_a":
					var item = {}, amount = expamount, t = start2, smallImage = document.getElementById('smallImage');
					item.id = Date.now();
					item.amount = expamount;
					item.expense_id = tId;
					item.expense_name = project.getExpense(tId).name;
					item.note = notes;
					item.project_id = Date.now();
					item.project_name = 'ad hoc';
					item.unit = project.getExpense(tId).unit;
					item.unit_price = project.getExpense(tId).unit_price;
					item.customer_id = pId;
					item.customer_name = project.getCustomer(pId).customer_name;
					item.sync = 1;
					item.picture = smallImage.src.search('base64') > 0 ? smallImage.src : '';
					if(!t){
						var d = new Date();
						t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
					}
					if(!project.expense[t]){
						project.expense[t] = {};
						project.expense[t][item.id] = new Expense(item);
					}else{ project.expense[t][item.id] = new Expense(item); }
					saveTime('expenses', project.expense);
					if(connect != 'none' && connect !='unknown'){
						var pic = '';
						if(item.picture){ pic ='&picture='+item.picture; }
						$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-add_expense&'+key, data: '&customer_id='+pId+'&expense_id='+tId+'&note='+notes+'&amount='+amount+start+pic, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
						.then(function(response){
							if(response.data.code == 'ok'){
								delete project.expense[t][item.id];
								item.id = response.data.response[0].id;
								item.project_id = response.data.response[0].project_id;
								item.sync = 0;
								project.expense[t][item.id] = new Expense(item);
								saveTime('expenses', project.expense);
								project.alert('success',LANG[project.lang]['Expense synced.']);
								project.stopLoading();
								if(project.selectedDate){ $location.path('/expenses_list/'+project.selectedDate); }
								else{ $location.path('/expenses_list'); }
							}else{ project.stopLoading(); $rootScope.$broadcast('addError',response.data.error_code); project.logout(response.data); }
						},function(){project.stopLoading();});
					}else{
						project.addToSync('expense',t,item.project_id,pId,tId,item.id);
						project.stopLoading();
						if(project.selectedDate){ $location.path('/expenses_list/'+project.selectedDate); }
						else{ $location.path('/expenses_list'); }
					}
					break;
				default:
					var h = project.getHours(), id = Date.now(), p = project.getProject(pId), ta = project.getTask(pId,tId), t = start2, add = true;
					if(!t){
						var d = new Date();
						t = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
					}
					if(!project.taskTimeId[t]){ project.taskTimeId[t] = {}; }
					if(!project.taskTimeId[t][pId]){
						project.taskTimeId[t][pId] = {};
						project.taskTimeId[t][pId].id = pId;
						project.taskTimeId[t][pId].tasks = {};
					}
					for(x in project.taskTimeId[t][pId].tasks){
						if(project.taskTimeId[t][pId].tasks[x].task_id == ta.task_id){
							add = false;
							$rootScope.$broadcast('addError',LANG[project.lang]['Task already added']);
						}
					}
					if(add === true){
						project.taskTimeId[t][pId].tasks[id] = new TaskTimeId(ta, p, h, notes, id);
						saveTime('taskTimeId', project.taskTimeId);
						if(noStart === false){
							project.taskTime[id] = {};
							project.taskTime[id].start = Date.now()-h*3600*1000;
							project.taskTime[id].pId = pId;
							project.taskTime[id].time = t;
							saveTime('taskTime', project.taskTime);
						}
					}
					if(connect != 'none' && connect !='unknown'){
						$http.get(url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+pId+'&task_id='+tId+'&notes='+notes+'&hours='+h+start).then(function(response){
							if(response.data.code == 'ok'){
								delete project.taskTime[id];
								var idn = response.data.response.id;
								for(x in project.taskTimeId[t]){ if(x == pId){ for(y in project.taskTimeId[t][x].tasks){ if(project.taskTimeId[t][x].tasks[y].task_id == tId){ delete project.taskTimeId[t][x].tasks[y]; } } } }
								id=idn;
								project.taskTimeId[t][pId].tasks[idn] = new TaskTimeId(ta, p, h, notes, idn);
								saveTime('taskTimeId', project.taskTimeId);
								if(noStart === false){
									project.taskTime[idn] = {};
									project.taskTime[idn].start = Date.now()-h*3600*1000;
									project.taskTime[idn].pId = pId;
									project.taskTime[idn].time = t;
									saveTime('taskTime', project.taskTime);
								}
								if(add === true && noStart === false){ project.addToSync('time',t,pId,'',tId,id); }
								project.alert('success',LANG[project.lang]['Time entry synced.']);
								project.stopLoading();
								if(project.selectedDate){ $location.path('/timesheet/'+project.selectedDate); }
								else{ $location.path('/timesheet'); }
							}else{
								delete project.taskTime[id];
								for(x in project.taskTimeId[t]){ if(x == pId){ for(y in project.taskTimeId[t][x].tasks){ if(project.taskTimeId[t][x].tasks[y].task_id == tId){ delete project.taskTimeId[t][x].tasks[y]; } } } }
								if(response.data){ $rootScope.$broadcast('addError',response.data.error_code); project.logout(response.data); }
								else{ $rootScope.$broadcast('addError',response.error_code); }
								project.stopLoading();
							}
						},function(){project.stopLoading();});
					}else{
						if(add === true){
							if(noStart === false){ project.addToSync('time',t,pId,'',tId,id); }
							if(project.selectedDate){ $location.path('/timesheet/'+project.selectedDate); }
							else{ $location.path('/timesheet'); }
						}
						project.stopLoading();
					}
				break;
			}
		}
		/* end send data to server */
		project.updateExpense = function(time,item,amount,note,picture){
			project.expense[time][item]['amount'] = amount;
			project.expense[time][item]['note'] = note;
			project.expense[time][item]['picture'] = picture;
			saveTime('expenses', project.expense);
			project.addToSync('expense',time,project.expense[time][item]['project_id'],project.expense[time][item]['customer_id'],project.expense[time][item]['expense_id'],item);
			$location.path('/expenses_list/'+time);
		}
		project.stop = function(item, time, redirect){
			var connect = checkConnection();
			item.active = '';
			saveTime('taskTimeId', project.taskTimeId);
			delete project.taskTime[item.task_time_id];
			saveTime('taskTime', project.taskTime);
			if(connect != 'none' && connect !='unknown'){
				project.loading();
				var sendItem = {};
				sendItem.task_time_id = item.task_time_id;
				sendItem.hours = item.hours;
				sendItem.notes = item.notes;
				$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-save_time&'+key+'&overwrite=1', data: 'task_time=' + JSON.stringify(Array(sendItem)), headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
				.then(function(res){
								project.stopLoading();
								if(res.data.code=='error'){ project.logout(res.data); }else{
									if(project.toSync[item.task_time_id+'time']){
									  delete project.toSync[item.task_time_id+'time'];
									}
									if(!redirect){ $location.path('/timesheet/'+time); }
								}
					 		},
						  function(){
						  	project.stopLoading();
						  	project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
						  	if(!redirect){ $location.path('/timesheet/'+time); }
						  });
			}else{
				project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
				if(!redirect){ $location.path('/timesheet/'+time); }
			}
		}
		project.start = function(item, time){
			// project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
			item.hours =  project.getHours();
			item.active = 'active';
			var connect = checkConnection();
			if(connect != 'none' && connect !='unknown'){
				var sendItem = {};
				sendItem.task_time_id = item.task_time_id;
				sendItem.hours = item.hours;
				sendItem.notes = item.notes;
				$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-save_time&'+key+'&overwrite=1', data: 'task_time=' + JSON.stringify(Array(sendItem)), headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
				.then(function(res){ if(res.data.code=='error'){ project.logout(res.data); } },
							function(){ project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id); });
			}
			project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
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
		project.update = function(item,time,scope){
			var connect = checkConnection();
			item.notes =  scope.notes;
			item.hours =  project.getHours();
			if(project.taskTime[item.task_time_id]){ project.taskTime[item.task_time_id].start = Date.now()-item.hours*3600*1000; }
			if(connect != 'none' && connect !='unknown'){
				var sendItem = {};
				sendItem.task_time_id = item.task_time_id;
				sendItem.hours = item.hours;
				sendItem.notes = item.notes;
				$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-save_time&'+key+'&overwrite=1', data: 'task_time=' + JSON.stringify(Array(sendItem)), headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
				.then(function(res){ if(res.data.code=='error'){ project.logout(res.data); } },
							function(){ project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id); });
			}else{
				project.addToSync('time',time,item.project_id,item.customer_id,item.task_id,item.task_time_id);
			}
			saveTime('taskTimeId', project.taskTimeId);
			saveTime('taskTime', project.taskTime);
			$location.path('/timesheet/'+time);
		}
		// var t = window.setInterval( rune, 1000 ); I don't know why this doesn't work and the line below works
		project.interval = $interval(rune,5000);
		function rune(){
			var d = Date.now();
			var save = false;
			for( x in project.taskTime ){
				save = true;
				if(JSON.stringify(project.taskTime[x]) != '{}' ){
					var newTime = Math.floor((d-project.taskTime[x].start)/1000);
						newTime = newTime/3600;
					if(project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x]){
						if(newTime > 24){
							project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].hours = 24;
							saveTime('taskTimeId', project.taskTimeId);
							project.stop(project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x],null,true);
						}else{
							project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].hours = newTime;
							project.taskTimeId[project.taskTime[x].time][project.taskTime[x].pId].tasks[x].active = 'active';
							saveTime('taskTimeId', project.taskTimeId);
						}
					}
				}
			}
			if(save == true){ saveTime('taskTime', project.taskTime);}
			var connect = checkConnection();
			if(connect != 'none' && connect !='unknown' && project.synceded){ project.synceded = false; project.sync(true); }
		}
		$rootScope.$on('finished', function(arg) {
			for(x in project.toSync){ project.toSync[x].synced = false; }
			project.saveStuff('toSync',project.toSync);
			project.synceded = true;
		});
		// project.addNewTask = function() { $rootScope.$broadcast('clickAdd'); };
		project.isLoged = function(){ if(!localStorage.token || !localStorage.username){ return false; } return true; } // still a isue if not loged
		// syncronization function zhe shiit!
		project.sync = function(condition){
			for(x in project.toSync){
				var item = project.toSync[x], itemNr = x;
				if(item.type == 'time' && !item.synced){
					if(typeof(project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id']) == 'string'){
						var sendItem = {},syncedI = 'active';
						sendItem.task_time_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id'];
						sendItem.hours = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['hours'];
						sendItem.notes = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['notes'];
						$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-save_time&'+key+'&overwrite=1', data: 'task_time=' + JSON.stringify(Array(sendItem)), headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
						.then(function(res){
							if(res.data.code == 'ok' && res.data.response.updated[0] == item.id){
								project.toSync[itemNr].synced = true;
								if(project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'] != 'active'){ delete project.toSync[itemNr]; syncedI = 'time'; }
								$rootScope.$broadcast('syned',syncedI);
								saveTime('toSync', project.toSync);
								return project.sync();
							}else{ project.toSync[itemNr].synced = true; if(res.data.code=='error'){ project.logout(res.data); } }
						});
						break;
					}else{
						var sendItem = {},syncedI = 'time';
						sendItem.task_time_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['task_time_id'];
						sendItem.hours = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['hours'];
						sendItem.notes = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['notes'];
						sendItem.active = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'];
						sendItem.customer_id = project.taskTimeId[item.time][item.pId]['tasks'][item.id]['customer_id'];
						if(typeof(item.pId) != 'string'){ item.pId = ''; }
						$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-add_task&'+key+'&project_id='+item.pId+'&customer_id='+item.cId+'&task_id='+item.tId+'&notes='+sendItem.notes+'&hours='+sendItem.hours+'&start='+item.time, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
						.then(function(res){
							if(res.data.code == 'ok'){
								item.pId = res.data.response.project_id;
								if(!project.taskTimeId[item.time][item.pId]){
									project.taskTimeId[item.time][item.pId] = {};
									project.taskTimeId[item.time][item.pId].id = item.pId;
									project.taskTimeId[item.time][item.pId].tasks = {};
								}
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id] = {};
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].task_time_id = res.data.response.id;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].task_id = item.tId;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].project_id = item.pId;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].customer_id = sendItem.customer_id;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].hours = sendItem.hours;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].notes = sendItem.notes;
								project.taskTimeId[item.time][item.pId]['tasks'][res.data.response.id].active = sendItem.active;
								delete project.toSync[itemNr];
								if(sendItem.active == 'active'){
									project.taskTime[res.data.response.id] = {};
									project.taskTime[res.data.response.id].start = project.taskTime[sendItem.task_time_id].start;
									project.taskTime[res.data.response.id].pId = item.pId;
									project.taskTime[res.data.response.id].time = item.time;
									delete project.taskTime[sendItem.task_time_id];
									project.addToSync('time',item.time,item.pId,item.cId,item.tId,res.data.response.id);
									project.toSync[res.data.response.id].synced = true;
									syncedI = 'active';
								}
								delete project.taskTimeId[item.time][item.pId]['tasks'][sendItem.task_time_id];
								delete project.taskTimeId[item.time][sendItem.task_time_id];
								$rootScope.$broadcast('syned',syncedI);
								saveTime('toSync', project.toSync);
								saveTime('taskTimeId', project.taskTimeId);
								saveTime('taskTime', project.taskTime);
								return project.sync();
							}else{ project.toSync[itemNr].synced = true; if(res.data.code=='error'){ project.logout(res.data); } }
						});
						break;
					}
				}else if(item.type=='expense' && !item.synced){
					if(project.expense[item.time] && typeof(project.expense[item.time][item.id]['id']) == 'string'){
						var prId = item.id, notes = project.expense[item.time][item.id]['note'], amount = project.expense[item.time][item.id]['amount'], picture = project.expense[item.time][item.id]['picture'], pic = '';
						if(picture){ pic = '&picture='+picture; }
						$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-update_expense&'+key, data: '&id='+prId+'&note='+notes+'&amount='+amount+pic+'&start='+item.time, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
						.then(function(res){
							if(res.data.code == 'ok'){
								delete project.toSync[itemNr];
								$rootScope.$broadcast('syned','expense');
								saveTime('toSync', project.toSync);
								return project.sync();
							}else{ project.toSync[itemNr].synced = true; if(res.data.code=='error'){ project.logout(res.data); } }
						});
						break;
					}else{
						if(project.expense[item.time]){
							var prId = item.pId, notes = project.expense[item.time][item.id]['note'], amount = project.expense[item.time][item.id]['amount'], picture = project.expense[item.time][item.id]['picture'], pic = '';
							if(picture){ pic = '&picture='+picture; }
							if(typeof(item.pId)!='string'){ prId = ''; }
							$http({ method: 'POST', url: url+'index.php?do=mobile--mobile-add_expense&'+key, data: '&project_id='+prId+'&customer_id='+item.cId+'&expense_id='+item.tId+'&note='+notes+'&amount='+amount+pic+'&start='+item.time, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
							.then(function(res){
								if(res.data.code == 'ok'){
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
									project.expense[item.time][res.data.response[0].id].unit_price = project.expense[item.time][item.id]['unit_price'];
									project.expense[item.time][res.data.response[0].id].picture = project.expense[item.time][item.id]['picture'];
									delete project.expense[item.time][item.id];
									delete project.toSync[itemNr];
									$rootScope.$broadcast('syned','expense');
									saveTime('toSync', project.toSync);
									saveTime('expenses', project.toSync);
									return project.sync();
								}else{ project.toSync[itemNr].synced = true; if(res.data.code=='error'){ project.logout(res.data); } }
							});
						}else{
							delete project.toSync[itemNr];
							return project.sync();
						}
						break;
					}
				}else{ project.toSync[itemNr].synced = true; }
			}
			if(condition){$rootScope.$broadcast('finished');}else{$rootScope.$broadcast('finish');}
		}
		project.addToSync = function(type,time,pId,cId,tId,id){
			if(!project.toSync[id+type]){
				project.toSync[id+type] = new SyncItem(type,time,pId,cId,tId,id);
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
		project.logout = function(code){
			if(code.error_code=='authentication required' || code.error_code=='wrong username'){
				localStorage.setItem('username','');
				localStorage.setItem('token','');
				$location.path('/login/'+code.error_code);
			}// else unknown error!!! and we don't need to relog the user
		}
		project.alert = function(t,s){ project.alerts={}; project.alerts[t] = s; }
		project.closeAlert = function(){ project.alerts={}; }
		project.savescope = function(s){ project.Scopes = s; };
		project.loading = function(){ angular.element('#loading').show(); }
    project.stopLoading = function(){ angular.element('#loading').hide(); }
		project.saveStuff = function(type,item){ saveTime(type,item); }
		project.setKey = function(){ key = 'api_key='+localStorage.token+'&username='+localStorage.username; init(); }
		return project;
	}
]).directive('lng',['project',function(project){
  return {
    restrict: 'A',
    // transclude: true,
    link: function (scope,element,attrs){
      /*
      works for input type text,password and submit, div,span,p,h[1-6] basicly any kind of element that can contain text
      element should have the lng attr and it's value should be the text to be translated
      element can have text inside of it that can be appended or prepended to the text in the lng attr (if you set the befor attr as true it will be appended)
      element should not contain other html in it because it will stop working
      element should not have angular bindings in it
      */
      if(element[0].tagName == 'INPUT'){
        if(element[0].type == 'submit'){
          element.val(attrs.lng);
          if(LANG[project.lang][attrs.lng]){ element.val( LANG[project.lang][attrs.lng] ); }
        }
        if(element[0].type == 'text' || element[0].type == 'password'){
          element[0].placeholder = attrs.lng;
          if(LANG[project.lang][attrs.lng]){ element[0].placeholder = LANG[project.lang][attrs.lng]; }
        }
      }else if(element[0].tagName == 'TEXTAREA'){
      	element[0].placeholder = attrs.lng;
         if(LANG[project.lang][attrs.lng]){ element[0].placeholder = LANG[project.lang][attrs.lng]; }
      }else{
        var extra = element[0].innerHTML, text = LANG[project.lang][attrs.lng] ? LANG[project.lang][attrs.lng] : attrs.lng, val = attrs.befor ? text + extra : extra + text;
        element.html(val);
      }
    }
  }
}]).directive('header',['project','$timeout','$routeParams','$location','$route','$modal','$rootScope','vibrate',function (project,$timeout,$routeParams,$location,$route,$modal,$rootScope,vibrate){
	return {
		restrict: 'A',
		scope: {},
		link: function($scope, iElm, iAttrs, controller) {
			$scope.title = LANG[project.lang][iAttrs.title];
			$scope.timesheet = true;
			switch($route.current.controller){
				case 'timesheet':
					$scope.timesheet = false;
					$scope.task_type = [ { title: LANG[project.lang]['Add Task for Project'], url: '/lists' }, { title: LANG[project.lang]['Add Ad Hoc Task'], url: '/lists_a'} ];
					$scope.types = 'Task';
					break;
				case 'expenses_list':
					$scope.timesheet = false;
					$scope.task_type = [ { title: LANG[project.lang]['Add Expense for Project'], url: '/lists/expense' }, {title: LANG[project.lang]['Add Ad Hoc Expense'], url: '/lists_a/expense'} ];
					$scope.types = 'Expense';
					break;
			}
			/*modal*/
			$scope.add = function () {
				vibrate.vib(100);
				var modalInstance = $modal.open({
				  templateUrl: 'layout/task_type.html',
				  controller: 'task_type',
				  resolve: {
					items: function () {
						project.setNote();
						project.setAmount();
						project.setHours();
						// project.setDate();
						return $scope.task_type;
					},
					types: function(){ return LANG[project.lang]['Select '+$scope.types+' type']; }
				  }
				});
			};
			/*modalend*/
			$scope.$on('clickAdd', function() { $scope.add(); });
			$scope.snap = function(){
				vibrate.vib(100);
				angular.element('.main_menu').show(0,function(){
					var _this = angular.element('.cmain_menu'), width = _this.outerWidth();
					_this.removeClass('slide_right slide_left').css({'left':'-'+width+'px'});
					$timeout(function(){ _this.addClass('slide_left'); });
				});
			}
		},
		templateUrl:'layout/header.html',

	}
}]).directive('menu',['project','vibrate',function (project,vibrate){
	return {
		restrict: 'A',
		controller:function($scope,$timeout,$location,$document,$rootScope,$interval){
			$scope.monthDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
			$scope.pend = true;
			$scope.itemsP = Object.keys(project.toSync).length;
			if($scope.itemsP < 1){ $scope.pend = false; }
			var canceler;
			$scope.snap_back = function(){
				vibrate.vib(100);
				$timeout(function(){ angular.element('.cmain_menu').addClass('slide_right'); });
				$timeout(function(){ angular.element('.main_menu').hide(); },500);
			}
			$scope.go = function(h){ vibrate.vib(100); $location.path(h); $scope.snap_back(); }
			$scope.handleGesture = function($event){ $scope.snap_back(); }
			$scope.name = localStorage.Tlast_name && localStorage.Tfirst_name ? localStorage.Tlast_name + ' ' + localStorage.Tfirst_name : localStorage.Tusername;
			$scope.email = localStorage.Temail ? localStorage.Temail : '';
			//$scope.logout = function(){ vibrate.vib(100); var code ={}; code.logout = true; project.logout(code); }
			$scope.closeDatePicker = function(){
					vibrate.vib(100);
					// $timeout(function(){ angular.element('.cmain_menu').addClass('slide_right'); });
				$timeout(function(){ angular.element('.main_menu').hide();
					var _this = angular.element('.cmain_menu');
					 _this.css({'left':'-35%'});
				},100);
			}
			$scope.doThis = function(){
				if ( angular.isDefined(project.menuUpdate) ) return;
				project.menuUpdate = $interval(rune,1000);
			}();
			function rune(){
				$scope.pend = true;
				$scope.itemsP = Object.keys(project.toSync).length;
				if($scope.itemsP < 1){ $scope.pend = false; }
			}
		 	$scope.$on('$destroy', function() {
	      if (angular.isDefined(project.menuUpdate)) {
	        $interval.cancel(project.menuUpdate);
	        project.menuUpdate = undefined;
	      }
	    });

		},
		templateUrl:'layout/menu.html',
	}
}]).directive('datepic', ['project','$route','$location','$timeout','$routeParams','vibrate', function (project,$route,$location,$timeout,$routeParams,vibrate){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'layout/daypic.html',
		link: function($scope, iElm, iAttrs, controller) {
			$scope.today = function() {
				if($routeParams.y && $routeParams.m && $routeParams.d){ $scope.dt = new Date($routeParams.y, $routeParams.m-1, $routeParams.d); }
				else if(project.Date){ $scope.dt = project.Date; }
				else{ $scope.dt = new Date(); }
			};
			$scope.today();
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			$scope.getDate = function(){
				if(!$scope.dt){ $scope.dt = new Date(); }
				if($scope.dt instanceof Date === false){
					$scope.dt = new Date();
				}
				var d = $scope.dt.getDate();
				var m = months[$scope.dt.getMonth()];
				var y = $scope.dt.getFullYear();
				return d + ' ' + m + ', ' + y;
			}

			$scope.goToDay = function(p){
				vibrate.vib(100);
				console.profile('go to day');
				var d = $scope.dt.getDate(),r = $route.current.controller;
				if(p === false){ $scope.dt.setDate(--d); }
				else{ $scope.dt.setDate(++d); }
				var timed = $scope.dt.getDate()+'/'+($scope.dt.getMonth()+1)+'/'+$scope.dt.getFullYear();
				project.setDate(timed,$scope.dt);
        if(r == 'timesheet'){
          $location.path('/timesheet/'+timed);
        }else if(r == 'expenses_list'){
          $location.path('/expenses_list/'+timed);
        }
        console.profileEnd();
			}
			$scope.selectDate = function(){
				vibrate.vib(100);
				$scope.opened = !$scope.opened;
				return false;
			}

		}
	};
}]).directive('search', function (){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'layout/search.html'
	};
});
