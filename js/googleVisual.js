/**
 * Created by samedi on 2014-02-23.
 */

var googleVisual = (function(googleVisual) {

    //private

    function queryHistoryLength(searchElement) {
        var length = 0;
        if (searchElement.queryHistory !== undefined) {
            length = searchElement.queryHistory.length;
        }
        return length;
    }

    function getFullQuery(searchElement) {
        var fullQueryArr = [];
        for (var i = 0; i <= searchElement.queryHistory.length - 1; i++) {
            fullQueryArr[i] = searchElement.queryHistory[i].query;
        }
        return fullQueryArr.join('+');
    }

    function startList(searchElement) {

        searchElement.html(
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

        searchElement.find("li.searchBarItem input[type=button]")
            .click(
                function handleSearchButton(event) {
                    /*
                    var loc = URI(window.location);
                    var fullQuery = loc.query();
                    var parsedFullQuery = URI.parseQuery(fullQuery);

                    var searchElementId = searchElement.attr("id");
                    var parsedQuery = parsedFullQuery[searchElementId];

                    var index = 0;
                    if (parsedQuery !== undefined) {
                        index = parsedQuery.length;
                    }

                    var nextQuery = searchElement.find("#nextQuery").val();



                    loc.query()

                    window.location = loc;
                    */

                    var nextQuery = searchElement.find("#nextQuery").val();

                    var index = queryHistoryLength(searchElement);
                    searchElement.queryHistory[index] = {
                        query: nextQuery
                    };

                    google.call(getFullQuery(searchElement));

                });
    }

    function setSortable(searchElement) {
        //Set sortable except search bar
        searchElement.find("#searchList").sortable({
            items: "li:not(.searchBarItem)",
            placeholder: "ui-state-highlight"
        });

        //Cannot mark text
        searchElement.find("#searchList li").disableSelection();

    }

    function prependSearchHistoryItem(searchElement) {
        searchElement.find("ul#searchList").prepend(
            [
                '<li class="listitem ui-state-default">',
                'test',
                //may be useful
                //'<input type="hidden" name="query" value="something" />',
                '</li>'
            ].join('\n')
        );
    }

    function prependSearchHistory(searchElement) {


        /*
        var fullQuery = URI(window.location).query();
        var parsedFullQuery = URI.parseQuery(fullQuery);

        var searchElementId = searchElement.attr("id");
        var parsedQuery = parsedFullQuery[searchElementId];
        console.log(parsedFullQuery.mysearch);

        if (parsedQuery === undefined) {
            return;
        }
*/
        for (var i = queryHistoryLength(searchElement) - 1; i >= 0; i--) {
            console.log(searchElement.queryHistory[i]);
            prependSearchHistoryItem(searchElement);
        }


    }

    //public

    googleVisual.initialize = function(searchElementSelector) {
        var searchElement = $(searchElementSelector);

        //setting new properties
        searchElement.queryHistory = {};

        startList(searchElement);
        prependSearchHistory(searchElement);
    };

    return googleVisual;

})(googleVisual || {});
