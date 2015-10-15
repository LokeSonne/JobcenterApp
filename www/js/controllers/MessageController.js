angular.module('jobcenterapp.controllers')
		.controller('MessageController', ['$log', '$ionicViewSwitcher', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', 'dataService', '$localForage' ,function MessageController($log, $ionicViewSwitcher, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, dataService, $localForage) {
			var Message = this;
			Message.model = {};

			Message.message = $stateParams.message;
			$log.debug('stateparams er : ', $stateParams.message);
			/**
			 *	Hide back button
			 */

			Message.answer = function(answer){
				$localForage.getItem('guid')
					.then(function(data){
					var companyId = data;
					dataService.handleMessage(answer, Message.message.id, companyId);
					if(answer === 'false') {
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$ionicViewSwitcher.nextDirection('back');
						$log.debug('answer:', answer);
						$state.go('main')
					}
					else{
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$log.debug('answer:', answer);
						$state.go('tak')
					}
				})
			};


		}]);
