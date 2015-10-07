angular.module('jobcenterapp.controllers', [])
		.controller('LoginController', ['$log', '$state', '$localForage', '$localForage' ,function LoginController($log, $state, $localForage, $localForage) {
			var Login = this;
			Login.model = {};

			//todo indsæt login kald til serveren her

			Login.register = function(model){
				dataService.registerUser(model)
						.then(function(){
							$state.go('main');
						})
			}
		}]);