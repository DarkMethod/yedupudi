'use strict';
/** 
  * Factory for user authentication.
*/
app.factory('auth',['$http','$window','$state',function($http,$window,$state){
	var auth = {};
	auth.saveToken = function (token){
		$window.localStorage['token'] = token;
	};
	auth.getToken = function()
	{
		return $window.localStorage['token'];
	};
	
	auth.isLoggedIn = function(){
		var token = auth.getToken();
		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		}
		else{
			return false;
		}
	};
	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.uuid;
		}
	};
	
	auth.signUp = function(user){
		delete user.password2;
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};
	
	auth.signIn = function(user){
		return $http.post('/auth/local', user).success(function(data){
		auth.saveToken(data.token);
		});
	};
	
	auth.socialSignUp = function(provider){
		return $http.get('/auth/'+provider).success(function(data){
		auth.saveToken(data.token);
		});
	};
	
	auth.signOut = function(){
		$window.localStorage.removeItem('token');
		$state.go('login.signin');
	};
	
	return auth;
 }]);
