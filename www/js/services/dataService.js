
angular.module('jobcenterapp.services', [])
		.service('dataService', ['$http', '$q', 'Constants','$log', '$localForage', '$cordovaDevice', function dataService($http, $q, Constants, $log, $localForage, $cordovaDevice) {
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
					url: Constants.url + 'api/User',
					data: {
						firstName: model.firstName || '',
				    lastName: model.lastName || '',
				    email: model.email || '',
				    phone: model.phone || '',
				    companyName : model.companyName || '',
				    companyPostalCode: model.companyAreacode || '',
				    pno: model.Pnr || '',
				    cvr: model.cvr || '',
				    workType: 1,
				    numberOfEmployees: model.numberOfEmployees || '',
				    GUID: $cordovaDevice.getUUID()
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
			dataService.getStructure = function(){
				var d = $q.defer();
				$http({
					method: 'GET',
					cache: true,
					url: Constants.url + 'api/Message'
				}).success(function (data, status, headers, config) {
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in getting app structure', data);
					d.reject(data)
				});
				return d.promise

			};


			/**
			 * Get structure of app
			 * @returns {*}
			 */
			dataService.getNews= function(){
				var d = $q.defer();
				$http({
					method: 'GET',
					cache: false,
					url: Constants.url + 'api/News/'
				}).success(function (data, status, headers, config) {
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in getting app structure', data);
					d.reject(data)
				});
				return d.promise

			};
		}]);