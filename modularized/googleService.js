angular.module("google", ["ngResource"])
    .value("url", "https://www.googleapis.com/customsearch/v1")
    .value("searchEngineId", "007751936930598519386:d7s2bzezgog")
    .value("browserAPIKey", "AIzaSyA9VBEPlVD4xub2IkBBw9XUidQ_W1m4h1o")
    .value("uniqueCode", "007751936930598519386:5fgyptlv9gq")
    .factory("GoogleService", [
        "$resource",
        "url",
        "searchEngineId",
        "browserAPIKey",
        "uniqueCode",
        function($resource, url, searchEngineId, browserAPIKey, uniqueCode) {

            var api = $resource(url, {
                cx: uniqueCode,
                key: browserAPIKey,
                client: "google-csbe",
                prettyPrint: true,
                safe: "off", //high medium off
                num: 10, //max is 10 even though spec says 20
                output: "xml_no_dtd",
                callback: "JSON_CALLBACK",
                q: "@query"
            },
            {
                search: { method: "JSONP" }
            });

            var GoogleServiceAPI = {
                data: {
                    search: []
                },
                search: function(searchQuery) {
                    api.search({q: searchQuery}, function(someData) {
                        console.log(someData);
                        GoogleServiceAPI.data.search.push(someData);
                    });
                }
            };
            return GoogleServiceAPI;
        }
    ]);
