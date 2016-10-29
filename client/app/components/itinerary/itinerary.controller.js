(function() {
  'use strict';

  angular
    .module('app.itinerary')
    .controller('ItineraryController', ItineraryController);

  ItineraryController.$inject = ['$scope', '$state', 'itineraryService','$location'];

  function ItineraryController($scope, $state, itineraryService, $location) {
    var vm = this;
    const id = $location.search()
    console.log('id',id)
    vm.savedActivities = [];
    vm.savedExpediaActivities = [];
    vm.getSavedActivities = getSavedActivities;
    vm.postSavedActivity = postSavedActivity;
    vm.getSavedExpediaActivities = getSavedExpediaActivities;
    vm.postSavedExpediaActivity = postSavedExpediaActivity;
    vm.uuid = id.uuid

    /* *
    * ItineraryController
    *   - listens for a change in ParentController's uuid and selectedActivity values
    *   - gets the saved activities from /api/itinerary and /api/itinerary/expedia for the trip with that uuid
    *   - deletes the selectedActivity from possibleActivities and possibleExpedia tables
    * */

    $scope.$on('uuidChange', function(event, args) {
      // vm.uuid = vm.uuid;
      vm.getSavedActivities(vm.uuid);
    });
//
    $scope.$on('selectedActivityChange', function(event, args) {
      vm.postSavedActivity(vm.uuid);
      vm.getSavedActivities(vm.uuid);
    });

    $scope.$on('selectedExpediaActivityChange', function(event, args) {
      vm.postSavedExpediaActivity(vm.uuid);
      vm.getSavedExpediaActivities(vm.uuid);
    });

    function getSavedActivities(uuid) {
      return itineraryService.getSavedActivities(uuid)
        .then(function(data) {
          vm.savedActivities = data;
        })
        .catch(function(err) {
          console.log('err in getSavedActivities', err);
        });
    }

    function postSavedActivity(activity) {
      return itineraryService.postSavedActivity(activity)
        .then(function(data) {
        })
        .catch(function(err) {
          console.log('err in postSavedActivity', err);
        });
    }

    function getSavedExpediaActivities(uuid) {
      return itineraryService.getSavedExpediaActivities(uuid)
        .then(function(data) {
          vm.savedExpediaActivities = data;
        })
        .catch(function(err) {
          console.log('err in getSavedActivities', err);
        });
    }

    function postSavedExpediaActivity(activity) {
      return itineraryService.postSavedExpediaActivity(activity)
        .then(function(data) {
        })
        .catch(function(err) {
          console.log('err in postSavedActivity', err);
        });
    }

    /* *
    * There is a setTimeout here because we need to retrieve the uuid value
    * before getting a trip's saved activities.
    * */

    setTimeout(function() {
      vm.getSavedActivities(vm.uuid);
      vm.getSavedExpediaActivities(vm.uuid);
    }, 1500);
  }
})();
