/**
 * Created by samedi on 2014-02-23.
 */

var googleVisual = (function(googleVisual) {

    //private

    //public

    googleVisual.search = {
        events: {
            receievedResults: 'GOOGLEVISUAL-RECEIVED_SEARCH_RESULTS'
        }
    };

    googleVisual.results = {
        events: {
            //placeholder
        }
    };

    googleVisual.searchResults = {};

    //should probably move to googleVisual.tools later
    googleVisual.createQuery = function createQuery(queryList) {

        if (typeof index !== 'undefined') {
            return queryList[index];
        } else {
            return queryList.join('+');
        }
    };

    return googleVisual;

})(googleVisual || {});
