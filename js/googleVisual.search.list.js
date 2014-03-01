/**
 * Created by samedi on 2014-02-23.
 */

googleVisual.search.list = (function(searchList) {

    //private
    var searchLists = [];

    //public

    searchList.init = function init(searchListElementSelector) {

        //public

        var searchListInstance = (function initialize(searchListInstance) {

            searchListInstance.searchListElement = $(searchListElementSelector);

            //try this out
            //does this work? use __proto__? Too hack:ish?
            searchListInstance.prototype = searchList;

            return searchListInstance;

        })({});

        //Get full query
        searchListInstance.getQuery = function getQuery(index) {

            var queryList = searchListInstance.getQueryList();

            return googleVisual.createQuery(queryList);
        };

        //Get query list from GUI
        searchListInstance.getQueryList = function getQueryList() {
            var elements = searchListInstance.searchListElement.find("input[type=hidden]");
            if (elements.length === 0) {
                return [];
            }

            var queries = [];
            elements.each(function(idx, el) {
                queries.push($(this).attr('value'));
            });
            return queries;
        };

        //placeholder
        searchListInstance.listenTo = function listenTo(element) {
            //nothing atm
        };



        //private

        function searchBarItemHTML() {
            return [
                //'<form id="query">',
                '<ul id="searchList">',
                '<li class="searchBarItem">',
                '<input class="ui-corner-all" type="text" name="nextQuery" />',
                '<input type="button" value="Add">',
                //'</form>',
                '</li>',
                '</ul>'
            ].join('\n');
        }

        function handleSearchButton(event) {

            var nextQuery = searchListInstance.searchListElement.find("input[name=nextQuery]").val(),
                oldQueryList = searchListInstance.getQueryList();

            addSearchHistoryItem(nextQuery, oldQueryList.length);
            var query = searchListInstance.getQuery();

            $(searchListInstance).trigger(googleVisual.search.GUIevents.startSearch,
                query);

        }

        function addSearchHistoryItem(query, index) {
            searchListInstance.searchListElement.find("li.searchBarItem").before(
                [
                    '<li class="listitem ui-state-default">',
                    query,
                    '<input type="hidden" name="query' + index + '" value="' + query + '" />',
                    '</li>'
                ].join('\n')
            );
        }

        function addSearchHistory() {
            var queryList = searchListInstance.getQueryList();
            for (var i = 0; i <= queryList.length - 1; i++) {
                console.log(queryList[i]);
                addSearchHistoryItem(queryList[i], i);
            }

        }

        function setSortable() {
            //Set sortable except search bar
            searchListInstance.searchListElement.find("#searchList").sortable({
                items: "li:not(.searchBarItem)",
                placeholder: "ui-state-highlight"
            });

            //Cannot mark text
            searchListInstance.searchListElement.find("#searchList li").disableSelection();
        }


        (function finialize() {
            //Search bar
            searchListInstance.searchListElement.html(searchBarItemHTML());
            searchListInstance.searchListElement.find("li.searchBarItem input[type=button]")
                .on('click', handleSearchButton);

            //Query list
            addSearchHistory();
            setSortable();

            //Don't let the garbage collector get you
            searchLists.push(searchListInstance);

        })();

        return searchListInstance;
    };

    searchList.remove = function(searchListInstance) {
        //TODO
        console.log("Warning: Remove search list not implemented");
    };

    return searchList;

})(googleVisual.search.list || {});
