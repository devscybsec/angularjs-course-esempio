angular
	.module('studenteModule')
	.component('studenteTable', {
		templateUrl: 'components/studente-table/studente-table.template.html',
		bindings: {
			studenti: '<'
		},
		controller: ['studenteService', function (studenteService) {
			var self = this;
			
			self.rowClick = function(studente) {
				if (studenteService.selectedStudente !== studente)
					studenteService.selectedStudente = studente;
			};
		}]
	});