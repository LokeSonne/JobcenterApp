angular.module('jobcenterapp.controllers', [])
		.controller('LoginController', ['$log', '$state', '$localForage', '$ionicHistory', 'dataService' ,function LoginController($log, $state, $localForage, $ionicHistory, dataService) {
			var Login = this;
			Login.model = {};


			// If edit
			$localForage.getItem('user').then(function(data) {
				Login.model = data
			});


			Login.register = function(model){
				$localForage.setItem('user', model);
				dataService.registerUser(model)
					.then(function(){
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$state.go('main');
					})
			}
		}]);