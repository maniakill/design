var ctrl=angular.module('ctrl',[]);
// start
ctrl.controller('start',['$scope','$timeout','$location',
	function ($scope,$timeout,$location){
		var token = localStorage.getItem('token');
		var target = token ? '/timesheet' : '/login';
		// $timeout(function() { $location.path(target); }, 1000);
	}
]);
// login
ctrl.controller('login',['$scope','$http','$templateCache','$location','$timeout','project','vibrate',
	function ($scope,$http,$templateCache,$location,$timeout,project,vibrate) {
		var token = localStorage.getItem('token');
		if(token){ $location.path('/timesheet'); }
		$scope.method = 'POST';
		$scope.url = 'https://app.akti.com/pim/mobile/';
		$scope.loged = '';
		$scope.params = [];
		$scope.fetch = function() {
			vibrate.vib(100);
			$scope.params['username']=$scope.username;
			$scope.params['password']=$scope.password;
			if($scope.params['username'] && $scope.params['password']){
				$http({method:$scope.method,url:$scope.url,cache:$templateCache,params:$scope.params}).
				success(function(data,status) {
					if(data.code == 'ok'){
						localStorage.setItem('token',data.response);
						localStorage.setItem('username',$scope.params['username']);
						localStorage.setItem('TLang',data.lang_id);
						localStorage.setItem('Tfirst_name',data.first_name);
						localStorage.setItem('Tlast_name',data.last_name);
						localStorage.setItem('Temail',data.email);
						project.setKey();
						$location.path('/timesheet');
					}else{
						$scope.alerts=[{type:'error',msg:data.error_code}];
						$timeout(function(){ $scope.closeAlert(0); },3000);
					}
				}).error(function(data,status){
					alert(data);
					alert(status);
					$scope.alerts=[{type:'error',msg:LANG[project.lang]['Server error. Please try later']}];
					$timeout(function(){ $scope.closeAlert(0); },3000);
				});
			}else{
				$scope.alerts=[{type:'error',msg:LANG[project.lang]['Please fill all the fields']}];
				$timeout(function(){ $scope.closeAlert(0); },3000);
			}
		};
		$scope.closeAlert=function(index){vibrate.vib(100); $scope.alerts.splice(index,1);}
		$scope.openInBrowser=function(){ window.open('https://app.akti.com', '_system', 'location=yes'); }
	}
]);
// timesheet
ctrl.controller('timesheet',['$scope','$timeout','project','$routeParams','$location','$rootScope','$filter','vibrate',
	function ($scope,$timeout,project,$routeParams,$location,$rootScope,$filter,vibrate){
		$scope.total_hours = 0;
		$scope.getTaskName = function(pr,item){
			var t=project.getTask(pr,item);
			return t.task_name;
		}
		var fixList = function(d){
			$scope.total_hours = 0;
			var array = [];
			angular.forEach(d,function(value,key){
				var tempP = project.getProject(value.id);
				var p = { name: tempP.project_name, cname: tempP.customer_name, id:value.id, tasks:[] };
				angular.forEach(value.tasks,function(v,k){
					var t = v;
					t.task_name = $scope.getTaskName(value.id,t.task_id);
					$scope.total_hours = parseFloat($scope.total_hours) + parseFloat(t.hours);
					p.tasks.push(t);
				});
				p.tasks = $filter('orderBy')(p.tasks,'task_name',false);
				array.push(p);
			});
			return $filter('orderBy')(array,'cname',false);
		}
		$scope.projects=[];
		$scope.notToday = true;
		if($routeParams.y && $routeParams.m && $routeParams.d){ var time=$routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y; }
		else if(project.selectedDate){ var time = project.selectedDate; }
		else{ var d=new Date(), time=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear(); }
		var Today = new Date(), TimeT = Today.getDate()+'/'+(Today.getMonth()+1)+'/'+Today.getFullYear();
		if(time==TimeT){ $scope.notToday = false; }
		$scope.no_project=true;
		if(!project.taskTimeId[time]){ project.taskTimeId[time]={}; }
		$scope.projects = fixList(project.taskTimeId[time]);
		if(JSON.stringify(project.taskTimeId[time]) == '{}'){ $scope.no_project=false; }
		if(!$scope.no_project){project.loading();}
		$scope.jumpToToday = function(){
			vibrate.vib(100);
			project.setDate(TimeT,Today);
			$location.path('/timesheet/'+TimeT);
		}
		$scope.showh=function(item){ return number2hour(item); }
		$scope.test=function(){ $scope.projects.task[0].hours='1:00'; }

		$scope.editTask = function(pId, tId, notes, adhoc, cId, taskTimeId){
			vibrate.vib(100);
			var ad_hoc = (adhoc == 'ad hoc') > 0 ? true : false;
			project.setNote(notes);
			if(ad_hoc === true){ $location.path('/add_a/'+cId+'/'+tId+'/'+pId+'/'+taskTimeId+'/'+time); }
			else{ $location.path('/add/'+pId+'/'+tId+'/'+taskTimeId+'/'+time); }
		}
		$scope.closeAlert = function(index) { $scope.alerts.splice(index, 1); vibrate.vib(100); };
		$scope.addNewTask = function(){ $rootScope.$broadcast('clickAdd'); }
		var p = Object.keys(project.alerts);
		if(p && p !='' && p != undefined){
			$scope.alerts = [{ type: p, msg: project.alerts[p] }];
			$timeout(function(){ $scope.closeAlert(0); },3000);
		}
		$scope.$on('closeDatepicker', function(arg) { $scope.opened = false; });
		$scope.$on('updateTotal', function(arg) { $scope.projects = fixList(project.taskTimeId[time]); });
		project.closeAlert();
		$timeout( function(){
			project.getTime(time).then(function(res){
				project.checkTimeSheet(res,time);
				$scope.no_project=true;
				if(JSON.stringify(project.taskTimeId[time]) == '{}'){ $scope.no_project=false; }
				$scope.projects = fixList(project.taskTimeId[time]);
				project.stopLoading();
			},function(){ project.stopLoading(); });
		});
	}
]);
// add
ctrl.controller('add',['$scope','$routeParams','project','$location','$timeout','geolocation','vibrate','$rootScope',
	function ($scope,$routeParams,project,$location,$timeout,geolocation,vibrate,$rootScope){
		/*geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });*/
		var alertText = ['project','task'], time = '';
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		$scope.date = 'today';
		$scope.customer = LANG[project.lang]['Customer Name'];
		$scope.project = LANG[project.lang]['Project Name'];
		$scope.task = LANG[project.lang]['Select Task'];
		$scope.notes = '';
		$scope.notes2 = LANG[project.lang]['Add note'];
		$scope.no_task = false;
		$scope.dHours = '0:00';
		if(project.Scopes){
			$scope.notes = project.Scopes.notes;
			$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
		}
		if(project.Date){
			$scope.dta = project.Date;
		}
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
						if(project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].notes){$scope.notes = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].notes; $scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];}
						if(isNaN(h)){ h = 0; }
						$scope.dHours = number2hour(h);
						var d = new Date();
						d.setHours( Math.floor(h) );
						var minutes = h;
						if(isNaN(minutes)){ minutes = 0; }
						minutes = Math.round(minutes * 60);
						if(minutes >= 60){
							var n = Math.floor(minutes/60);
							minutes = minutes - (60*n);
						}
						if(minutes==undefined && isNaN(minutes)){ minutes=0; }
						d.setMinutes( minutes );
						$scope.mytime = d;
					}
				}
			}else{
				$location.path('/timesheet');
			}
		}
		$scope.edit = function(e){
			if($scope.mode === true){ return false; }
			if(e){
				var r = corect_val($scope.dHours);
				if($scope.mytime == null){
					$scope.mytime = new Date();
				}
				var zhe_number = explode(':',r);
				$scope.mytime.setHours(zhe_number[0]);$scope.mytime.setMinutes(zhe_number[1]);
				$scope.changed();
				$scope.show_time = false; $scope.hide_entry=false;
				$rootScope.$emit('changeTheTime');
			}else{
				$scope.show_time = true; $scope.hide_entry=true;
			}
		}
		$scope.today = function() { if(!$scope.dta){$scope.dta = new Date();} };
		$scope.today();
		$scope.open = function() {
			if(!$routeParams.taskTimeId){
				vibrate.vib(100);
				$timeout(function() { $scope.opened = true; });
			}
		};
		$scope.$on('closeDatepicker', function(arg) { $scope.opened = false; });
		$scope.getDates = function(){
			if(!$scope.dta){ $scope.dta = new Date(); }
			if($scope.dta instanceof Date === false){
				$scope.dta = new Date();
			}
			var d = $scope.dta.getDate();
			var m = months[$scope.dta.getMonth()];
			var y = $scope.dta.getFullYear();
			return d + ' ' + m + ', ' + y;
		}
		$scope.selectTask = function(id){
			project.savescope($scope);
			if(!$routeParams.taskTimeId){ vibrate.vib(100); $location.path('/lists/'+id); }
		}
		$scope.dateOptions = { 'year-format': "'yy'", 'starting-day': 1 };
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
			$scope.mode = false;
			if(item.active){ $scope.mode = true; }
		}
		$scope.save = function(save){
			vibrate.vib(100);
			if(!$routeParams.item){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[0]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			if(!$routeParams.taskId){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[1]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			$scope.changed();
			if(save === true){
				if($routeParams.taskTimeId){
					$scope.changed();
					project.update(item,$scope.time2,$scope);
				}else{ project.save('',$routeParams.item,$routeParams.taskId,$scope.notes,true); }
			}else{
				if($routeParams.taskTimeId){ project.start(item,$scope.time2); }
				else{ project.save('',$routeParams.item,$routeParams.taskId,$scope.notes); }
			}
		}
		$scope.stop = function(){ vibrate.vib(100); project.stop(item,$scope.time2); }
		$scope.changed = function () {
			if($scope.mytime == null){
				$scope.mytime = new Date();
				$scope.mytime.setHours(0);$scope.mytime.setMinutes(0);
			}
			var hours = $scope.mytime.getHours(), minutes = $scope.mytime.getMinutes(), t = hours + minutes/60;
			project.setHours(t);
			$scope.dHours = number2hour(t);
		};
		/*timepicker end*/
		$scope.addNote = function(pId,tId){
			vibrate.vib(100);
			$timeout(function(){ document.getElementById('ddd').focus(); });
			$scope.show_amount = true;
			$scope.hide_entry=true;
		}
		$scope.saveNote = function(){
			vibrate.vib(100);
			$scope.notes2 = $scope.notes ? $scope.notes : 'Add note';
			$scope.show_amount = false;
			$scope.hide_entry=false;
		}
		$scope.closeAlert = function(index) { vibrate.vib(100); $scope.alerts.splice(index, 1); };
		$scope.$on('addError', function(arg,args) {
			$scope.alerts = [ { type: 'error', msg: args } ];
			$timeout(function(){ $scope.closeAlert(0); },3000);
		});
		$scope.$on('changed',function(arg){ $scope.changed(); });
		$scope.$on('saveFromHeader',function(arg,args){ $scope.save(args); });
	}
]);
// task_type
ctrl.controller('task_type',['$scope','$modalInstance','items', '$location', 'types','vibrate',
	function ($scope, $modalInstance, items, $location, types,vibrate) {
		$scope.items = items;
		$scope.types = types;
		$scope.open = function(url){vibrate.vib(100); $location.path(url); $scope.cancel(); }
		$scope.cancel = function () {vibrate.vib(100); $modalInstance.dismiss('cancel'); };
	}
]);
ctrl.controller('task_type1',['$scope','$modalInstance','items', '$location', 'types','vibrate',
	function ($scope, $modalInstance, items, $location, types,vibrate) {
		$scope.items = items;
		$scope.types = types;
		$scope.open = function(url){
			vibrate.vib(100);
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
		$scope.cancel = function () {vibrate.vib(100); $modalInstance.dismiss('cancel'); };
	}
]);
// lists
ctrl.controller('lists',['$scope', '$http', '$location', 'project', '$routeParams', '$route','$timeout','vibrate',
	function ($scope,$http,$location,project,$routeParams,$route,$timeout,vibrate){
		var link = $route.current.originalPath == '/lists/expense/' ? '/expenses/' : '/add/';
		var fixList = function(p){
			var array = [];
			angular.forEach(p,function(value,key){
				this.push(value);
			},array);
			return array;
		}
		$scope.projs = project.time;
		$scope.items = [];
		$scope.tasks = [];
		$scope.projectList = true;
		$scope.taskList = true;
		if($routeParams.projectId){
			$scope.taskList = false;
			$scope.projectId = $routeParams.projectId;
			$scope.tasks = fixList(project.time[$scope.projectId].task);
			$timeout(function(){project.getProjectTaskList($scope.projectId).then(function(){
				$scope.tasks = fixList(project.time[$scope.projectId].task)
			});});
		}else{
			$scope.projectList = false;
			$scope.items = fixList(noAdHocP($scope.projs));
			$timeout(function(){
				project.getProjectList().then(function(results){
					if(typeof(results.response[0].projects) == 'object'){ $scope.items = fixList(noAdHocP($scope.projs)); }
					project.stopLoading();
				},function(){ project.stopLoading(); });
			});
		}
		$scope.open = function (pId,tId){
			vibrate.vib(100);
			if(tId){ $location.path(link+pId+'/'+tId); }
			else{ project.savescope(); $location.path(link+pId); }
		}
		$scope.open2 = function (pId){
			vibrate.vib(100);
			var l =  $route.current.originalPath == '/lists/expense/' ? 'lists_e' : $location.path();
			$location.path(l+'/'+pId);
		}
		function noAdHocP(p){
			var ps = {};
			if(p){ for(x in p){ if(p[x].project_name != 'ad hoc'){ ps[x] = p[x]; } } }
			return ps;
		}
	}
]);
// lists_a
ctrl.controller('lists_a',['$scope','$http','$location','project','$routeParams','$route','$timeout','vibrate',
	function ($scope,$http,$location,project,$routeParams,$route,$timeout,vibrate){
		var link = $route.current.originalPath == '/lists_a/expense/' ? '/expenses_a/' : '/add_a/';
		var fixList = function(p){
			var array = [];
			angular.forEach(p,function(value,key){
				this.push(value);
			},array);
			return array;
		}
		$scope.items = [];
		$scope.tasks = [];
		$scope.projectList = true;
		$scope.taskList = true;
		if($routeParams.customerId){
			$scope.taskList = false;
			$scope.customerId = $routeParams.customerId;
			$scope.tasks = fixList(project.adhocTask);
			$timeout(function(){project.getCustomerTaskList($routeParams.customerId).then(function(){
				$scope.tasks = fixList(project.adhocTask);
			});});
		}else{
			$scope.projectList = false;
			$scope.items = fixList(project.customers);
			$timeout(function(){project.getCustomerList().then(function(){
				$scope.items = fixList(project.customers);
			});});
		}
		$scope.open2 = function (pId){
			vibrate.vib(100);
			var l = $route.current.originalPath == '/lists_a/expense/' ? 'lists_ea' : $location.path();
			$location.path(l+'/'+pId);
		}
		$scope.open = function (pId,tId){
			vibrate.vib(100);
			if(tId){ $location.path(link+pId+'/'+tId); }
			else{ project.savescope(); $location.path(link+pId); }
		}
	}
]);
// lists_e
ctrl.controller('lists_e',['$scope','$http','$location','project','$routeParams','$route','$timeout','vibrate',
	function ($scope,$http,$location,project,$routeParams,$route,$timeout,vibrate){
		var prj = $route.current.originalPath.search('_ea') > 0 ? false : true;
		var link = prj ? '/expenses/' : '/expenses_a/' ;
		var fixList = function(p){
			var array = [];
			angular.forEach(p,function(value,key){
				this.push(value);
			},array);
			return array;
		}
		$scope.expense = fixList(project.expenseList);
		$scope.projectId = $routeParams.projectId;
		$timeout(function(){project.getExpensesList().then(function(){
			$scope.expense = fixList(project.expenseList);
		});});
		$scope.open = function (pId,tId){
			vibrate.vib(100);
			if(tId){ $location.path(link+pId+'/'+tId); }
			else{ $location.path(link+pId); }
		}
	}
]);
// addNote
ctrl.controller('addNote',['$scope', 'project',
	function ($scope, project){ $scope.notes =  project.getNote() ? project.getNote() : ''; }
]);
// addAmount
ctrl.controller('addAmount',['$scope', 'project',
	function ($scope, project, $route){ $scope.amount =  project.getAmount() ? project.getAmount() : ''; }
]);
// expenses
ctrl.controller('expenses',['$scope','$routeParams', 'project', '$location', '$timeout', '$route', '$modal','vibrate',
	function ($scope, $routeParams, project, $location, $timeout, $route, $modal,vibrate){
		var prj = $route.current.originalPath.search('_a') > 0 ? false : true,
			type = $route.current.originalPath.search('_a') > 0 ? 'expenses_a' : 'expenses',
			alertText = ['project','expense','amount'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		$scope.date = 'today';
		$scope.customer = LANG[project.lang]['Select Expense'];
		$scope.project = LANG[project.lang]['Project Name'];
		$scope.task = LANG[project.lang]['Receipt Photo'];
		$scope.displayIt = 'display: none';
		$scope.amount = '';
		$scope.notes = '';
		$scope.notes2 = LANG[project.lang]['Add note'];
		$scope.no_task = false;
		$scope.task_type = [ { title: LANG[project.lang]['Take Photo'], url: 'capturePhoto()' }, { title: LANG[project.lang]['Go to galery'], url: 'getPhoto(pictureSource.PHOTOLIBRARY)'} ];
		$scope.img = '';
		$scope.show_amount = false;
		$scope.show_note = false;
		$scope.hide_entry = false;
		if(project.Scopes){
			$scope.amount = isNaN(project.Scopes.amount) ? $scope.amount : parseInt(project.Scopes.amount);
			$scope.notes = project.Scopes.notes;
			$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
		}
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
							if($routeParams.expId){
								var idx = $routeParams.d +'/'+ $routeParams.m +'/'+ $routeParams.y;
								$scope.amount = project.expense[idx][$routeParams.expId]['amount'] ? parseInt(project.expense[idx][$routeParams.expId]['amount']) : '';
								$scope.notes = project.expense[idx][$routeParams.expId]['note'];
								$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
								$scope.img = project.expense[idx][$routeParams.expId]['picture'];
								if($scope.img){
									$scope.task="";
									$scope.displayIt='';
								}
							}
						}
					}
				}else{ $location.path('/expenses_list'); }
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
							if($routeParams.expId){
								var idx = $routeParams.d +'/'+ $routeParams.m +'/'+ $routeParams.y;
								$scope.amount = project.expense[idx][$routeParams.expId]['amount'] ? parseInt(project.expense[idx][$routeParams.expId]['amount']) : '';
								$scope.notes = project.expense[idx][$routeParams.expId]['note'];
								$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
								$scope.img = project.expense[idx][$routeParams.expId]['picture'];
								if($scope.img){
									$scope.task="";
									$scope.displayIt='';
								}
							}
						}
					}
				}else{ $location.path('/expenses_list'); }
			}
		}
		$scope.$on('closeDatepicker', function(arg) { $scope.opened = false; });
		$scope.getDates = function(){
			if(!$scope.dta){ $scope.dta = new Date(); }
			if($scope.dta instanceof Date === false){
				$scope.dta = new Date();
			}
			var d = $scope.dta.getDate();
			var m = months[$scope.dta.getMonth()];
			var y = $scope.dta.getFullYear();
			return d + ' ' + m + ', ' + y;
		}
		$scope.closeAlert = function(index) { vibrate.vib(100); $scope.alerts.splice(index, 1); };
		$scope.save = function(){
			vibrate.vib(100);
			if(!$routeParams.item){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[0]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			if(!$routeParams.taskId){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[1]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			if(isNaN($scope.amount) || $scope.amount == 0){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[2]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			if($routeParams.expId){
				var smallImage = document.getElementById('smallImage'), pic = smallImage.src.search('base64') > 0 ? smallImage.src : '';
				project.updateExpense($routeParams.d +'/'+ $routeParams.m +'/'+ $routeParams.y,$routeParams.expId,$scope.amount,$scope.notes,pic); }
			else{ project.save(type,$routeParams.item,$routeParams.taskId,$scope.notes,false,$scope.amount); }
		}
		$scope.$on('saveFromHeader',function(arg){ $scope.save(); });
		$scope.today = function() {
			if($routeParams.y && $routeParams.m && $routeParams.d){ $scope.dta = new Date($routeParams.y, $routeParams.m-1, $routeParams.d); }
			else if( project.Date ){ $scope.dta = project.Date; }
			else{ $scope.dta = new Date(); }
		};
		$scope.today();
		$scope.open = function() { if(!$routeParams.expId){ vibrate.vib(100); $timeout(function() { $scope.opened = true; }); } };
		$scope.selectExpense = function(id){
			project.savescope($scope);
			if(!$routeParams.expId){
				vibrate.vib(100);
				if(prj){ $location.path('/lists_e/'+id); }
				else{ $location.path('/lists_ea/'+id); }
			}
		}
		$scope.dateOptions = { 'year-format': "'yy'", 'starting-day': 1 };
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
		/*timepicker end*/
		$scope.addNote = function(pId,tId){
			vibrate.vib(100);
			$scope.hide_entry = true;
			$scope.show_note = true;
			$timeout(function(){ document.getElementById('ddd').focus(); });
		}
		$scope.saveNote = function(){ vibrate.vib(100); $scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note']; $scope.hide_entry = false; $scope.show_note = false; }
		var setf = function(){
			document.getElementById("addamount").focus();
		}
		$scope.addAmount = function(pId,tId){
			vibrate.vib(100);
			$scope.hide_entry = true;
			$scope.show_amount=true;
			$timeout(function(){ document.getElementById('addamount').focus(); });
		}
		$scope.saveAmount = function(){
			if(!$scope.amount){ $scope.amount = ''; }
			$scope.hide_entry = false;
			$scope.show_amount = false;
		}
		$scope.selectTask = function(){ $scope.add(); }
		$scope.$on('addError', function(arg,args) {
			$scope.alerts = [ { type: 'error', msg: args } ];
			$timeout(function(){ $scope.closeAlert(0); },3000);
		});
		/*modal*/
		$scope.add = function () {
			var modalInstance = $modal.open({
			  templateUrl: 'layout/task_type.html',
			  controller: 'task_type1',
			  resolve: {
				items: function () { return $scope.task_type; },
				types: function(){ return $scope.types; }
			  }
			});
		};
		/*modalend*/
	}
]);
// account
ctrl.controller('account',['$scope', '$location', 'project', '$interval','vibrate',
	function ($scope, $location, project,$interval,vibrate){
		$scope.username = localStorage.username;
		//deleting the database
		var removeStuff = function (){ localStorage.clear(); }
		// removeStuff();
		$scope.logout = function (){
			vibrate.vib(100);
			// $interval.cancel(project.interval);
			localStorage.setItem('username','');
			localStorage.setItem('token','');
			// removeStuff(); // this is for testiung only and shall be removed when going live
			$location.path('/login');
		}
	}
]);
// pending
ctrl.controller('pending',['$scope','$location','project','$timeout','$route','vibrate','$http',
	function ($scope,$location,project,$timeout,$route,vibrate,$http){
		var clicked = false;
		$scope.times = 0;
		$scope.progress = true;
		$scope.max = 0;
		if(project.toSync){ $scope.max = Object.keys(project.toSync).length; }
		$scope.dynamic = 0;
		$scope.type = 'info';
		$scope.entries = 0;
		$scope.expenses = 0;
		$scope.running = 0;
		for(x in project.toSync){
			project.toSync[x].synced = false;
			var item = project.toSync[x];
			if(item.type == 'time'){
				if(project.taskTimeId[item.time] && project.taskTimeId[item.time][item.pId] && project.taskTimeId[item.time][item.pId]['tasks'][item.id] && project.taskTimeId[item.time][item.pId]['tasks'][item.id]['active'] == 'active'){
				 $scope.running++; $scope.run = 'square_active';
				}else if(!project.taskTimeId[item.time] || !project.taskTimeId[item.time][item.pId] || !project.taskTimeId[item.time][item.pId]['tasks'][item.id]){
					delete project.toSync[x];
					$scope.max = Object.keys(project.toSync).length;
				}else{
				 $scope.entries++; $scope.ent='square_active';
				}
			}else{ $scope.expenses++; $scope.exp='square_active'; }
		}
		// connect = 'none';
		$scope.sync = function(){
			vibrate.vib(100);
			var connect = checkConnection();
			if(connect != 'none' && connect !='unknown'){
				$scope.max = Object.keys(project.toSync).length;
				if($scope.max > 0 && clicked === false){
					clicked = true;
					$scope.open();
					$scope.dynamic = 0;
					$scope.times = 0;
					project.sync();
				}else{ $scope.alerts = [ { type: 'info', msg: LANG[project.lang]['No items to synchronize.'] } ]; }
			}else{ $scope.alerts = [ { type: 'error', msg: LANG[project.lang]['No internet access. Please connect to the internet and then use the sync button.'] } ]; }
		}
		$scope.closeAlert = function(index) { vibrate.vib(100); $scope.alerts.splice(index, 1); };
		$scope.$on('syned', function(arg,item) {
			$scope.dynamic++;
			switch(item){
				case 'time': $scope.entries--; if($scope.entries < 1 ){ $scope.ent=''; } break;
				case 'expense': $scope.expenses--; if($scope.expenses < 1){ $scope.exp=''; } break;
				default: break;
			}
		});
		$scope.$on('finish', function(arg) {
			$scope.times++;
			if($scope.times > $scope.max){
				clicked = false;
				for(x in project.toSync){ project.toSync[x].synced = false; }
				project.saveStuff('toSync',project.toSync);
				$timeout(function() { $scope.progress = true; $route.reload(); },1000);
			}
		});
		$scope.open = function(){ $timeout(function(){ $scope.progress = false; }); }
		$scope.$on('$destroy',function(){ for(x in project.toSync){ project.toSync[x].synced = false; } project.saveStuff('toSync',project.toSync); });
	}
]);
// add adhoc
ctrl.controller('add_a',['$scope','$routeParams', 'project', '$location', '$timeout','vibrate','$rootScope',
	function ($scope, $routeParams, project, $location, $timeout,vibrate,$rootScope){
		var time = '', alertText = ['project','task'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		$scope.date = 'today';
		$scope.customer = LANG[project.lang]['Customer Name'];
		$scope.task = LANG[project.lang]['Select Task'];
		$scope.notes = '';
		$scope.notes2 = LANG[project.lang]['Add note'];
		$scope.no_task = false;
		$scope.dHours = '0:00';
		if(project.Scopes){
			$scope.notes = project.Scopes.notes;
			$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
		}
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
						if(project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].notes){ $scope.notes = project.taskTimeId[time][$scope.projectId].tasks[$routeParams.taskTimeId].notes; $scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note']; }
						if(isNaN(h)){h=0;}
						$scope.dHours = number2hour(h);
						var d = new Date();
						d.setHours( Math.floor(h) );
						var minutes = h;
						if(isNaN(minutes)){ minutes = 0; }
						minutes = Math.round(minutes * 60);
						if(minutes >= 60){
							var n = Math.floor(minutes/60);
							minutes = minutes - (60*n);
						}
						if(isNaN(minutes)){minutes=0;}
						d.setMinutes( minutes );
						$scope.mytime = d;
					}
				}
			}else{ $location.path('/timesheet'); }
		}
		$scope.edit = function(e){
			if($scope.mode === true){ return false; }
			if(e){
				var r = corect_val($scope.dHours);
				if($scope.mytime == null){
					$scope.mytime = new Date();
				}
				var zhe_number = explode(':',r);
				$scope.mytime.setHours(zhe_number[0]);$scope.mytime.setMinutes(zhe_number[1]);
				$scope.changed();
				$scope.show_time = false; $scope.hide_entry=false;
				$rootScope.$emit('changeTheTime');
			}else{
				$scope.show_time = true; $scope.hide_entry=true;
			}
		}
		$scope.today = function() {
			if($routeParams.y && $routeParams.m && $routeParams.d){ $scope.dta = new Date($routeParams.y, $routeParams.m-1, $routeParams.d); }
			else if( project.Date ){ $scope.dta = project.Date; }
			else{ $scope.dta = new Date(); }
		};
		$scope.today();
		$scope.open = function() { if(!$routeParams.taskTimeId){ vibrate.vib(100); $timeout(function() { $scope.opened = true; }); } };
		$scope.selectTask = function(id){ project.savescope($scope); if(!$routeParams.taskTimeId){ vibrate.vib(100); $location.path('/lists_a/'+id); } }
		$scope.dateOptions = { 'year-format': "'yy'", 'starting-day': 1 };
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
			if(item.active){ $scope.mode = true; }
			else{ $scope.mode = false; }
		}
		$scope.$on('closeDatepicker', function(arg) { $scope.opened = false; });
		$scope.save = function(save){
			vibrate.vib(100);
			if(!$routeParams.item){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[0]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			if(!$routeParams.taskId){
				$scope.alerts = [{ type: 'error', msg: LANG[project.lang]["Please select a "+alertText[1]] }];
				$timeout(function(){ $scope.closeAlert(0); },3000);
				return false;
			}
			$scope.changed();
			if(save === true){
				if($routeParams.taskTimeId){
					$scope.changed();
					project.update(item,$scope.time2,$scope);
				}else{ project.save('add_a',$routeParams.item,$routeParams.taskId,$scope.notes,true); }
			}else{
				if($routeParams.taskTimeId){ project.start(item,$scope.time2); }
				else{ project.save('add_a',$routeParams.item,$routeParams.taskId,$scope.notes); }
			}
		}
		$scope.getDates = function(){
			if(!$scope.dta){ $scope.dta = new Date(); }
			if($scope.dta instanceof Date === false){
				$scope.dta = new Date();
			}
			var d = $scope.dta.getDate();
			var m = months[$scope.dta.getMonth()];
			var y = $scope.dta.getFullYear();
			return d + ' ' + m + ', ' + y;
		}
		$scope.stop = function(){ vibrate.vib(100); project.stop(item,$scope.time2); }
		$scope.changed = function () {
			if($scope.mytime == null){
				$scope.mytime = new Date();
				$scope.mytime.setHours(0);$scope.mytime.setMinutes(0);
			}
			var hours = $scope.mytime.getHours(), minutes = $scope.mytime.getMinutes(), t = hours + minutes/60;
			project.setHours(t);
			$scope.dHours = number2hour(t);
		};
		/*timepicker end*/
		$scope.addNote = function(pId,tId){
			vibrate.vib(100);
			$timeout(function(){ document.getElementById('ddd').focus(); });
			$scope.show_amount = true;
			$scope.hide_entry=true;
		}
		$scope.saveNote =function(){
			vibrate.vib(100);
			$scope.notes2 = $scope.notes ? $scope.notes : LANG[project.lang]['Add note'];
			$scope.show_amount= false;
			$scope.hide_entry=false;
		}
		$scope.closeAlert = function(index) {vibrate.vib(100); $scope.alerts.splice(index, 1); };
		$scope.$on('addError', function(arg,args) {
			$scope.alerts = [ { type: 'error', msg: args } ];
			$timeout(function(){ $scope.closeAlert(0); },3000)
		});
		$scope.$on('saveFromHeader',function(arg,args){ $scope.save(args); });
	}
]);
// expenses_list
ctrl.controller('expenses_list',['$scope','$timeout','project','$routeParams','$location','$rootScope','$filter','vibrate',
	function ($scope,$timeout,project,$routeParams,$location,$rootScope,$filter,vibrate){
		var fixList = function(d){
			var data = [];
			angular.forEach(d,function(value,key){
				data.push(value);
			});
			return $filter('orderBy')(data,'customer_name',false);
		}
		$scope.expense = [];
		$scope.notToday = true;
		if($routeParams.y && $routeParams.m && $routeParams.d){ var time = $routeParams.d+'/'+$routeParams.m+'/'+$routeParams.y; }
		else if(project.selectedDate){var time = project.selectedDate; }
		else{ var d = new Date(), time= d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear(); }
		if(!project.expense[time]){ project.expense[time] = {}; }
		var Today = new Date(), TimeT = Today.getDate()+'/'+(Today.getMonth()+1)+'/'+Today.getFullYear();
		if(time==TimeT){ $scope.notToday = false; }
		$scope.jumpToToday = function(){
			vibrate.vib(100);
			project.setDate(TimeT,Today);
			$location.path('/expenses_list/'+TimeT);
		}
		$scope.no_project = true;
		$scope.expense = fixList(project.expense[time]);
		if(JSON.stringify(project.expense[time]) == '{}'){ $scope.no_project = false; }
		if(!$scope.no_project){ project.loading(); }
		$scope.editTask = function(pId,tId,adhoc,cId,expId){
			vibrate.vib(100);
			if(adhoc == "ad hoc"){ $location.path('/expenses_a/'+cId+'/'+tId+'/'+expId+'/'+time); }
			else{ $location.path('/expenses/'+pId+'/'+tId+'/'+expId+'/'+time); }
		}
		$scope.addNewTask = function(){ $rootScope.$broadcast('clickAdd'); }
		$scope.closeAlert = function(index) { vibrate.vib(100); $scope.alerts.splice(index, 1); };
		var p = Object.keys(project.alerts);
		if(p && p !='' && p != undefined){
			$scope.alerts = [{ type: p, msg: project.alerts[p] }];
			$timeout(function(){ $scope.closeAlert(0); },3000);
		}
		project.closeAlert();
		$scope.$on('closeDatepicker', function(arg) { $scope.opened = false; });
		$timeout(function(){
			project.getExpenses(time).then(function(res){
				project.checkExpenses(res,time);
				$scope.no_project = true;
				if(JSON.stringify(project.expense[time]) == '{}'){ $scope.no_project = false; }
				$scope.expense = fixList(project.expense[time]);
			});
		});
	}
]);

ctrl.controller('lists_c', ['$scope','project','$location','$timeout','vibrate', function ($scope,project,$location,$timeout,vibrate){
	var fixList = function(p){
		var array = [];
		angular.forEach(p,function(value,key){
			this.push(value);
		},array);
		return array;
	}
	$scope.items = fixList(project.contractList);
	$timeout(function(){project.getContractList().then(function(){
		$scope.items = fixList(project.contractList);
	});});
	$scope.getCName = function(item){
		return project.getCustomer(item).customer_name;
	}
	$scope.open = function (pId,tId){
		vibrate.vib(100);
		$location.path('/add/'+pId+'/'+tId);
	}

}]);