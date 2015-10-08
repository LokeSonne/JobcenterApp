angular.module('jobcenterapp.directives', [])
		.directive('goBackToMain', function(){
			return {
				bindToController: true,
				restrict: 'E',
				controllerAs: 'vm',
				controller: ['$log', '$rootScope', '$state', '$ionicViewSwitcher', '$ionicHistory',function($log, $rootScope, $state, $ionicViewSwitcher, $ionicHistory){
					var vm = this;
					vm.goBackToMain = function () {
						$log.debug('go back to main');
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$ionicViewSwitcher.nextDirection('back');
						$state.go('main');
					}
				}],
				template: '<a class="button button-positive button-block" ng-click="vm.goBackToMain()">\n  Tilbage til forsiden\n</a>'
			}
		});