var messageApp = angular.module('messageApp');

messageApp.factory('pagination', [function () {
    var currentPage = 0,
        itemsPerPage = 10,
        maxPaginationList = 6,
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

        getPaginationList: function () {
            var pagesNum = this.getTotalPagesNum(),
                paginationList = [];

            for (var i = 0; i <pagesNum; i++) {
                var name = i + 1;
                paginationList.push({
                    name: name,
                    link: i
                });
            }
            return paginationList;
        },

        getDynamicPaginationList: function (page) {
            var dynamicPaginationList = [],
                paginationList = this.getPaginationList(),
                curPage = angular.isUndefined(page) ? 0 : page,
                start = curPage - maxPaginationList,
                end = curPage + maxPaginationList,
                totalPagesNum = this.getTotalPagesNum();

            if (curPage <= maxPaginationList) {
                dynamicPaginationList = paginationList
                    .slice(0, 12);
            } else if (curPage > totalPagesNum - maxPaginationList) {
                dynamicPaginationList = paginationList
                    .slice(start, totalPagesNum);
            } else {
                dynamicPaginationList = paginationList
                    .slice(start, end);
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
                totalPagesNum = this.getTotalPagesNum();

            if (nextPageNum < totalPagesNum - 1) {
                currentPage = nextPageNum;
            } else {
                nextPageNum = totalPagesNum - 1;
                currentPage = totalPagesNum - 1;
            }

            return this.getCurrentPageMessages(nextPageNum);
        }
    }
}]);