/**
 * Created by samedi on 2014-02-23.
 */

var googleVisual = (function(googleVisual) {

    //private

    function createSearchObject(searchElementSelector, resultsElementSelector) {

        var searchObject = (function initializeSearchObject(searchObject) {

            //Could be useful
            //searchObject.searchElementSelector = searchElementSelector;
            //searchObject.resultsElementSelector = resultsElementSelector;

            searchObject.searchElement = $(searchElementSelector);
            searchObject.resultsElement = $(resultsElementSelector);

            return searchObject;

        })({});


        searchObject = (function addQueryFunctionality(searchObject) {

            searchObject.queryList = [];

            //Get full query
            searchObject.getQuery = function getQuery() {
                /*
                var fullQueryArr = [];
                for (var i = 0; i <= searchObject.queryList.length - 1; i++) {
                    fullQueryArr[i] = searchObject.queryList[i];
                }
                return fullQueryArr.join('+');
                */
                return searchObject.queryList.join('+');
            };

            //Maybe doesn't belong but must be global
            searchObject.resultsHandler = function resultsHandler(searchResults) {
                console.log("Received search results:");
                console.log(searchResults);

                updateSearchList(searchObject);
            };

            //Useful for callback from jsonp
            searchObject.getGlobalResultsHandlerName = function getGlobalResultsHandlerName() {
                var index = $.inArray(searchObject, googleVisual.searchObjects);
                if (index == -1) {
                    console.log("Error: No search object found");
                    return -1;
                }
                return "googleVisual.searchObjects[" + index + "].resultsHandler";
            };

            return searchObject;

        })(searchObject);

        //Give global adress for use with jsonp
        var index = googleVisual.searchObjects.length;
        googleVisual.searchObjects[index] = searchObject;

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

                    var index = searchObject.queryList.length;
                    searchObject.queryList[index] = nextQuery;

                    google.query(searchObject.getQuery(),
                        searchObject.getGlobalResultsHandlerName());

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
        searchObject.searchElement.find("li.searchBarItem").before(
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

        for (var i = 0; i <= searchObject.queryList.length - 1; i++) {
            console.log(searchObject.queryList[i]);
            addSearchHistoryItem(searchObject, searchObject.queryList[i]);
        }

    }

    function updateSearchList(searchObject) {
        startList(searchObject);
        addSearchHistory(searchObject);
    }

    //public

    googleVisual.searchObjects = [];

    googleVisual.initialize = function(searchElementSelector, resultsElementSelector) {

        var searchElement = $(searchElementSelector);
        var resultsElement = $(resultsElementSelector);

        var searchObject = createSearchObject(searchElement, resultsElement);

        //intialize gui

        updateSearchList(searchObject);
    };

    return googleVisual;

})(googleVisual || {});
