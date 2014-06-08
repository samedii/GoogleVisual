// Define a new module for our app
var app = angular.module("history", ['ngAnimate']);

// Create the instant search filter
// 
app.filter('matchOldQuery', function() {

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

});

app.filter('separateTerms', function() {

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

});

// The controller

function HistoryController($scope) {

    // The data model. These items would normally be requested via AJAX,
    // but are hardcoded here for simplicity. See the next example for
    // tips on using AJAX.

    $scope.queryHistory = [];

    $scope.searchQueryAddition = "";

    $scope.currentSearchQuery = "test+speed-bandwidth";

    $scope.searchSubmitted = function() {
        if ($scope.searchQueryAddition.search(/[\+-\s]/) === -1) {
            $scope.currentSearchQuery += '+';
        }
        $scope.currentSearchQuery += $scope.searchQueryAddition;
        $scope.queryHistory.push($scope.currentSearchQuery);
        $scope.searchQueryAddition = "";
    };

    $scope.searchQueryAdditionFieldChanged = function() {
        console.log("Detected change");
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
