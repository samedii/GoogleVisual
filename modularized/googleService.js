(function () {
    var app = angular.module("google", ["ngResource"]);

    app.value("url", "https://www.googleapis.com/customsearch/v1");
    app.value("searchEngineId", "007751936930598519386:d7s2bzezgog");
    app.value("browserAPIKey", "AIzaSyA9VBEPlVD4xub2IkBBw9XUidQ_W1m4h1o");
    app.value("uniqueCode", "007751936930598519386:5fgyptlv9gq");

    app.factory("GoogleService", [
        "$resource",
 		"url",
 		"searchEngineId",
 		"browserAPIKey",
 		"uniqueCode",
        function($resource, url, searchEngineId, browserAPIKey, uniqueCode) {
        	var DEFAULT_SETTINGS = {
        		type: 'GET',
       		 	dataType: 'jsonp',
        		data: {
            		cx: uniqueCode,
            		key: browserAPIKey,
            		client: "google-csbe",
            		prettyPrint: true,
            		safe: "off", //high medium off
            		num: 10, //max is 10 even though spec says 20
            		output: "xml_no_dtd"
        		},
        		search: {
        			method:'JSONP'
        		}
        	};

            var GoogleServiceAPI = {
                	data: {
                	},
                	search: function(searchQuery) {

                		var handlers = {
                			success: function success(someData) {
                            	GoogleServiceAPI.data = someData;
                        	},
                        	error: function error() {
                        		console.log("Error: Google service failure")
                        	}
                		};

                		var SETTINGS = angular.extend({}, DEFAULT_SETTINGS, handlers);
        				SETTINGS.data.q = searchQuery;

                		var api = $resource(url, SETTINGS);
                    	api.get(function(someData){
                    		GoogleServiceAPI.data = someData;
                    	});
                        	
                	}
        		};
        	return GoogleServiceAPI;
    	}
	]);

})();