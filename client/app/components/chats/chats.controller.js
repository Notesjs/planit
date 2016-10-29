angular.module('app.chats', [])
.controller('ChatsController', function ($scope, $window, chatsService) {

  var socket = io.connect($window.location.origin)
  $scope.messages = []
  $scope.getMessages = function(){
    chatsService.getFromDb()
    .then(function(data){
      $scope.messages = data;
      console.log('msg list', $scope.messages);
    })
  }
  $scope.sendMessage = function (){
    console.log('uuid', $window.localStorage.uuid);
    socket.emit('chat message', {name: $window.localStorage.name, message: $scope.value})
  }
  socket.on('chat message server', function(msg) {
    console.log('msg: ', msg);
    $scope.$apply(function(){
      $scope.messages.push(msg)
      console.log($scope.messages);
    })
  })
})
