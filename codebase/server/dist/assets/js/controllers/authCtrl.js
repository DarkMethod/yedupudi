'use strict';
/** 
  * controller for user authentication.
*/
app.controller('authCtrl', [
	'$rootScope',
	'$scope',
	'$state',
	'$stateParams',
	'$auth',
	'$http',
	'modal',
	'SweetAlert',
	function($rootScope, $scope, $state, $stateParams, $auth, $http, modal, SweetAlert){
		$scope.message = '';
		
		if($stateParams.status === 'expired'){
			$scope.message = "Your email verification link has expired. Please register again.";
		}
		
		if($stateParams.status === 'invalid'){
			$scope.message = "Your password reset link has expired.";
		}
		
		if($stateParams.status === 'verified'){
			$scope.message = "Your account has been activated.";
		}
		
		var successAlert = function (message) {
			SweetAlert.swal({
				title: message.title,
				text: message.text,
				type: "success",
				confirmButtonColor: "#007AFF",
				},
				function(isConfirm){
					$state.go(message._next);	
				}
			);
		};
		
		var errorAlert = function (message) {
			SweetAlert.swal({
				title: message.title,
				text: message.text,
				type: "warning",
				confirmButtonColor: "#DD6B55",
				}
			);
		};
		
		$scope.openModal = function(id, templateUrl, controller, currId){
			if(currId){
				modal.close(currId);
			}
			modal.open(id, templateUrl, controller);
		};
		
		$scope.cancelModal = function(id, state){
				if(state)
				{
					modal.close(id);
					$state.go(state);
				}	
				modal.close(id);
		};
				
		$scope.signUp = function(){
			$auth.signup($scope.user).then(function(response) {
				var message = {};
				message.title = 'Congrats!';
				message.text = 'An account activation link has been mailed to your email address.';
				message._next = 'login.login';
				if(modal.isOpen('signUp')){
					modal.close('signUp');
				}
				successAlert(message);
			})
			.catch(function(response) {
				var message = {};
				if(response.status === 409){
					message.title = 'Error!';
					message.text = 'A user with this email already exists.';
					if(modal.isOpen('signUp')){
						modal.close('signUp');
					}
					errorAlert(message);
				}else{
					message.title = 'Oops!';
					message.text = 'We seem to be having some trouble. Please try again later.';
					if(modal.isOpen('signUp')){
						modal.close('signUp');
					}
					errorAlert(message);	
				}
			});
		};

		$scope.signIn = function(type){
			var user = {};
			if(type==='admin'){
				user = $scope.user;
				user.type = 'admin';
			}else{
				user = $scope.user;
				user.type = 'client';	
			}
			$auth.login(user) .then(function(response) {
				$auth.setToken(response.data.token);
				$rootScope.user = $auth.getPayload();
				if(modal.isOpen('signIn')){
					modal.close('signIn');
				}
				if(type==='admin'){
					$state.go('app.dashboard');
				}else{
					$state.go('services.home');
				}
			})
			.catch(function(response) {
				var message = {};
				if(response.status === 401){
					message.title = 'Invalid!';
					message.text = 'Invalid email and/or password';
					if(modal.isOpen('signIn')){
						modal.close('signIn');
					}
					errorAlert(message);
				}else if(response.status === 403){
					message.title = 'Invalid!';
					message.text = 'You have not activated your account. Activate your account by clicking on the link that was mailed to you after sign-up.';
					if(modal.isOpen('signIn')){
						modal.close('signIn');
					}
					errorAlert(message);
				}else{
					message.title = 'Oops!';
					message.text = 'We seem to be having some trouble. Please try again later.';
					if(modal.isOpen('signIn')){
						modal.close('signIn');
					}
					errorAlert(message);	
				}
			});
		};
		
		$scope.forgotPassword = function(type){
			var user = {};
			if(type==='admin'){
				user = $scope.user;
				user.type = 'admin';
			}else{
				user = $scope.user;
				user.type = 'client';	
			}
			$http.post('/auth/forgot', user).then(function(response) {
				var message = {};
				message.title = 'Info';
				message.text = 'A password reset link has been mailed to your email address.';
				if(type==='admin'){
					message._next = 'login._login';
				}else{
					message._next = 'login.login';
				}
				successAlert(message);
			}, function(response) {
				var message = {};
				if(response.status === 404){
					message.title = 'Error!';
					message.text = 'No account with this email address exists.';
					errorAlert(message);
				}else{
					message.title = 'Oops!';
					message.text = 'We seem to be having some trouble. Please try again later.';
					errorAlert(message);	
				}
			});
		};
		
		$scope.resetPassword = function(type){
			var user = {};
			if(type==='admin'){
				user = $scope.user;
				user.type = 'admin';
			}else{
				user = $scope.user;
				user.type = 'client';	
			}
			var token = $stateParams.token;
			$http.post('/auth/reset/'+token, user).then(function(response) {
				$auth.setToken(response.data.token);
				var message = {};
				message.title = 'Info';
				message.text = 'Password successfully updated.';
				message._next = 'app.dashboard';
				successAlert(message);
			}, function(response) {
				var message = {};
				if(response.status === 404){
					message.title = 'Error!';
					message.text = 'No account with this email address exists.';
					errorAlert(message);
				}else{
					message.title = 'Oops!';
					message.text = 'We seem to be having some trouble. Please try again later.';
					errorAlert(message);	
				}
			});
		};
		
		$scope.authenticate = function(provider){
			$auth.authenticate(provider).then(function(response) {
				$auth.setToken(response.data.token);
				$rootScope.user = $auth.getPayload();
				if(modal.isOpen('signUp')){
					modal.close('signUp');
				}
				if(modal.isOpen('signIn')){
					modal.close('signIn');
				}
				$state.go('services.home');
			})
			.catch(function(response) {
				var message = {};
				if(modal.isOpen('signUp')){
					modal.close('signUp');
				}
				if(modal.isOpen('signIn')){
					modal.close('signIn');
				}
				if(response.status === 409){
					message.title = 'Existing Account!';
					message.text = 'You are already logged in with this '+provider+' account';
					if(modal.isOpen('signIn')){
						modal.close('signIn');
					}
					errorAlert(message);
				}else{
					message.title = 'Oops!';
					message.text = 'We seem to be having some trouble. Please try again later.';
					if(modal.isOpen('signIn')){
						modal.close('signIn');
					}
					errorAlert(message);	
				}
			});	
		};
		
		$scope.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};
		
		$scope.signOut = function(){
			$auth.logout();
			$state.go('services.home');
		};	
}])