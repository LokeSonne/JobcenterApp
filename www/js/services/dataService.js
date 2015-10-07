
angular.module('jobcenterapp.services', [])
		.service('dataService', ['$http', '$q', 'Constants','$log', '$localForage', function dataService($http, $q, Constants, $log, $localForage) {
			// AngularJS will instantiate a singleton by calling "new" on this function
			var dataService = this;

			/**
			 * Register user
			 * @param model
			 * @returns {*}
			 */
			dataService.registerUser = function(model){
				var d = $q.defer();

				$http({
					method: 'POST',
					url: Constants.url + 'register',
					data: {
						"model": model
					}
				}).success(function (data, status, headers, config) {
					$localForage.setItem('user', model);
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in cancelAccount request');
					$log.debug(data);
					d.reject(data)
				});
				return d.promise
			};

			/**
			 * Get structure of app
			 * @returns {*}
			 */
			dataService.getStructure= function(){
				var d = $q.defer();

				$http({
					method: 'GET',
					url: Constants.url + '/app'
				}).success(function (data, status, headers, config) {
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in getting app structure', data);
					d.reject(data)
				});
				return d.promise

			};



		}]);