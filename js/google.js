/**
 * Created by samedi on 2014-02-22.
 */

var google = (function(google) {

    //private
    function handleSuccess(data, textStatus, jqXHR) {
        //xmlDoc = $.parseXML( data);
        $xml = $(data);
        $userName = $xml.find('USERNAME');
        var uName = $userName.text();
    }

    //public

    //Should save everything instatial in used element instead
    //google.adress = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js';
    google.adress = 'https://www.googleapis.com/customsearch/v1';
    google.uniqueCode = '007751936930598519386:5fgyptlv9gq';
    google.searchEngineId = '007751936930598519386:d7s2bzezgog';
    google.customSearchEngineURL = 'https://www.google.com:443/cse/publicurl?cx=007751936930598519386:5fgyptlv9gq';
    google.browserAPIKey = 'AIzaSyA9VBEPlVD4xub2IkBBw9XUidQ_W1m4h1o';


    google.SETTINGS = {
        url: google.adress,
        type: 'GET',
        dataType: 'JSON-P',
        data: {
            cx: google.uniqueCode,
            key: google.browserAPIKey,
            client: "google-csbe",
            alt: "json", //default
            callback: "handleCallback", //name of function to handle response
            prettyPrint: true, //for debugging
            //cref: google.customSearchEngineURL, //only need cx or cref
            safe: "off",//high medium off
            //ie: utf8
            //oe: utf8
            num: 10, //max is 10 even though spec says 20
            output: "xml_no_dtd"
        },
        done: handleSuccess,
        //error: defaultFailFunction,
        //fail: errorFunction || defaultFailFunction,
        //complete: defaultCompleteFunction,
        //always: defaultCompleteFunction,
        async: true,
        cache: true,
        crossDomain: true,
    };

    google.call = function(query) {
        google.SETTINGS.data.q = query;
        return $.ajax(google.SETTINGS);
    };

    return google;

})(google || {});
