angular.module('jobcenterapp.services')
		.factory('messageService', ['$http', '$q', 'Constants','$log', '$ionicPopup','$ionicHistory', function messageService($http, $q, Constants, $log, $ionicPopup, $ionicHistory) {
			// AngularJS will instantiate a singleton by calling "new" on this function
			var messageService = this;
			var alertPopup = '';

			function resetAlertPopup(){
				alertPopup = '';
			};

			return {
				// An alert dialog
				showAlert: function (obj) {
					alertPopup = '';
					if(!angular.isDefined(obj)){
						var obj = {
							title: "Der skete en fejl. Prøv igen",
							saveButton: true
						};
					}

					alertPopup = $ionicPopup.alert({
						cssClass: 'alert-popup',
						title: (obj.title ? obj.title : "No title"),
						buttons: [
							{
								text: 'Luk',
								type: 'button-positive'
							}
						]
					});
					alertPopup.then(function (res) {
						resetAlertPopup();
					});
				}
			}
		}]);