var jobcenterapp = angular.module('jobcenterapp', [
  'ionic',
  'templates',
  'jobcenterapp.directives',
  'jobcenterapp.controllers',
  'jobcenterapp.services',
  'LocalForageModule',
  'ngRaven',
  'ngIOS9UIWebViewPatch'
  ])

.run(['$ionicPlatform', '$rootScope', function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$logProvider', 'Constants', '$httpProvider', '$ionicConfigProvider', '$ravenProvider' ,function($stateProvider, $urlRouterProvider, $compileProvider, $logProvider, Constants, $httpProvider, $ionicConfigProvider, $ravenProvider) {
  $compileProvider.debugInfoEnabled(Constants.development);
  $logProvider.debugEnabled(Constants.development);
  $ravenProvider.development(Constants.development);

  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

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

      .state('minside', {
        url: '/minside',
        templateUrl: 'views/minside.html'
      })
  ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/');

}]);

