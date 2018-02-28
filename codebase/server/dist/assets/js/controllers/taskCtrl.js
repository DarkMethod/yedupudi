'use strict';
/**
 * controller for tasks
 * Simple table with sorting and filtering on AngularJS
 */
app.controller('taskCtrl', ["$rootScope", "$scope", "$filter", "$auth", "ngTableParams", "task", "SweetAlert", "toaster", function ($rootScope, $scope, $filter, $auth, ngTableParams, task, SweetAlert, toaster) {	
	$rootScope.user = $auth.getPayload();
	var user = $scope.user = $rootScope.user;
	console.log(user);
	if(user.type === 'admin'){
		var tasks = task.getAllTasks().then(function(data) {
			tasks = data;
			for(var i in tasks){
				tasks[i].items = tasks[i].items.split(',');
				tasks[i].edit = false;
				if(tasks[i].service === 'property'){
					tasks[i].service = 'Property Management';
				}else if(tasks[i].service === 'medical'){
					tasks[i].service = 'Medical Services';
				}else if(tasks[i].service === 'legal'){
					tasks[i].service = 'Auditing & Legal Services';
				}else if(tasks[i].service === 'document'){
					tasks[i].service = 'Document Procurement';
				}else if(tasks[i].service === 'travel'){
					tasks[i].service = 'Travel & Tourism';
				}else if(tasks[i].service === 'education'){
					tasks[i].service = 'Education & Tracking';
				}else if(tasks[i].service === 'event'){
					tasks[i].service = 'Event Management';
				}else{
					tasks[i].service = 'Misc';
				}
			}
			$scope.tableParams = new ngTableParams({
				page: 1,
				count: 10
			}, {
				total: tasks.length,
				getData: function ($defer, params) {
							var orderedData = params.sorting() ? $filter('orderBy')(tasks, params.orderBy()) : tasks;
							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});

		});
		
		$scope.detailsId = $scope.editId = -1;
		
		$scope.setDetailsId = function (uuid) {
			$scope.detailsId = uuid;
		};
		
		var setEditId = $scope.setEditId = function (uuid) {
			$scope.editId = uuid;
			$scope.edit = {};
			$scope.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};
			$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[0];
			$scope.minDate = new Date();
			$scope.maxDate = new Date(2020, 5, 22);
		};
		
		$scope.removeTask = function (uuid) {
			SweetAlert.swal({
				title: "Are you sure?",
				text: "You will not be able to undo this action!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, remove it!",
				closeOnConfirm: false
			},
			function(isConfirm){
				if(isConfirm){
					task.removeTask(uuid).then(function(res) {	
						if(res.data.result === 'success'){
							var index = -1;
							var Arr = eval(tasks);
							for (var i = 0; i < Arr.length; i++) {
								if (Arr[i].uuid === uuid) {
									index = i;
									break;
								}
							}
							if (index === -1) {
								alert("Something gone wrong");
							}
							tasks.splice(index, 1);
							$scope.tableParams.reload();
							SweetAlert.swal("Removed!", "Successfully removed.", "success");	
						}else{
							SweetAlert.swal("Error", "An error occured. Please try again later", "error");
						}
					});
				}
			});	
		};
		
		$scope.editTask = function (uuid) {
			var edit = $scope.edit;
			var datefilter = $filter('date');
			if(edit.start){
					edit.start = datefilter(edit.start, 'dd-MMMM-yyyy');
			}
			if(edit.end){
				edit.end = datefilter(edit.end, 'dd-MMMM-yyyy');
			}
			if(!angular.equals({}, edit)){
				task.editTask(uuid, edit).then(function(res) {
					if(res.data.result === 'success'){
						setEditId(-1);
						var index = -1;
						for (var i = 0; i < tasks.length; i++) {
							if (tasks[i].uuid === uuid) {
								if(edit.start){
									tasks[i].start = edit.start;
								}
								if(edit.end){
									tasks[i].end = edit.end;
								}
								if(edit.price){
									tasks[i].price = edit.price;
								}
								if(edit.status){	
									tasks[i].status = edit.status;
								}
								index = i;
								break;
							}
						}
						if (index === -1) {
							alert("Something gone wrong");
						}
						toaster.pop('success', 'Info', 'Successfully Updated');
						$scope.tableParams.reload();
					}else{
						toaster.pop('error', 'Error', 'An error occured. Please try again later.');
						setEditId(-1);
					}	
				});
			}
		};
	}else{
		var tasks = task.getTasks(user.email).then(function(data) {
			tasks = data;
			for(var i in tasks){
				tasks[i].items = tasks[i].items.split(',');
				if(tasks[i].service === 'property'){
					tasks[i].service = 'Property Management';
				}else if(tasks[i].service === 'medical'){
					tasks[i].service = 'Medical Services';
				}else if(tasks[i].service === 'legal'){
					tasks[i].service = 'Auditing & Legal Services';
				}else if(tasks[i].service === 'document'){
					tasks[i].service = 'Document Procurement';
				}else if(tasks[i].service === 'travel'){
					tasks[i].service = 'Travel & Tourism';
				}else if(tasks[i].service === 'education'){
					tasks[i].service = 'Education & Tracking';
				}else{
					tasks[i].service = 'Misc';
				}
			}
			$scope.tableParams = new ngTableParams({
				page: 1,
				count: 10
			}, {
				total: tasks.length,
				getData: function ($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')(tasks, params.orderBy()) : tasks;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
		});
		
		$scope.detailsId = -1;
		
		$scope.setDetailsId = function (uuid) {
			$scope.detailsId = uuid;
		};	
	}	
}])