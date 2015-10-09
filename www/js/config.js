var jobcenterapp = angular.module('jobcenterapp', [
  'ionic',
  'templates',
  'jobcenterapp.directives',
  'jobcenterapp.controllers',
  'jobcenterapp.services',
  'LocalForageModule',
  'ngCordova',
  'ngRaven',
  'angular-cache',
  'ngIOS9UIWebViewPatch'
  ])

.run(['$ionicPlatform', '$localForage', '$rootScope','$state', function($ionicPlatform, $localForage, $rootScope, $state ) {


  $ionicPlatform.ready(function() {

    $localForage.clear();
    $localForage.getItem('user').then(function(data) {
      if(data !== null && data.firstName){
        $state.go('main')
      }
    });

    // Todo implement on run. Go to main view if user object is in localstorage

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart',function(){
    $rootScope.showLoader = true;
  });

  $rootScope.$on('$stateChangeSuccess',function(){
    $rootScope.showLoader= false;
  });
}])

.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$logProvider', 'Constants', '$httpProvider', '$ionicConfigProvider', '$ravenProvider', 'CacheFactoryProvider' ,function($stateProvider, $urlRouterProvider, $compileProvider, $logProvider, Constants, $httpProvider, $ionicConfigProvider, $ravenProvider, CacheFactoryProvider) {
  $compileProvider.debugInfoEnabled(Constants.development);
  $logProvider.debugEnabled(Constants.development);
  $ravenProvider.development(Constants.development);

  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

  $httpProvider.useApplyAsync(true);
  $ionicConfigProvider.views.maxCache(10);
  $ionicConfigProvider.views.swipeBackEnabled(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('intro', {
        url: '/',
        templateUrl: 'views/intro.html'
      })

      .state('login', {
        url: '/login',
        controller: 'LoginController as Login',
        templateUrl: 'views/login.html'
      })

      .state('hvorfor', {
        url: '/hvorfor',
        templateUrl: 'views/hvorfor.html'
      })

      .state('main', {
        url: '/main',
        resolve: {
          appStructure: function (dataService) {
            return dataService.getStructure();
          }
        },
        controller: 'MainController as Main',
        templateUrl: 'views/main.html'
      })

      .state('questionaire', {
        url: '/questionaire',
        params: {
          data: null
        },
        controller: 'QuestionaireController as Questionaire',
        templateUrl: 'views/questionaire.html'
      })

      .state('tak', {
        url: '/tak',
        templateUrl: 'views/tak.html'
      })


      .state('message', {
        url: '/message',
        params: {
          message: null
        },
        controller: 'MessageController as Message',
        templateUrl: 'views/message.html'
      })

      .state('minside', {
        url: '/minside',
        resolve: {
          news: function (dataService) {
            return dataService.getNews();
          }
        },
        controller: 'MyPageController as MyPage',
        templateUrl: 'views/minside.html'
      })
  ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/');

}]);

