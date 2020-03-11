angular
	.module('studenteModule')
	.factory('corsoService', ['$http', function ($http) {
		var apiUrl = 'corso';
		var self = this;
		
		self.cleanDataInput = function(obj) {
			delete obj.studenti;
			return obj;
		};
		self.cleanDataOutput = function(obj) {
			return obj;
		};
		
		self.corsi = [];
		
		self.all = function() {
			$http.get(apiUrl)
				.then(function(response) {
					self.corsi = [];
					if (response.data){
						self.corsi = response.data;
						for(var corso of self.corsi)
							corso = self.cleanDataInput(corso);
					}
				});
		};
		
		self.insert = function (studente) {

		};
		
		self.update = function (studente) {

		};
		
		self.delete = function (studente) {

		};
		
		self.all();
		return self;
	}]);