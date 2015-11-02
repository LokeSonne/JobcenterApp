angular.module('jobcenterapp.controllers')
		.controller('QuestionaireController', ['$log', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', '$localForage', 'dataService' ,function QuestionaireController($log, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, $localForage, dataService) {
			var Questionaire = this;
			Questionaire.page = $stateParams.data;
			Questionaire.selected;

			$log.debug($stateParams.data);
			/**
			 *	Hide back button
			 */

			Questionaire.goAndRegister = function(answer){
				$localForage.getItem('guid')
						.then(function(data) {
							var companyId = data;
							dataService.handleMessage(answer, Questionaire.page.id, companyId)
									.then(function () {
										$ionicHistory.nextViewOptions({
											disableBack: true
										});
										$state.go('tak');
									})
						});
			};

		}]);


