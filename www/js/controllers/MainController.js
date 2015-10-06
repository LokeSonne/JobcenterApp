angular.module('jobcenterapp.controllers')
		.controller('MainController', ['$log', '$localForage', '$ionicPopup' ,function MainController($log, $localForage, $ionicPopup) {
			var Main = this;
			Main.model = {};
			Main.alert = '';
			var checkFirstRun;

			checkFirstRun = function (){
				$localForage.getItem('firstRun').then(function(data) {
					if(data === null) {
						$localForage.setItem('firstRun', true);
						Main.alert = $ionicPopup.alert({
							title: 'INDSÆT TEKST ', //todo Indsæt tekst
							template: 'INDSÆT MERE TEKST '
						});
						alertPopup.then(function (res) {
							Main.alert = ''
						});
						Main.alert.show();
					}
					else{
						$log.debug('already showed intro screen');
						return false;
					}
				});
			};
			checkFirstRun();

	}]);


