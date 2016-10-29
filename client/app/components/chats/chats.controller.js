angular.module('app.chats', [])
.controller('ChatsController', function ($scope, $window, $location, chatsService) {

  var socket = io.connect($window.location.origin)
  var uuid = $window.location.hash.slice(12)
  $scope.messages = []
  $scope.getMessages = function(){
    console.log('uuid var', uuid);
    chatsService.getFromDb(uuid)
    .then(function(data){
      $scope.messages = data;
      console.log('msg list', $scope.messages);
    })
  }
  $scope.sendMessage = function (){
    console.log('uuid', $location.search().uuid);
    socket.emit('chat message', {name: $window.localStorage.name, message: $scope.value, uuid: uuid})
    $scope.value = ''
  }
  socket.on('chat message server', function(msg) {
    console.log('msg: ', msg);
    $scope.$apply(function(){
      $scope.messages.push(msg)
      console.log($scope.messages);
    })
  })
})
