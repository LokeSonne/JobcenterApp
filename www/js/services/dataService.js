
angular.module('jobcenterapp.services', [])
		.service('dataService', ['$http', '$q', 'Constants','$log', '$localForage', '$cordovaDevice','$ionicHistory', function dataService($http, $q, Constants, $log, $localForage, $cordovaDevice, $ionicHistory) {
			// AngularJS will instantiate a singleton by calling "new" on this function
			var dataService = this;

			/**
			 * Register user
			 * @param model
			 * @returns {*}
			 */
			dataService.registerUser = function(model){
				var d = $q.defer();

				//var params = {
//    firstName: fName,
//    lastName: lName,
//    email: eMail,
//    phone: iphone,
//    companyName : icompanyName,
//    companyPostalCode: icompanyPostalCode,
//    pno: ipno,
//    cvr: icvr,
//    workType: iworkType,
//    numberOfEmployees: inumberOfEmployees,
//    GUID: iGUID
//};

				$http({
					method: 'POST',
					url: Constants.url + 'api/User',
					timeout : 5000,
					data: {
	/*					firstName: model.firstName || '',
						lastName: model.lastName || '',
						email: model.email || '',
						phone: model.phone || '',
						companyName : model.companyName || '',
						companyPostalCode: model.companyAreacode || '',
						pno: model.Pnr || null,
						cvr: model.cvr || '',
						workType: 1,
						numberOfEmployees: parseInt(model.numberOfEmployees) || ''
				    //GUID: Userid?	*/
				    //
				    //
				    firstName: 'Matthias',
						lastName: 'Fuglsang',
						email: 'a@a.dk',
						phone: '12345678',
						companyName : 'Test',
						companyPostalCode: '1234',
						pno: '12345678',
						cvr: '12345678',
						workType: 1,
						numberOfEmployees: 1,
				    GUID: 'APFLGUkeFAUxsCc2t2g5aEJTPdavZNq8'
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
					timeout : 5000,
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
					timeout : 5000,
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

			/**
			 * Handle messages
			 * @returns {*}
			 */
			dataService.handleMessage= function(){
				var d = $q.defer();
				$http({
					method: 'GET',

					cache: false,
					params :  {
						Message_FK : Message_FK,
						Company_FK : Company_FK,
						WantedByCompany : WantedByCompany,
						ContactMethod_FK : ContactMethod_FK,
					},
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