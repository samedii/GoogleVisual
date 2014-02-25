/**
 * Created by samedi on 2014-02-22.
 */

var google = (function(google) {

    //private

    //public

    google.adress = 'https://www.googleapis.com/customsearch/v1';
    google.uniqueCode = '007751936930598519386:5fgyptlv9gq';
    google.searchEngineId = '007751936930598519386:d7s2bzezgog';
    google.customSearchEngineURL = 'https://www.google.com:443/cse/publicurl?cx=007751936930598519386:5fgyptlv9gq';
    google.browserAPIKey = 'AIzaSyA9VBEPlVD4xub2IkBBw9XUidQ_W1m4h1o';


    google.DEFAULT_SETTINGS = {
        url: google.adress,
        type: 'GET',
        dataType: 'jsonp',
        data: {
            cx: google.uniqueCode,
            key: google.browserAPIKey,
            client: "google-csbe",
            //alt: "json",
            prettyPrint: true, //for debugging
            //cref: google.customSearchEngineURL, //only need cx or cref
            safe: "off", //high medium off
            //ie: utf8
            //oe: utf8
            num: 10, //max is 10 even though spec says 20
            output: "xml_no_dtd"
        },
        success: function() {
            console.log("Default success");
        },
        error: function() {
            console.log("Default error");
        },
        complete: function() {
            console.log("Default complete");
        },
        //async: true,
        //cache: false,
        crossDomain: true,
    };

    google.query = function(query, SETTINGS) {
        SETTINGS = $.extend({}, google.DEFAULT_SETTINGS, SETTINGS);
        SETTINGS.data.q = query;

        return $.ajax(SETTINGS);
    };

    return google;

})(google || {});
