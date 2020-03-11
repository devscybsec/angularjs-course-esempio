angular
	.module('studenteModule')
	.component('studenteForm', {
		templateUrl: 'components/studente-form/studente-form.template.html',
		bindings: {
			studente: '<'
		},
		controller: [ 'studenteService', 'corsoService', function (studenteService, corsoService) {
			var self = this;
			self.corsoService = corsoService;
			
			self.addCorsiClick = function(corso) {
				var found = false;
				if (corso) {
					for (var corso_lista of self.studente.corsi)
						if(corso_lista.id === corso.id) {
							found = true;
							break;
						}
				}
				if(!self.studente.corsi)
					self.studente.corsi = [];
				if(!found)
					self.studente.corsi.push(corso);
			};
			
			self.removeCorsiClick = function(corso) {
				if (corso) {
					for (var i =0; i <  self.studente.corsi.length; i++)
						if(self.studente.corsi[i].id === corso.id) {
							self.studente.corsi.splice(i, 1);
							break;
						}
				}
			};

			self.saveClick = function() {
				if (self.studente.id === 0) {
					studenteService.insert(angular.copy(self.studente));
					studenteService.all();
				} else {
					studenteService.update(angular.copy(self.studente));
				}
				self.resetClick();
			};
			
			self.resetClick = function() {
				self.studente = {
					id: 0,
					nome: '',
					cognome: '',
					dataNascita: '',
					dataNascitaRaw: null
				};
			};
		}]
	});