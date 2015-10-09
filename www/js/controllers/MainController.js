angular.module('jobcenterapp.controllers')
		.controller('MainController', ['$log', '$localForage', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', 'appStructure' ,function MainController($log, $localForage, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, appStructure) {
			var Main = this;
			Main.model = {};
			Main.alert = '';

			Main.test = 'JobcenterTitel!';
			Main.testObject = {
				data1 : 'test1',
				data2 : 'test2'
			};

			$log.debug('app structure : ', appStructure);

			/**
			 *	Hide back button
			 */

			Main.goAndRegister = function(){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('tak')
			};


			Main.openQuestionaire = function(){
				$state.go('questionaire', {
					data : Main.testObject
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
							title: 'INDSÆT TEKST ', //todo Indsæt tekst
							template: 'INDSÆT MERE TEKST '
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


