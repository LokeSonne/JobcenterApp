angular.module('jobcenterapp.controllers')
		.controller('YesOrNoController', ['$log', '$ionicViewSwitcher', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams' ,function YesOrNoController($log, $ionicViewSwitcher, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams) {
			var YesOrNo = this;
			YesOrNo.model = {};

			$log.debug('stateparams er : ', $stateParams.data);
			/**
			 *	Hide back button
			 */

			YesOrNo.answer = function(answer){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicViewSwitcher.nextDirection('back');
				$log.debug('answer:', answer);
				$state.go('main')
			};


		}]);


