'use strict';
/** 
  * Factory for task management.
*/
app.factory('task',['$http', function($http){
	var task = {};
	
	task.getTasks = function(email){
		return $http.get('/quote/'+email).then(function(res) {
			return res.data.json;
		}, function(res){
			return res;
		});
	};
	task.getAllTasks = function(){
		return $http.get('/quote').then(function(res) {
			console.log(res);
			return res.data.json;
		}, function(res){
			return res;
		});
	};
	task.editTask = function(uuid, edits){
		return $http.put('/quote/'+uuid, edits).then(function(res) {
			return res;
		},function(res) {
			return res;
		});
	};
	task.removeTask = function(uuid){
		return $http.delete('/quote/'+uuid).then(function(res) {
			return res;
		},function(res) {
			return res;
		});
	};

	return task;
}]);