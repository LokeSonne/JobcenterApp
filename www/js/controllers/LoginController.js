angular.module('jobcenterapp.controllers', [])
		.controller('LoginController', ['$log', '$state', '$localForage', '$ionicHistory', 'dataService', '$rootScope' ,function LoginController($log, $state, $localForage, $ionicHistory, dataService, $rootScope) {
			var Login = this;
			Login.model = {};

			// todo hvis kun hvis siden er i editmode
			$localForage.getItem('user').then(function(data) {
				Login.model = data
			});

			$localForage.getItem('guid').then(function(data) {
				Login.guid = data
			});

			Login.register = function(model){
				$rootScope.showLoader = true;
				if(Login.guid !== null){
					dataService.updateUser(model, Login.guid)
						.then(function(){
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							$state.go('main');
						},function(reason) {
							$rootScope.showLoader = false;
					});
				}
				else{
					dataService.registerUser(model)
						.then(function(){
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							$state.go('main');
						},function(reason) {
							$rootScope.showLoader = false;
						});
				}
			}
		}]);