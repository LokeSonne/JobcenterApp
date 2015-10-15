angular.module('jobcenterapp.services')
		.service('messageService', ['$http', '$q', 'Constants','$log', '$localForage', '$cordovaDevice','$ionicHistory', function messageService($http, $q, Constants, $log, $localForage, $cordovaDevice, $ionicHistory) {
			// AngularJS will instantiate a singleton by calling "new" on this function
			var messageService = this;


		}]);