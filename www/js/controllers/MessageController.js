angular.module('jobcenterapp.controllers')
		.controller('MessageController', ['$log', '$ionicViewSwitcher', '$ionicNavBarDelegate', '$ionicHistory', '$state', '$stateParams', 'dataService' ,function MessageController($log, $ionicViewSwitcher, $ionicNavBarDelegate, $ionicHistory, $state, $stateParams, dataService) {
			var Message = this;
			Message.model = {};

			Message.message = $stateParams.message;
			$log.debug('stateparams er : ', $stateParams.message);
			/**
			 *	Hide back button
			 */

			Message.answer = function(answer){
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicViewSwitcher.nextDirection('back');
				$log.debug('answer:', answer);
				//dataService.handleMessage(answer); //todo anwer objektet skal se ud som params i nedenstående
				$state.go('main')
			};


		}]);


//var Message_FK = "1"; // Det ved jeg ikke hvad er
//var Company_FK = "APFLGUkeFAUxsCc2t2g5aEJTPdavZNq8"; // GUID i login
//var WantedByCompany = "true"; //Hardcode til true
//var ContactMethod_FK = "2"; //Hardcode til 2 (email). 1 er telefon, 2 er email, 3 er brev.
//var params = {
//Message_FK : Message_FK,
//Company_FK : Company_FK,
//WantedByCompany : WantedByCompany,
//ContactMethod_FK : ContactMethod_FK,
//};

//$.ajax({
//    url: 'api/Message',
//    type: 'POST',
//    dataType: 'json',
//    data: params,
//    success: function (data) {
//        alert(data);
//    },
//    error: function () {
//        console.log('Error in Operation');
//    }
//});