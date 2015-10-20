angular.module('jobcenterapp.controllers')
		.controller('MainController', ['$log', '$localForage', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', 'dataService' ,function MainController($log, $localForage, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, dataService) {
			var Main = this;
			Main.model = {};
			Main.alert = '';
			Main.navigation = [];
			Main.navigationTitles = [];

			Main.init = function(){
				$log.debug('initializing main menu');
				Main.navigation = [];
				Main.navigationTitles = [];
				dataService.getStructure().then(function(appStructure){
					if(angular.isArray(appStructure) && appStructure.length > 0){
						Main.navigation = appStructure;
						angular.forEach(appStructure, function(value, key) {
							Main.navigationTitles[key] = value.name
						});
					}
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
						Main.alert = $ionicPopup.alert({
							title: 'Tak! <br> Du kan nu vælge et emne som du vil kontaktes om, eller se nyheder fra os på ”Min side”'
						});
						Main.alert.then(function (res) {
							Main.alert = null;
						});
					}
					else{
						$log.debug('already showed intro screen');
						return false;
					}
				});
			}();

		}]);


