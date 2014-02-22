/**
 * Created by samedi on 2014-01-01.
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
    google.adress = 'http://www.google.com';
    google.uniqueCode = ''; //TODO: Fix

    google.SETTINGS = {
        url: google.adress,
        type: 'GET',
        dataType: 'xml',
        data: {
            client: "google-csbe",
            cx: google.uniqueCode,
            //ie: utf8
            //oe: utf8
            num: 20, //max
            output: "xml_no_dtd"
        },
        done: handleSuccess,
        //error: defaultFailFunction,
        //fail: errorFunction || defaultFailFunction,
        //complete: defaultCompleteFunction,
        //always: defaultCompleteFunction,
        async: true,
        cache: true
    };

    google.call = function(query) {
        return $.ajax(google.SETTINGS.data.q = query);
    };

    return google;

})(google || {});