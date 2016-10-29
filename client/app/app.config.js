/* *
* Main app routes are here and in search.route.js
* */

(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('parent', {
        abstract: true,
        url: '/',
        templateUrl: '../trip.html',
        controller: 'ParentController as parent'
      })
      .state('parent.trip', {
        url: 'trip',
        views: {
          'activity': {
            templateUrl: './app/components/activities/activities.html',
            controller: 'ActivityController as vm',
            parent: 'parent'
          },
          'itinerary': {
            templateUrl: './app/components/itinerary/itinerary.html',
            controller: 'ItineraryController as vm',
            parent: 'parent'
          },
          'auth': {
            templateUrl: './app/common/auth/auth.html',
            controller: 'AuthController as vm',
            parent: 'parent'
          },
          'chats': {
            templateUrl: './app/components/chats/chats.html',
            controller: 'ChatsController',
            parent: 'activity'
          }
        }
      })
      .state('payment', {
        url: '/donate',
        templateUrl: './app/common/payment/payment.html',
        controller: 'PaymentController as vm'
      })

    $urlRouterProvider.otherwise('explore');
  }
})();
