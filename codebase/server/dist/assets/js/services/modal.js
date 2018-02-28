'use strict';
/** 
  * Factory for generating modals.
*/
app.factory('modal',['$uibModal', function($uibModal){
	var modal = {};
	modal.instance = {};
	
	modal.open = function(id, templateUrl, controller, scope){
		modal.instance[id] = $uibModal.open({
			templateUrl : templateUrl,
			controller 	: controller,
			scope: scope
		});
	};
	
	modal.close = function(id){
		modal.instance[id].close();
	};
	
	modal.isOpen = function(id){
		if(modal.instance[id]){
			if(modal.instance[id].opened)
				return true;
			else
				return false;
		}else{
			return false;
		}	
	};
		
	return modal;	
}])

