/**
 * Created by samedi on 2014-02-27.
 */

googleVisual.graphs = (function(graphs) {

    //private

    //public
    graphs.path = {};

    graphs.path.initialize = function initializePathGraph(pathGraphElementSelector, searchObject) {

        var pathGraphElement = $(pathGraphElementSelector);

        var width = pathGraphElement.width(), //css("width");//width(),
            height = pathGraphElement.height(); //height();

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });

        var svg = d3.select(pathGraphElementSelector).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(40,0)");

        //d3.json("js/flare.json", function(error, json) {
        var myJson = {
            "name": "flare",
            "children": [{
                "name": "analytics",
                "children": [{
                    "name": "cluster",
                    "children": [{
                        "name": "AgglomerativeCluster",
                        "size": 3938
                    }],

                }, {
                    "name": "Operator",
                    "size": 2490
                }, {
                    "name": "OperatorList",
                    "size": 5248
                }, {
                    "name": "OperatorSequence",
                    "size": 4190
                }, {
                    "name": "OperatorSwitch",
                    "size": 2581
                }, {
                    "name": "SortOperator",
                    "size": 2023
                }],

            }]
        };

        (function(json) {
            var nodes = tree.nodes(json),
                links = tree.links(nodes);

            var link = svg.selectAll("path.link")
                .data(links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", diagonal);

            var node = svg.selectAll("g.node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                })

            node.append("circle")
                .attr("r", 4.5);

            node.append("text")
                .attr("dx", function(d) {
                    return d.children ? -8 : 8;
                })
                .attr("dy", 3)
                .attr("text-anchor", function(d) {
                    return d.children ? "end" : "start";
                })
                .text(function(d) {
                    return d.name;
                });
        })(myJson);

        d3.select(self.frameElement).style("height", height + "px");
    };

    return graphs;

})(googleVisual.graphs || {});
