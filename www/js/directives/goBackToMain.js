angular.module('jobcenterapp.directives', [])
		.directive('goBackToMain', function(){
			return {
				bindToController: true,
				restrict: 'E',
				controllerAs: 'vm',
				controller: ['$log', '$ionicHistory',function($log, $ionicHistory){
					var vm = this;

					vm.goBackToMain = function () {
						$log.debug('go back to main');
						$ionicHistory.goBack(-2);
					}

				}],
				template: '<a class="tab-item" ng-click="vm.goBackToMain()">\n  Tilbage til forsiden\n</a>'
			}
		});