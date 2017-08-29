(function () {
    angular.module('messageApp')
        .factory('messageService', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {

            var service = {};

            service.getMessagesFromRest = function () {
                return $http.get("/rest/messages")
                    .then(function (response) {
                        return response.data;
                    }, function error(response) {
                        return response;
                    });
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
                    return response;
                });
            };

            service.updateMessage = function (message) {
                return $http({
                    method: 'PUT',
                    url: "/rest/messages",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializerJQLike(message)
                }).then(function success(response) {
                    return response;
                }, function error(response) {
                    return response;
                });
            };

            service.deleteMessage = function (message) {
                return $http.delete("/rest/messages/" + message.id)
                    .then(function success(response) {
                        return response;
                    }, function error(response) {
                        return response;
                    });
            };

            return service;
        }]);
})();