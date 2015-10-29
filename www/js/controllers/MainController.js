angular.module('jobcenterapp.controllers')
	.controller('MainController', ['$log', '$localForage', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', 'dataService', '$rootScope', '$ionicLoading', 'messageService' ,function MainController($log, $localForage, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, dataService, $rootScope, $ionicLoading, messageService) {
		var Main = this;
		Main.model = {};
		Main.alert = '';

		Main.init = function(){
			Main.status = 'Loading';
			$ionicLoading.show();
			$ionicHistory.clearHistory();
			$log.debug('initializing main menu');
			Main.navigation = [];
			Main.navigationTitles = [];
			dataService.getStructure().then(function(appStructure){
				$ionicLoading.hide();
				Main.status = 'FINISHED';
				if(angular.isArray(appStructure) && appStructure.length > 0){
					Main.navigation = appStructure;
					angular.forEach(appStructure, function(value, key) {
						Main.navigationTitles[key] = value.name
					});
				}
			}, function(reason) {
					Main.navigation = [];
					$ionicLoading.hide();
					Main.status = 'FINISHED';
					$log.debug('Error in getStructure');
			});
		};

		Main.init();

		/**
		 *	Hide back button
		 */
		Main.goAndRegister = function(){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('tak')
		};

		Main.openQuestionaire = function(index){
			$state.go('questionaire', {
				data : Main.navigation[index]
			})
		};

		/**
		 * Check if it is the first time the app runs
		 */
		checkFirstRun = function (){
			$log.debug('checkFirstRun');
			$localForage.getItem('firstRun').then(function(data) {
				if(data === null) {
					$localForage.setItem('firstRun', true);
					messageService.showAlert({
						title: 'Tak! <br> Du kan nu vælge et emne som du vil kontaktes om, eller se nyheder fra os på "Min side"',
						saveButton: true
					});
				}
				else{
					$log.debug('already showed intro screen');
					return false;
				}
			});
		}();
	}]);


