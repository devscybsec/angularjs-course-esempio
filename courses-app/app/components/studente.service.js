angular
	.module('studenteModule')
	.factory('studenteService', ['$http', function ($http) {
		var apiUrl = 'studente';
		var self = this;
		
		self.cleanDataInput = function(obj) {
			var splittedDate = obj.dataNascita.split('-');
			obj.dataNascitaRaw = new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1, splittedDate[0]);
			return obj;
		};
		self.cleanDataOutput = function(obj) {
			var day = obj.dataNascitaRaw.getDate();
			var month = obj.dataNascitaRaw.getMonth() + 1;
			var year = obj.dataNascitaRaw.getFullYear();
			
			obj.dataNascita = ((day < 10) ? '0' : '') + day + '-' + 
							  ((month < 10) ? '0' : '') + month + '-' + 
							  year;
			if(obj.corsi)
				for (var corso of obj.corsi)
					delete corso.professore['età'];
			
			delete obj['età'];
			delete obj.dataNascitaRaw;
			return obj;
		};
		
		self.studenti = [];
		self.defaultStudente = {
				id: 0,
				nome: '',
				cognome: '',
				dataNascita: '',
				corsi: []
			};
		self.selectedStudente = {
				id: 0,
				nome: '',
				cognome: '',
				dataNascita: '',
				dataNascitaRaw: null,
				corsi: []
			};
		
		self.all = function() {
			$http.get(apiUrl)
				.then(function(response) {
					self.studenti = [];
					if (response.data){
						self.studenti = response.data;
						for(var studente of self.studenti)
							studente = self.cleanDataInput(studente)
					}
				});
		};
		
		self.query = function (
				nome, 
				cognome,
				datanascita,
				anno,
				corsi,
				corsoNome,
				metodo) {
			var params = {};
			
			if(nome)
				params['nome'] = nome;
			if(cognome)
				params['cognome'] = cognome;
			if(datanascita)
				params['datanascita'] = datanascita;
			if(anno)
				params['anno'] = anno;
			if(corsi)
				params['corsi'] = corsi;
			if(corsoNome)
				params['corsoNome'] = corsoNome;
			if(metodo)
				params['metodo'] = metodo;
			
			return $http.get(apiUrl, { params: params })
				.then(function(response) {
					self.studenti = [];
					if (response.data)
						self.studenti = response.data;
					for(var studente of self.studenti)
						studente = self.cleanDataInput(studente)
				})
		};
		
		self.insert = function (studente) {
			$http.post(apiUrl, self.cleanDataOutput(studente))
				.then(function(response) {
					if (response.data)
						self.studenti.push(response.data);
				})
		};
		
		self.update = function (studente) {
			$http.put(apiUrl + '/' + studente.id, self.cleanDataOutput(studente))
				.then(function(response) {
					for (var i = 0; i < self.studenti.length; i++)
						if (self.studenti[i].id === studente.id) {
							self.studenti[i] = self.cleanDataInput(response.data);
							break;
						}
				})
		};
		
		self.delete = function (studente) {
			$http.delete(apiUrl + '/' + studente.id)
				.then(function(response) {
					for (var i = 0; i < self.studenti.length; i++)
						if (self.studenti[i].id === studente.id) {
							self.studenti.splice(i, 1);
							break;
						}
				})
		};
		
		self.all();
		return self;
	}]);