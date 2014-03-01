/**
 * Created by samedi on 2014-02-23.
 */

googleVisual.search = (function(search) {

    //this module is what should be extended if we want to enable more search engines

    search.events = {
        receievedResults: 'GOOGLEVISUAL-RECEIVED_SEARCH_RESULTS'
    };

    search.GUIevents = {
        startSearch: 'GOOGLEVISUAL-START_SEARCH'
    };

    search.init = function init() {
        var searchInstance = {
            searchResults: {},
            searchQueryHistory: []
        };

        //try this out
        //does this work? use __proto__? Too hack:ish?
        searchInstance.prototype = search;

        searchInstance.listenTo = function listenTo(GUIelement) {

            $(GUIelement).on(search.GUIevents.startSearch,
                startSearch);

        };

        function startSearch(event, query) {

            if (searchInstance.searchResults[query]) {
                handleSearchSuccess(searchInstance.searchResults[query]);
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
                searchInstance.searchResults[query] = searchResults;
                searchInstance.searchQueryHistory.push(query);

                //Shout "we got results"
                $(searchInstance).trigger(search.events.receievedResults, {
                    "query": query,
                    "searchResults": searchResults,
                });
            }

        }

        return searchInstance;
    };



    return search;

})(googleVisual.search || {});
