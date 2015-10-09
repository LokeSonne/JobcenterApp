angular.module('jobcenterapp.controllers')
		.controller('MessageController', ['$log', '$ionicViewSwitcher', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams' ,function MessageController($log, $ionicViewSwitcher, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams) {
			var Message = this;
			Message.model = {};

			Message.message = $stateParams.message;
			$log.debug('stateparams er : ', $stateParams.message);
			/**
			 *	Hide back button
			 */

			Message.answer = function(answer){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicViewSwitcher.nextDirection('back');
				$log.debug('answer:', answer);
				$state.go('main')
			};


		}]);


