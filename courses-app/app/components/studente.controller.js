angular
	.module('studenteModule')
	.controller('studenteController', [ '$scope', 'studenteService', function($scope, studenteService) {
		
		$scope.service = studenteService;
		
	}]);