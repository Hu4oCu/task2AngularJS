(function () {
    angular.module('messageApp')
        .factory('messageService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {

            var service = {};

            service.getMessagesFromRest = function () {
                var messages = [];

                $http.get("/rest/messages")
                    .then(function (response) {
                        messages = response.data;
                    }, function error(response) {
                        console.log("Error: ", response.statusText);
                    });

                return messages;
            };

            service.getMessageById = function (id) {
                var message = {};

                $http.get("/rest/messages/" + id)
                    .then(function success(response) {
                        message = response.data;
                    }, function error(response) {
                        console.log("Error", response.statusText);
                    });

                return message;
            };

            service.addMessage = function (message) {
                return $http({
                    method: "POST",
                    url: "/rest/messages",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializerJQLike(message)
                }).then(function success(response) {
                    return response.data.id;
                }, function error(response) {
                    console.log("Error: ", response.statusText);
                });
            };

            service.updateMessage = function (message) {
                $http({
                    method: 'PUT',
                    url: "/rest/messages",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializerJQLike(message)
                }).then(function success() {
                    console.log("Message updated");
                }, function error(response) {
                    console.log("Error", response.statusText);
                });
            };

            service.deleteMessage = function (message) {
                $http.delete("/rest/messages/" + message.id)
                    .then(function success(response) {
                        if (response.statusText === "OK") {
                            console.log("Message deleted");
                        }
                    }, function error(response) {
                        console.log("Error: ", response.statusText);
                    });
            };

            return service;
        }]);
})();