var messageApp = angular.module('messageApp', []);

messageApp.controller('messageCtrl', ['$scope', '$http','messageService', 'pagination',
    function ($scope, $http, messageService, pagination) {

        $scope.messages = $http.get("/rest/messages")
            .then(function (response) {
                pagination.setMessages(response.data);

                $scope.messages = pagination.getCurrentPageMessages();
                $scope.paginationList = pagination.getDynamicPaginationList();
            });

        $scope.currentPage = function () {
            return pagination.getCurrentPageNum();
        };

        $scope.showPage = function (page) {
            $scope.paginationList = pagination.getDynamicPaginationList(page);
            $scope.messages = pagination.getCurrentPageMessages(page);
        };

        $scope.previousPage = function () {
            if ($scope.currentPage() > 0 ) {
                $scope.paginationList = pagination.getDynamicPaginationList($scope.currentPage());
                $scope.messages = pagination.getPreviousPage();
            }
        };

        $scope.totalPagesNum = function () {
            return pagination.getTotalPagesNum() - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage() < pagination.getTotalPagesNum() - 1) {
                $scope.paginationList = pagination.getDynamicPaginationList($scope.currentPage());
                $scope.messages = pagination.getNextPage();
            }
        };

        $scope.deleteMessage = function(message, $index) {
            $scope.messages.splice($index, 1);
            messageService.deleteMessage(message);
            pagination.deleteMessage(message);
            if ($scope.currentPage() > $scope.totalPagesNum()) {
                $scope.paginationList = pagination.getDynamicPaginationList();
                $scope.messages = pagination.getCurrentPageMessages();
            }
        };

        $scope.updateMessage = function (message, index) {
            if (message.ru.length > 0 && message.kz.length > 0 && message.en.length > 0) {
                $scope.showModal = false;

                $scope.inputMessage = {};
                $scope.messages[index].ru = message.ru;
                $scope.messages[index].kz = message.kz;
                $scope.messages[index].en = message.en;

                messageService.updateMessage(message, index);
            } else {
                window.alert("Empty values not allowed!");
            }
        };

        $scope.addMessage = function (message) {
            if (message.ru.length > 0 && message.kz.length > 0 && message.en.length > 0) {
                $scope.showModal = false;

                messageService.addMessage(message).then(function success(response) {
                    message.id = response;

                    pagination.addMessage(message);

                    if ($scope.paginationList.length < $scope.totalPagesNum()) {
                        $scope.paginationList = pagination.getDynamicPaginationList();
                        $scope.messages = pagination.getCurrentPageMessages();
                    }
                });

            } else {
                window.alert("Empty values not allowed!");
            }
        };
    }]);