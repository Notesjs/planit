(function() {
  'use strict';

  angular
    .module('app.payment')
    .factory('paymentService', paymentService);

  paymentService.$inject = ['$http', '$location', '$timeout'];

  function paymentService($http, $location, $timeout) {

    var service = {
      paymentInit : paymentInit
    };

    return service;

    function paymentInit() {
    var form = document.querySelector('#cardForm');
    $http({
      method: 'GET',
      url: '/api/payment/client_token'
    })
    .then((response) => {
      braintree.client.create({
        authorization: response.data
      }, function(err, clientInstance) {
        if (err) {
          console.error(err);
          return;
        }
        createHostedFields(clientInstance);
      })})
    .catch(function(err) {
      console.error(err);
    });

    function createHostedFields(clientInstance) {
      braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            'font-size': '16px',
            'font-family': 'courier, monospace',
            'font-weight': 'lighter',
            'color': '#ccc'
          },
          ':focus': {
            'color': 'black'
          },
          '.valid': {
            'color': '#8bdda8'
          }
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YYYY'
          },
          postalCode: {
            selector: '#postal-code',
            placeholder: '11111'
          }
        }
      }, function (err, hostedFieldsInstance) {
        form.addEventListener('submit', function (event) {
        event.preventDefault();
        var amount = document.getElementById('amount').value;

        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
          if (tokenizeErr) {
            // Handle error in Hosted Fields tokenization
            return;
          }
          $http.post('/api/payment/checkout', {
            amount : amount,
            payment_method_nonce : payload.nonce
          })
          .then(function (response) {
            $location.path('/explore')
            $timeout(function(){
              alert("Thank you for the $" + amount + " donation!");
            }, 1000)
          })
          .catch(function (error) {
            console.log(error);
          });
        });
      }, false);
      });
    }
  }
}})();
