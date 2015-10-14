angular.module('jobcenterapp.controllers')
		.controller('MyPageController', ['$log', '$ionicPopup', '$ionicNavBarDelegate', '$ionicHistory', '$state', 'news' ,function MyPageController($log, $ionicPopup, $ionicNavBarDelegate, $ionicHistory, $state, news) {
			var MyPage = this;
			MyPage.model = {};
			MyPage.news = news;

			$log.debug('news : ', news);
			/**
			 *	Hide back button
			 */

			MyPage.goToMessage = function(id){
				$state.go('message', {
					message : MyPage.news[id]
				})
			}

		}]);


