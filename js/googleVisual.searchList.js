/**
 * Created by samedi on 2014-02-23.
 */

googleVisual.searchList = (function(searchList) {

    //private
    searchList.searchResults = {};

    //public
    searchList.events = {
        receievedResults: 'GOOGLEVISUAL-RECEIVED_SEARCH_RESULTS'
    };



    searchList.init = function init(searchListElementSelector) {

        var searchListInstance = (function initialize(searchListInstance) {

            searchListInstance.searchListElement = $(searchListElementSelector);

            searchListInstance.searchQueryHistory = [];
            searchListInstance.searchLists = [];

            return searchListInstance;

        })({});



        //private

        function startSearch(event, query) {

            if (searchList.searchResults[query]) {
                handleSearchSuccess(searchList.searchResults[query]);
            } else {

                google.query(query, {
                    success: handleSearchSuccess,
                    error: function tempError() {
                        //TODO
                        console.log("Error: Handle error please");
                    },
                    complete: function tempComplete() {
                        //TODO
                        console.log("Handle complete please");
                    }
                });

            }

            function handleSearchSuccess(searchResults) {

                //Save results
                searchList.searchResults[query] = searchResults;
                searchListInstance.searchQueryHistory.push(query);

                //Shout "we got results"
                $(searchListInstance).trigger(searchList.events.receievedResults, {
                    "query": query,
                    "searchResults": searchResults,
                });
            }

        }

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


            startSearch(event, query);

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

        //public

        //Get full query
        searchListInstance.getQuery = function getQuery(index) {

            var queryList = searchListInstance.getQueryList();

            return googleVisual.tools.createQuery(queryList);
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
 


        (function finialize() {
            //Search bar
            searchListInstance.searchListElement.html(searchBarItemHTML());
            searchListInstance.searchListElement.find("li.searchBarItem input[type=button]")
                .on('click', handleSearchButton);

            //Query list
            addSearchHistory();
            setSortable();

            //Don't let the garbage collector get you
            searchListInstance.searchLists.push(searchListInstance);

        })();

        return searchListInstance;
    };

    searchList.remove = function(searchListInstance) {
        //TODO
        console.log("Warning: Remove search list not implemented");
    };

    return searchList;

})(googleVisual.searchList || {});
