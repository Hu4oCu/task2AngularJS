angular.module('messageApp', [])
    .controller('messageCtrl', ['$scope', '$http','messageService', 'pagination',
    function ($scope, $http, messageService, pagination) {

        $scope.paginationList = [{name: 1, link: 0}];

        $scope.messages = messageService.getMessagesFromRest()
            .then(function (response) {
                pagination.setMessages(response);

                $scope.messages = pagination.getCurrentPageMessages();
                $scope.paginationList = pagination.getPaginationList();
            });

        $scope.currentPage = function () {
            return pagination.getCurrentPageNum();
        };

        $scope.totalPagesNum = function () {
            return pagination.getTotalPagesNum() - 1;
        };

        $scope.showPage = function (page) {
            if ($scope.currentPage() !== page) {
                $scope.paginationList = pagination.getPaginationList(page);
                $scope.messages = pagination.getCurrentPageMessages(page);
            }
        };

        $scope.goToFirstPage = function () {
            $scope.showPage(0);
        };

        $scope.goToLastPage = function () {
            $scope.showPage(pagination.getTotalPagesNum() - 1);
        };

        $scope.previousPage = function () {
            if ($scope.currentPage() > 0 ) {
                $scope.paginationList = pagination.getPaginationList($scope.currentPage());
                $scope.messages = pagination.getPreviousPage();
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage() < pagination.getTotalPagesNum() - 1) {
                $scope.paginationList = pagination.getPaginationList($scope.currentPage());
                $scope.messages = pagination.getNextPage();
            }
        };

        $scope.deleteMessage = function(message, $index) {
            messageService.deleteMessage(message).then(function success() {
                var curPage = $scope.currentPage();

                $scope.messages.splice($index, 1);
                pagination.deleteMessage(message);

                if (curPage > $scope.totalPagesNum()) {
                    $scope.paginationList = pagination.getPaginationList(curPage - 1);
                    $scope.messages = pagination.getCurrentPageMessages(curPage - 1);
                }
            }, function error(response) {
                console.log("Error: ", response.statusText);
            });

        };

        $scope.updateMessage = function (message, index) {
            if (message.ru.length > 0 && message.kz.length > 0 && message.en.length > 0) {
                $scope.showModal = false;

                messageService.updateMessage(message, index).then(function success() {
                    $scope.inputMessage = {};
                    $scope.messages[index].ru = message.ru;
                    $scope.messages[index].kz = message.kz;
                    $scope.messages[index].en = message.en;
                }, function error(response) {
                    console.log("Error: ", response.statusText);
                });
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

                    if ($scope.paginationList.length <= $scope.totalPagesNum()) {
                        $scope.paginationList = pagination.getPaginationList($scope.currentPage());
                    }
                }, function error(response) {
                    console.log("Error: ", response.statusText)
                });

            } else {
                window.alert("Empty values not allowed!");
            }
        };
    }]);