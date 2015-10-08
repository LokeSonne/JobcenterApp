angular.module('jobcenterapp.controllers')
		.controller('QuestionaireController', ['$log', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams' ,function QuestionaireController($log, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams) {
			var Questionaire = this;
			Questionaire.model = {};

			$log.debug($stateParams.data);
			/**
			 *	Hide back button
			 */

			Questionaire.goAndRegister = function(){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('tak')
			};

		}]);


