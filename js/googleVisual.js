/**
 * Created by samedi on 2014-02-23.
 */

var googleVisual = (function(googleVisual) {

    //private
    function globalSearchObjectName(searchObject) {
        return searchObject.searchElement.attr("id");
    }

    function createGlobalSearchObject(searchElementSelector, resultsElementSelector) {

        var searchObject = (function initializeSearchObject(searchObject) {

            //searchObject.searchElementSelector = searchElementSelector;
            //searchObject.resultsElementSelector = resultsElementSelector;

            searchObject.searchElement = $(searchElementSelector);
            searchObject.resultsElement = $(resultsElementSelector);

            return searchObject;

        })({});


        var searchObject = (function addQueryFunctionality(searchObject) {

            searchObject.queryHistory = [];

            searchObject.getQuery = function getQuery() {
                var fullQueryArr = [];
                for (var i = 0; i <= searchObject.queryHistory.length - 1; i++) {
                    fullQueryArr[i] = searchObject.queryHistory[i].query;
                }
                return fullQueryArr.join('+');
            };

            //Maybe doesn't belong but must be global
            searchObject.resultHandler = function resultHandler(searchResults) {
                console.log("Received search results:");
                console.log(searchResults);
            };
            searchObject.globalResultHandlerName = [
                globalSearchObjectName(searchObject),
                "resultHandler"
            ].join('.');

            return searchObject;

        })(searchObject);

        window[globalSearchObjectName(searchObject)] = searchObject;

        return searchObject;
    }


    function startList(searchObject) {

        searchObject.searchElement.html(
            [
                '<form id="query">',
                '<ul id="searchList">',
                '<li class="searchBarItem">',
                '<input class="ui-corner-all" type="text" name="nextQuery" />',
                '<input type="button" value="Add">',
                '</form>',
                '</li>',
                '</ul>'
            ].join('\n')
        );

        searchObject.searchElement.find("li.searchBarItem input[type=button]")
            .on('click',
                function handleSearchButton(event) {

                    var nextQuery = searchObject.searchElement.find("input[name=nextQuery]").val();

                    var index = searchObject.queryHistory.length;
                    searchObject.queryHistory[index] = {
                        query: nextQuery
                    };

                    google.query(searchObject.getQuery(),
                        searchObject.globalResultHandlerName);

                });
    }

    function setSortable(searchObject) {
        //Set sortable except search bar
        searchObject.searchElement.find("#searchList").sortable({
            items: "li:not(.searchBarItem)",
            placeholder: "ui-state-highlight"
        });

        //Cannot mark text
        searchObject.searchElement.find("#searchList li").disableSelection();

    }

    function addSearchHistoryItem(searchObject, query) {
        searchObject.searchElement.find("li#searchBarItem").before(
            [
                '<li class="listitem ui-state-default">',
                query,
                //may be useful
                //'<input type="hidden" name="query" value="something" />',
                '</li>'
            ].join('\n')
        );
    }

    function addSearchHistory(searchObject) {

        for (var i = 0; i <= searchObject.queryHistory.length - 1; i++) {
            console.log(searchObject.queryHistory[i]);
            addSearchHistoryItem(searchObject, searchObject.queryHistory[i]);
        }

    }

    //public

    googleVisual.initialize = function(searchElementSelector, resultsElementSelector) {
        var searchElement = $(searchElementSelector);
        var resultsElement = $(resultsElementSelector);

        var searchObject = createGlobalSearchObject(searchElement, resultsElement);

        //intialize gui
        startList(searchObject);
        addSearchHistory(searchObject);
    };

    return googleVisual;

})(googleVisual || {});
