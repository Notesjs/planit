(function() {
 'use strict';

 angular
    .module('app.activityList', ['ngMaterial', 'angular-jwt'])
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['$scope', '$state', 'activityService', '$mdDialog', '$http', '$window', 'jwtHelper','$location'];

  function ActivityController($scope, $state, activityService, $mdDialog, $http, $window, jwtHelper, $location) {
    var vm = this;
    const id = $location.search()
    vm.possibleActivities = [];
    vm.possibleExpedia = [];
    vm.getActivities = getActivities;
    vm.getSelectedActivity = getSelectedActivity;
    vm.getExpedia = getExpedia;
    vm.getSelectedExpediaActivity = getSelectedExpediaActivity;
    vm.uuid = id.uuid

    /* *
    * ActivityController listens for a change in ParentController's uuid value
    * and gets the possible activities from /api/activity and /api/activity/expedia for the trip with that uuid.
    *
    * It also sets selectedActivity and selectedExpediaActivity of the ParentController on user-click
    * in getSelectedActivity().
    * */

    $scope.$on('uuidChange', function(event, args) {
      console.log('args', args)
      vm.uuid = args.val;
      vm.getActivities(args.val);
      vm.getExpedia(args.val);
    });

    function getActivities(uuid) {
      console.log('getActivities', uuid)
      return activityService.getActivities(uuid)
        .then(function(data) {
          // format the address of each location for display
          data.forEach(function(entry) {
            var splitz = entry.address.split('');
            for (var i = 0; i < splitz.length; i++) {
              var temp = '';
              if (splitz[i] === '"' || splitz[i] === '{' || splitz[i] === '}') {
                splitz[i] = temp;
              } else if (splitz[i] === ',') {
                splitz[i] += ' ';
              }
            }
            splitz = splitz.join('');
            entry.address = splitz;
          });
          vm.possibleActivities = data;
        })
        .catch(function(err) {
          console.log('There was an error in getActivities: ', err);
        });
    }

    $scope.signin = function (userEmail, userPassword) {
      if (!userEmail || !userPassword) {
        return
      }

      $http.post("/api/auth/signin", {email: userEmail, password: userPassword})
        .then(function (res) {
          console.log('this: ', res);
          $window.localStorage.token = res.data.token;
          $window.localStorage.id = res.data.id;
          $window.localStorage.name = res.data.name;
        })
    }

    $scope.signup = function (userName, userEmail, userPassword) {
      if (!userName || !userEmail || !userPassword) {
        return
      }

      $http.post("/api/auth/signup", {name: userName, email: userEmail, password: userPassword})
        .then(function (res) {
          $window.localStorage.token = res.data.token;
          $window.localStorage.id = res.data.id;
          $window.localStorage.name = res.data.name;
        })
    }

    $scope.showTabDialog = function() {
      $mdDialog.show({
        controller: ActivityController,
        templateUrl: 'signup.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
    };

    function getSelectedActivity(activity) {
      // Check to see if local storage has token, if not--sign in modal

      if (!$window.localStorage.token) {
        $scope.showTabDialog()
      } else {
        try {
          var token = $window.localStorage.token;
          var decoded = jwtHelper.decodeToken(token);
          console.log("DECODED", decoded)
          var expired = jwtHelper.isTokenExpired(token);
          console.log("EXPIRED", expired)
        } catch(err) {
          console.log('err', err)
        }

        if (decoded) {
          $scope.$parent.selectedActivity = activity;
          vm.getActivities(vm.uuid);
        }
      }
    }

    function getExpedia(uuid) {
      return activityService.getExpedia(uuid)
        .then(function(data) {
          vm.possibleExpedia = data;
        })
        .catch(function(err) {
          console.log('err in getExpedia', err);
        });
    }

    function getSelectedExpediaActivity(activity) {
      $scope.$parent.selectedExpediaActivity = activity;
      vm.getExpedia(vm.uuid);
    }

    /* *
    * There is a setTimeout here because we need to retrieve the uuid value
    * before getting a trip's possible activities.
    * */

    setTimeout(function() {
      vm.getActivities(vm.uuid);
      vm.getExpedia(vm.uuid);
    }, 2000);
  }
})()
