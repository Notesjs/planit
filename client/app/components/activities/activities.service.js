(function() {
  'use strict';

  angular
    .module('app.activityList')
    .factory('activityService', activityService);

    activityService.$inject = ['$http'];

    function activityService($http) {
      var service = {
        getActivities: getActivities,
        getExpedia: getExpedia
      };

      return service;

      ///////////////

      function getActivities(uuid) {
        console.log("uuid", uuid)
        return $http({
          method: 'GET',
          url: '/api/activity',
          params: { uuid: uuid }
        })
        .then(function(res) {
          return res.data;
        })
        .catch(function(err) {
          return err;
        });
      }

      function getExpedia(uuid) {
        return $http({
          method: 'GET',
          url: '/api/activity/expedia',
          params: { uuid: uuid }
        })
        .then(function(res) {
          return res.data;
        })
        .catch(function(err) {
          return err;
        });
      }
    }
})();
