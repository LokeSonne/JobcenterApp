
angular.module('jobcenterapp.services', [])
		.service('dataService', ['$http', '$q', 'Constants','$log', '$localForage', '$cordovaDevice','$ionicHistory', 'messageService', '$raven', function dataService($http, $q, Constants, $log, $localForage, $cordovaDevice, $ionicHistory, messageService,$raven) {
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
					timeout : 5000,
					data: {
						firstName: model.firstName || '',
						lastName: model.lastName || '',
						email: model.email || '',
						phone: model.phone || '',
						companyName : model.companyName || '',
						companyPostalCode: model.companyAreacode || '',
						pno: model.Pnr || '',
						cvr: model.cvr || '',
						workType: 999999,
						numberOfEmployees: parseInt(model.numberOfEmployees) || ''
					}
				}).success(function (data, status, headers, config) {
					$localForage.setItem('user', model);
					$localForage.setItem('guid', data);
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug(data);
					d.reject(data);
					$raven.captureMessage('Error in registerUser : ' + JSON.stringify(data)  +' and posted data/model is: ' + JSON.stringify(model));

					messageService.showAlert();
				});
				return d.promise
			};

			/**
			 * Update user
			 * @param model, guid
			 * @returns {*}
			 */

			dataService.updateUser = function(model, guid){
				var d = $q.defer();

				$http({
					method: 'POST',
					url: Constants.url + 'api/UserUpdate',
					timeout : 5000,
					data: {
						firstName: model.firstName || '',
						lastName: model.lastName || '',
						email: model.email || '',
						phone: model.phone || '',
						companyName : model.companyName || '',
						companyPostalCode: model.companyAreacode || '',
						pno: model.Pnr || '',
						cvr: model.cvr || '',
						workType: 999999,
						numberOfEmployees: parseInt(model.numberOfEmployees) || '',
						GUID : guid
					}
				}).success(function (data, status, headers, config) {
					$localForage.setItem('user', model);
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug(data);
					d.reject(data);
					$raven.captureMessage('Error in updateUser : ' + JSON.stringify(data)  +', posted data/model is: ' + JSON.stringify(model) + ' and guid is : ' + JSON.stringify(guid));

					messageService.showAlert();
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
					timeout : 10000,
					cache: true,
					url: Constants.url + 'api/Message'
				}).success(function (data, status, headers, config) {
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in getting app structure' + JSON.stringify(data));
					$raven.captureMessage('Error in getStructure : ' + JSON.stringify(data));
					d.reject(data);
					messageService.showAlert();
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
					timeout : 5000,
					cache: false,
					url: Constants.url + 'api/News/'
				}).success(function (data, status, headers, config) {
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$log.debug('error in getting app structure', JSON.stringify(data));
					d.reject(data);
					$raven.captureMessage('Error in getNews : ' + JSON.stringify(data));
					messageService.showAlert();
				});
				return d.promise
			};

			/**
			 * Handle messages
			 * @returns {*}
			 */
			dataService.handleMessage= function(answer, id, guid){
				var d = $q.defer();

				$http({
					method: 'POST',
					cache: false,
					data :  {
						Message_FK : String(id),
						Company_FK : guid,
						WantedByCompany : answer,
						ContactMethod_FK : 1
					},
					url: Constants.url + 'api/Message/'
				}).success(function (data, status, headers, config) {
					$log.debug('sucess in handleMessage', data);
					d.resolve(data);
				}).error(function (data, status, headers, config) {
					$raven.captureMessage('Error in handleMessage : ' + JSON.stringify(data));
					$log.debug('error handling message', JSON.stringify(data));
					messageService.showAlert();
					d.reject(data)
				});
				return d.promise
			};

		}]);