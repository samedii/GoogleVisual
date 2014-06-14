// Define a new module for our app
angular.module("googleVisual", ["google"])
    .filter('matchOldQuery', function() {

        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        function startsWith(string, prefix) {
            return string.indexOf(prefix) === 0;
        }

        return function(queries) {

            var result = [];

            // Using the forEach helper method to loop through the array

            var oldQueryString;

            angular.forEach(queries, function(queryString) {

                if (startsWith(queryString, oldQueryString)) {
                    result.push(queryString.substring(oldQueryString.length, queryString.length));

                } else {
                    result.push(queryString);
                }

                oldQueryString = queryString;
            });

            return result;

        };

    })
    .filter('separateTerms', function() {

        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        var allDelimiters = [
            "+",
            "-"
            /*,
        "OR",
        "intext:",
        "related:",
        "link:",
        "site:"*/
        ];



        return function(queryString) {
            return queryString.split(/(?=[\+-])/g);
        };

    })
    .controller("HistoryController", ["$scope", "GoogleService",
        function($scope, GoogleService) {

            // The data model. These items would normally be requested via AJAX,
            // but are hardcoded here for simplicity. See the next example for
            // tips on using AJAX.

            $scope.queryHistory = [];

            $scope.searchQueryAddition = "";

            $scope.currentSearchQuery = "Bahram-Sarban";

            $scope.searchData = GoogleService.data.items; // DOES THIS ACTUALLY CREATE A BINDING? WTF?

            $scope.searchSubmitted = function() {
                if ($scope.searchQueryAddition.search(/[\+-\s]/) === -1) {
                    $scope.currentSearchQuery += '+';
                }
                $scope.currentSearchQuery += $scope.searchQueryAddition;
                $scope.queryHistory.push($scope.currentSearchQuery);
                $scope.searchQueryAddition = "";


                GoogleService.search($scope.currentSearchQuery);
            };

            $scope.searchQueryAdditionFieldChanged = function() {

                var m = $scope.searchQueryAddition.match(/.+(?=[\+-\s])/);
                if (m && m.length > 0) {

                    if (m[0].search(/[\+-\s]/) === -1) {
                        $scope.currentSearchQuery += '+';
                    }
                    $scope.currentSearchQuery += m;
                    $scope.searchQueryAddition = $scope.searchQueryAddition.replace(m, '');
                }
            };
        }
    ]);
