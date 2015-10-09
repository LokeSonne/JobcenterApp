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

//e.preventDefault();
//var fName = "Matthias";
//var lName = "Fuglsang";
//var eMail = "a@a.dk";
//var iphone = "12345678";
//var icompanyName = "Test";
//var icompanyPostalCode = "1234";
//var ipno = "12345678";
//var icvr = "12345678";
//var iworkType = 1;
//var inumberOfEmployees = 1;
//var iGUID = "APFLGUkeFAUxsCc2t2g5aEJTPdavZNq8"; //Udkommenter hvis /api/User testes
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

//$.ajax({
//    url: 'api/UserUpdate',
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


//$.ajax({
//    url: '/api/User',
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