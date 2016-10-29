(function() {
  'use strict';

  angular
    .module('app.chats')
    .factory('chatsService', chatsService)
    chatsService.$inject = ['$http']

    function chatsService($http) {
      var service = {
        getFromDb: getFromDb
      }

      return service;

      function getFromDb(uuid){
        return $http({
          method: 'GET',
          url: '/api/chats',
          params: {
            uuid:uuid
          }
        })
        .then(function(messages){
          console.log("messages____!!!!", messages);
          return messages.data
        })
        .catch(function(err){
          console.log('err in getfromdb', err);
        })
      }
    }
})()
