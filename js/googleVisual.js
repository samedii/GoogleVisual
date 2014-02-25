/**
 * Created by samedi on 2014-02-23.
 */

var googleVisual = (function(googleVisual) {

    //private
    searchObjects = [];

    function createSearchObject(searchElementSelector, resultsElementSelector) {

        var searchObject = (function initializeSearchObject(searchObject) {

            //Could be useful?
            //searchObject.searchElementSelector = searchElementSelector;
            //searchObject.resultsElementSelector = resultsElementSelector;

            searchObject.searchElement = $(searchElementSelector);
            searchObject.resultsElement = $(resultsElementSelector);

            return searchObject;

        })({});


        searchObject = (function addGUIFunctionality(searchObject) {

            function searchBarItemHTML() {
                return [
                    '<form id="query">',
                    '<ul id="searchList">',
                    '<li class="searchBarItem">',
                    '<input class="ui-corner-all" type="text" name="nextQuery" />',
                    '<input type="button" value="Add">',
                    '</form>',
                    '</li>',
                    '</ul>'
                ].join('\n');
            }

            function handleSearchButton(event) {

                var nextQuery = searchObject.searchElement.find("input[name=nextQuery]").val();

                addSearchHistoryItem(nextQuery, searchObject.getQueryList().length);

                console.log("query:");
                console.log(searchObject.getQuery());
                google.query(searchObject.getQuery(), {
                    error: function tempError() {
                        //TODO
                        console.log("Error: Handle error please");
                    },
                    success: function tempDone() {
                        //TODO
                        console.log("Handle success please");
                    },
                    complete: function tempAlways() {
                        //TODO
                        console.log("Handle complete please");
                    }
                });

            }

            function addSearchHistoryItem(query, index) {
                searchObject.searchElement.find("li.searchBarItem").before(
                    [
                        '<li class="listitem ui-state-default">',
                        query,
                        '<input type="hidden" name="query' + index + '" value="' + query + '" />',
                        '</li>'
                    ].join('\n')
                );
            }

            function addSearchHistory() {
                var queryList = searchObject.getQueryList();
                for (var i = 0; i <= queryList.length - 1; i++) {
                    console.log(queryList[i]);
                    addSearchHistoryItem(queryList[i], i);
                }

            }

            function setSortable() {
                //Set sortable except search bar
                searchObject.searchElement.find("#searchList").sortable({
                    items: "li:not(.searchBarItem)",
                    placeholder: "ui-state-highlight"
                });

                //Cannot mark text
                searchObject.searchElement.find("#searchList li").disableSelection();
            }

            function initializeSearchList() {
                //Search bar
                searchObject.searchElement.html(searchBarItemHTML());
                searchObject.searchElement.find("li.searchBarItem input[type=button]")
                    .on('click', handleSearchButton);

                //Query list
                addSearchHistory();
                setSortable();
            }

            searchObject.initializeSearchList = initializeSearchList;
            searchObject.updateSearchList = initializeSearchList;

            //Get query list from GUI
            searchObject.getQueryList = function getQueryList() {
                var elements = searchObject.searchElement.find("input[type=hidden]");
                if(elements.length == 0) {
                    return [];
                }

                var queries = [];
                elements.each(function(idx, el) {
                    queries.push($(this).attr('value'));
                });
                return queries;
            };

            return searchObject;

        })(searchObject);


        searchObject = (function addQueryFunctionality(searchObject) {

            //Get full query
            searchObject.getQuery = function getQuery(index) {
                if (typeof index !== 'undefined') {
                    return searchObject.getQueryList()[index];
                } else {
                    return searchObject.getQueryList().join('+');
                }
            };

            return searchObject;

        })(searchObject);

        //Don't let the garbage collector get you
        searchObjects.push(searchObject);

        return searchObject;
    }

    //public

    googleVisual.initialize = function(searchElementSelector, resultsElementSelector) {

        var searchElement = $(searchElementSelector);
        var resultsElement = $(resultsElementSelector);

        var searchObject = createSearchObject(searchElement, resultsElement);

        //intialize gui

        searchObject.updateSearchList(searchObject);
    };

    return googleVisual;

})(googleVisual || {});
