var messageApp = angular.module('messageApp');

messageApp.directive('modal', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'views/modal.html',
        replace: true,
        link: function ($scope) {
            $scope.showModal = false;
            $scope.modalTitle = "";
            var index,
                updateModalType = false;

            $scope.closeModal = function () {
                $scope.showModal = false;
            };

            $scope.openUpdateMessageModal = function (message, $index) {
                $scope.showModal = true;
                $scope.modalTitle = "Update Message";
                updateModalType = true;
                index = $index;

                $scope.inputMessage = {};
                $scope.inputMessage.id = message.id;
                $scope.inputMessage.ru = message.ru;
                $scope.inputMessage.kz = message.kz;
                $scope.inputMessage.en = message.en;
            };

            $scope.openAddMessageModal = function () {
                $scope.showModal = true;
                $scope.modalTitle = "Add Message";
                updateModalType = false;

                $scope.inputMessage = {};
                $scope.inputMessage.ru = "";
                $scope.inputMessage.kz = "";
                $scope.inputMessage.en = "";
            };

            $scope.save = function (message) {
                if (updateModalType == true) {
                    $scope.updateMessage(message, index);
                } else {
                    $scope.addMessage(message);
                }
            };
        }
    };
});

// messageApp.directive('pagination', function () {
//         return {
//             replace: true,
//             templateUrl: '/views/pagination.html',
//             scope: {
//                 cur: '=',
//                 total: '=',
//                 display: '@',
//                 messages: '='
//             },
//             link: function (scope, element, attrs) {
//                 var calcPages = function () {
//                     var display = +scope.display;
//                     var delta = Math.floor(display / 2);
//                     scope.start = scope.cur - delta;
//                     if (scope.start < 1) {
//                         scope.start = 1;
//                     }
//                     scope.end = scope.start + display - 1;
//                     if (scope.end > scope.total) {
//                         scope.end = scope.total;
//                         scope.start = scope.end - (display - 1);
//                         if (scope.start < 1) {
//                             scope.start = 1;
//                         }
//                     }
//
//                     scope.pages = [];
//                     for (var i = scope.start; i <= scope.end; ++i) {
//                         scope.pages.push(i);
//                     }
//                 };
//                 scope.$watch('cur', calcPages);
//                 scope.$watch('total', calcPages);
//                 scope.$watch('display', calcPages);
//
//                 scope.isCurrent = function (index) {
//                     return scope.cur == index;
//                 };
//
//                 scope.setCurrent = function (index) {
//                     scope.cur = index;
//                 };
//
//                 scope.hasPrev = function () {
//                     return scope.cur > 1;
//                 };
//                 scope.prev = function () {
//                     if (scope.hasPrev()) scope.cur--;
//                 };
//
//                 scope.hasNext = function () {
//                     return scope.cur < scope.total;
//                 };
//                 scope.next = function () {
//                     if (scope.hasNext()) scope.cur++;
//                 };
//
//                 scope.firstPage = function () {
//                     return scope.start == 1;
//                 };
//                 scope.goToFirstPage = function () {
//                     if (!scope.firstPage()) scope.cur = 1;
//                 };
//                 scope.lastPage = function () {
//                     return scope.end == scope.total;
//                 };
//                 scope.goToLastPage = function () {
//                     if (!scope.lastPage()) scope.cur = scope.total;
//                 };
//             }
//         };
//     });