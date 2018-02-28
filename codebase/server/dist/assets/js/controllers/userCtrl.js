'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('userCtrl', ["$scope", "$rootScope", '$auth', '$http', 'SweetAlert', function ($scope, $rootScope, $auth, $http, SweetAlert) {
	$rootScope.user = $auth.getPayload();
	var userId = $rootScope.user.uuid;
	
	var getSocialAccounts = function(){
		$http.get('/alias/'+userId).then(function(response) {
			$scope.aliases = response.data.json;
		}).catch(function(response) {
			console.log(response);
		});
	};
	
	var successAlert = function (message) {
		SweetAlert.swal({
			title: message.title,
			text: message.text,
			type: "success",
			confirmButtonColor: "#007AFF",
		},
		function(isConfirm){
			getSocialAccounts();	
		});
	};
		
	var errorAlert = function (message) {
		SweetAlert.swal({
			title: message.title,
			text: message.text,
			type: "warning",
			confirmButtonColor: "#DD6B55",
		});
	};
	
	$scope.getSocialAccounts = getSocialAccounts;
	$scope.authenticate = function(provider){
		$auth.authenticate(provider).then(function(response) {
			$auth.setToken(response.data.token);
			var _provider = '';
			if(provider==='google')
				_provider = 'Google';
			else
				_provider = 'Facebook';
			var message = {};	
			message.title = 'Congrats!';
			message.text = 'Your '+_provider+' account has been successfully linked to your Yedupudi account.';
			successAlert(message);			
		}).catch(function(response) {
			var message = {};
			if(response.status === 409){
				message.title = 'Existing Account!';
				message.text = 'This '+provider+' account is already connected to your Yedupudi account.';
				errorAlert(message);
			}else{
				message.title = 'Oops!';
				message.text = 'We seem to be having some trouble. Please try again later.';
				errorAlert(message);	
			}
		});	
	};
}]);