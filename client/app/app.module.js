/* *
* The main app module contains ParentController.
* ParentController has children app.auth, app.activityList and app.itinerary.
* app.search is solo.
* */

(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ui.bootstrap',
      'app.auth',
      'app.search',
      'app.activityList',
      'app.chats',
      'app.itinerary',
      'ngMaterial',
      'angular-jwt',
      'app.payment',
      'app.flight',
      'ngRoute'
    ]);
})();
