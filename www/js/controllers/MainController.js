angular.module('jobcenterapp.controllers')
		.controller('MainController', ['$log', '$localForage', '$ionicPopup', '$ionicNavBarDelegate' ,function MainController($log, $localForage, $ionicPopup, $ionicNavBarDelegate) {
			var Main = this;
			Main.model = {};
			Main.alert = '';
			var checkFirstRun;

			Main.test = 'Jobcentertets';

			//Hide back button
			$ionicNavBarDelegate.showBackButton(false);


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


