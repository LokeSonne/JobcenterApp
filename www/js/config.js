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

.run(['$ionicPlatform', '$localForage', '$rootScope','$state', '$timeout', 'Constants', '$ionicHistory', function($ionicPlatform, $localForage, $rootScope, $state, $timeout, Constants, $ionicHistory) {

  $rootScope.showLoader = true;
  $rootScope.fromState;

  $ionicPlatform.ready(function() {
    /**
     * Clear localstorage on run. Usefull for debugging
     */
    if(Constants.development === true){
      $localForage.clear();
    }
    /**
     * Check if user is logged in. Redirect to main if true
     */
    $localForage.getItem('user').then(function(data) {
      if(data !== null && data.firstName){
        $state.go('main')
      }
      else{
        $state.go('intro')
      }
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableBack: true
      });
      $rootScope.showLoader = false;
    });

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

  $rootScope.$on('$stateChangeSuccess',function(ev, to, toParams, from, fromParams){
    $rootScope.showLoader = false;
    if(from.name === 'minside'){
      $rootScope.loginTitle  = 'Min profil';
    }
    else{
      $rootScope.loginTitle  = 'Login';
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$logProvider', 'Constants', '$httpProvider', '$ionicConfigProvider', '$ravenProvider', 'CacheFactoryProvider' ,function($stateProvider, $urlRouterProvider, $compileProvider, $logProvider, Constants, $httpProvider, $ionicConfigProvider, $ravenProvider, CacheFactoryProvider) {
  $compileProvider.debugInfoEnabled(Constants.development);
  $logProvider.debugEnabled(Constants.development);
  $ravenProvider.development(Constants.development);
  $ionicConfigProvider.backButton.text('');

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

  $httpProvider.useApplyAsync(true);
  $ionicConfigProvider.views.maxCache(10);
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
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}]);

