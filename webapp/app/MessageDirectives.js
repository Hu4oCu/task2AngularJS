angular.module('messageApp')
    .directive('modal', function () {
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