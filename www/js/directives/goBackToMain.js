angular.module('jobcenterapp.directives', [])
		.directive('goBackToMain', function(){
			return {
				bindToController: true,
				restrict: 'E',
				controllerAs: 'vm',
				controller: ['$log', '$ionicHistory', '$rootScope', '$state', '$ionicViewSwitcher', '$ionicViewService',function($log, $ionicHistory, $rootScope, $state, $ionicViewSwitcher, $ionicViewService){
					var vm = this;
					vm.goBackToMain = function () {
						$log.debug('go back to main');
						//$ionicViewService.nextViewOptions({
						//	disableBack: true
						//});
						$ionicViewSwitcher.nextDirection('back');
						$state.go('main');
					}
				}],
				template: '<a class="tab-item" ng-click="vm.goBackToMain()">\n  Tilbage til forsiden\n</a>'
			}
		});