angular.module('jobcenterapp.controllers', [])
		.controller('LoginController', ['$log', '$state', '$localForage', '$ionicHistory' ,function LoginController($log, $state, $localForage, $ionicHistory) {
			var Login = this;
			Login.model = {};

			$localForage.getItem('user').then(function(data) {
				Login.model = data
			});


				//todo indsæt login kald til serveren her

			Login.register = function(model){
				$localForage.setItem('user', model);
				//dataService.registerUser(model)
				//		.then(function(){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('main');
				//})
			}
		}]);