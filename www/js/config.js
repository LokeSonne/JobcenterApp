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

.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$logProvider', 'Constants', '$httpProvider', '$ionicConfigProvider', '$ravenProvider', 'CacheFactoryProvider', '$localForageProvider' ,function($stateProvider, $urlRouterProvider, $compileProvider, $logProvider, Constants, $httpProvider, $ionicConfigProvider, $ravenProvider, CacheFactoryProvider, $localForageProvider) {
  $compileProvider.debugInfoEnabled(Constants.development);
  $logProvider.debugEnabled(Constants.development);
  $ravenProvider.development(Constants.development);
  $ionicConfigProvider.backButton.text('');


  $localForageProvider.config({
    driver      : localforage.LOCALSTORAGE, // Force LOCALSTORAGE; same as using setDriver()
    name        : 'jobcenter',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
  });

  /**
   * Deaktiver javascript scrolling på android
   */
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }

  /**
   * caching variabel. Cacher http response i 15 minutter,
   * dvs for hver gang appen bruges tilgåes hvert endpoint kun en gang
   */
  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  $ionicConfigProvider.views.maxCache(10);
  $httpProvider.useApplyAsync(true);
  $ionicConfigProvider.views.swipeBackEnabled(false);

  $stateProvider
    .state('intro', {
      url: '/',
      templateUrl: 'views/intro.html'
    })

    .state('login', {
      url: '/login',
      cache: false,
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
      cache: false,
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
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}])

.run(['$ionicPlatform', '$localForage', '$rootScope','$state', '$timeout', 'Constants', '$ionicHistory', '$log', '$ionicLoading', '$cordovaKeyboard', function($ionicPlatform, $localForage, $rootScope, $state, $timeout, Constants, $ionicHistory, $log, $ionicLoading, $cordovaKeyboard) {

  $rootScope.fromState;
  $ionicLoading.show();

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      $log.debug('disabling scroll and keyboard accessory bar');
      $cordovaKeyboard.disableScroll(true);
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    /**
     * Check if user is logged in. Redirect to main if true
     */
    if(window.localStorage.getItem('jobcenter/guid') !== null && window.localStorage.getItem('jobcenter/user') !== null) {
      $log.debug('jobcenter/guid is present. Going to main');
      $state.transitionTo('main')
    }
    else if(window.localStorage.getItem('jobcenter/guid') === null && window.localStorage.getItem('jobcenter/user') === null){
      $log.debug('jobcenter/guid is not present. Going to intro');
      $state.transitionTo('intro')
    }
    else{
     $log.debug('something went wrong. Guid is' + window.localStorage.getItem('jobcenter/guid') + ' and user is : ' + window.localStorage.getItem('jobcenter/user'));
    }
    $ionicLoading.hide();

  });

  $rootScope.$on('$stateChangeStart',function(){
    $ionicLoading.show();
  });

  $rootScope.$on('$stateChangeSuccess',function(ev, to, toParams, from, fromParams){
    $ionicLoading.hide();
    if(from.name === 'minside'){
      $rootScope.loginTitle  = 'Min profil';
    }
    else{
      $rootScope.loginTitle  = 'Login';
    }

    $log.debug('Coming from ' + from.name);
    if(from.name==='intro'){
      $rootScope.showBackButton = false;
    }

    else{
      $rootScope.showBackButton = true;
    }
  });
}]);

