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

      function getFromDb(){
        console.log('inside getfromdb');
        return $http.get('/api/chats')
        .then(function(messages){
          console.log('inside .then client', messages.data);
          return messages.data
        })
        .catch(function(err){
          console.log('err in getfromdb', err);
        })
      }
    }
})()
