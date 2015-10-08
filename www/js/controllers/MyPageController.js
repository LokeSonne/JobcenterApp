angular.module('jobcenterapp.controllers')
		.controller('MyPageController', ['$log', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams' ,function MyPageController($log, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams) {
			var MyPage = this;
			MyPage.model = {};

			$log.debug($stateParams.data);
			/**
			 *	Hide back button
			 */

			MyPage.goToMessage = function(){
				$state.go('yesorno')
			}

		}]);


