var messageApp = angular.module('messageApp');

messageApp.factory('pagination', [function () {
    var currentPage = 0,
        itemsPerPage = 15,
        messages = [];

    return {
        setMessages: function (newMessages) {
            messages = newMessages;
        },

        deleteMessage: function (message) {
            var index;

            index = messages.indexOf(message);

            if (index > -1) {
                messages.splice(index, 1);
            }
        },

        addMessage: function (message) {
            messages.push(message);
            messages.sort(function compare(a, b) {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
        },

        getTotalPagesNum: function () {
            return Math.ceil(messages.length / itemsPerPage);
        },

        getCurrentPageNum: function () {
            return currentPage;
        },

        getCurrentPageMessages: function (num) {
            var pageNum = angular.isUndefined(num) ? 0 : num,
                first = itemsPerPage * pageNum,
                last = first + itemsPerPage;

            currentPage = pageNum;
            last = last > messages.length ? messages.length : last;

            return messages.slice(first, last);
        },

        getPaginationList: function (page) {
            var dynamicPaginationList = [],
                maxPaginationList = 8,
                delta = Math.floor(maxPaginationList / 2),
                curPage = angular.isUndefined(page) ? 0 : page,
                start = curPage - delta,
                end = start + maxPaginationList,
                totalPagesNum = this.getTotalPagesNum() - 1;


            if (start < 0) {
                start = 0;
                end = maxPaginationList;
            } else if (end > totalPagesNum) {
                end = totalPagesNum;
                start = end - maxPaginationList;
            }

            for (var i = start; i <= end; i++) {
                var name = i + 1;
                dynamicPaginationList.push({
                    name: name,
                    link: i
                });
            }

            return dynamicPaginationList;
        },

        getPreviousPage: function () {
            var prevPageNum = currentPage - 1;

            if (prevPageNum < 0) {
                prevPageNum = 0;
                currentPage = prevPageNum;
            }

            return this.getCurrentPageMessages(prevPageNum);
        },

        getNextPage: function () {
            var nextPageNum = currentPage + 1,
                totalPagesNum = this.getTotalPagesNum() - 1;

            if (nextPageNum < totalPagesNum) {
                currentPage = nextPageNum;
            } else {
                nextPageNum = totalPagesNum;
                currentPage = totalPagesNum;
            }

            return this.getCurrentPageMessages(nextPageNum);
        }
    }
}]);