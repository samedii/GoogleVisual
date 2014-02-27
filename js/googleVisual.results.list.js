/**
 * Created by samedi on 2014-02-23.
 */

googleVisual.results = googleVisual.results || {};

googleVisual.results.list = (function(resultsList) {

    //private
    var resultsLists = [];

    //public

    //placeholder

    resultsList.init = function init(resultsListElementSelector) {

        //public

        var resultsListInstance = (function initialize(resultsListInstance) {

            resultsListInstance.resultsListElement = $(resultsListElementSelector);

            //try this out
            //does this work? use __proto__? Too hack:ish?
            resultsListInstance.prototype = resultsList;

            return resultsListInstance;

        })({});

        resultsListInstance.listenTo = function listenTo(element) {
            $(element).on(googleVisual.search.events.receievedResults,
                function handleSearchResults(event, query) {
                    showSearchResults(query.searchResults);
                });
        };

        //private

        function searchResultsItemHTML(item) {
            return [
                '<li class="searchBarItem">',
                '<a href="' + item.link + '">',
                '<h4>' + item.htmlTitle + '</h4>',
                '</a>',
                '<p>' + item.htmlSnippet + '</p>',
                '</li>'
            ].join('\n');
        }

        function showSearchResults(results) {
            var searchResultsHTMLArr = [];
            for (var i = 0; i <= results.items.length - 1; i++) {
                searchResultsHTMLArr.push(searchResultsItemHTML(results.items[i]));
            }
            var searchResultsHTML = searchResultsHTMLArr.join('\n');

            resultsListInstance.resultsListElement.html(searchResultsHTML);
        }

        (function finalize() {

            //Don't let the garbage collector get you
            resultsLists.push(resultsListInstance);

        })();

        return resultsListInstance;
    };

    resultsList.remove = function(resultsListInstance) {
        //TODO
        console.log("Warning: Remove results list not implemented");
    };

    return resultsList;

})(googleVisual.results.list || {});
