(function () {
    var app = angular.module("googleService", ["ngResource"]);

    app.value("url", "https://www.googleapis.com/customsearch/v1");
    app.value("searchEngineId", "007751936930598519386:d7s2bzezgog");
    app.value("browserAPIKey", "AIzaSyA9VBEPlVD4xub2IkBBw9XUidQ_W1m4h1o");
    app.value("uniqueCode", "007751936930598519386:5fgyptlv9gq");


    app.factory("GoogleService", [
        "$resource",
 		"address",
 		"searchEngineId",
 		"browserAPIKey",
 		"uniqueCode",
        function () {
        	var OPTIONS = {
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
        		fetch: {
        			method:'JSONP'
        		}
        	};

            var GoogleServiceAPI = {
                	data: {

                	},
                	search: function(searchQuery) {

                		var handlers = {
                			success: function success(someData) {
                            	GoogleService.data = someData;
                        	},
                        	error: function error() {
                        		console.log("Error: Google service")
                        	}
                		};

                		var api = $resource(url, $.extend({}, OPTIONS, handlers));
                    	api.fetch(function(someData){
                    		GoogleServiceAPI.data = someData;
                    	});
                        	
                	}
        		};
        	return GoogleServiceAPI;
    	}
	]);

})();