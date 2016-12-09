<!DOCTYPE html>
<meta charset="utf-8">
<title>SANKEY Experiment</title>
<style>

.node rect {
  cursor: move;
  shape-rendering: crispEdges;
}

.node text {
  pointer-events: none;
  text-shadow: 0 1px 0 #fff;
}

.link {
  fill: none;
  stroke-opacity: .9;
}

.link:hover {
  stroke-opacity: .5;
}

</style>
<body>

<p id="nodeStyle">Node Styling Choices: </p>
<p id="nodeColor">Basic Color Scheme: </p>
<p id="chart"></p>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="js/sankeyAlt.js"></script>
<script src="js/colorbrewer.js"></script>
<script>


//---- select display node types...____NODE DISPLAY SELECT SERIES
//Create and append select list
var selectListA = document.createElement("select");
    selectListA.id = "nodeStyleOps";
document.getElementById("nodeStyle").appendChild(selectListA);



var nodeSt=["rectangle (default)", "embedded arrow", "extended arrow", "bracket gap", "other"];

//Create and append the options
for (var i = 0; i < nodeSt.length; i++) {
    var option = document.createElement("option");
    option.value = nodeSt[i];
    option.text = nodeSt[i];
    option.setAttribute('onclick', 'update(this.value)' );
    selectListA.appendChild(option);
};


//----button type
var buttonnode= document.createElement('input');
buttonnode.setAttribute('type','button');
buttonnode.setAttribute('name', 'clear');
buttonnode.setAttribute('value', 'clear');
buttonnode.setAttribute('onclick', 'clearAll(this.value)' );
document.getElementById("nodeStyle").appendChild(buttonnode);
//document.getElementById("nodeColor").appendChild(buttonnode);

//----------------------------------------------------------------------------------
	
var units = "Units";

var margin = {top: 10, right: 50, bottom: 10, left: 50},
    width = window.innerWidth - 2*margin.left - 2*margin.right,
    height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.ordinal()
    .domain([0,.5])
    .range(colorbrewer.YlOrRd[9]);




// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width+margin.right +margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

    //var groupnodes = svg.append("g");
    var grouplines = svg.append("g");
    var groupnodes = svg.append("g");
    var groupicons = svg.append("g"); // options for visuals

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(48)
    .nodePadding(80)
    .size([width, height]);

var path = sankey.link();

// load the data (using the timelyportfolio csv method)
d3.csv("data/sankey.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source });
      graph.nodes.push({ "name": d.target });
      //graph.nodes.push({ "varient": d.var});  add or loss to pull from top or bottom of page
      graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value }); // given value or percentage which will need to be handled below/internally in sankeyAlt.js
                        // again other values to be loaded here
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     console.log(graph.links);

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
       graph.links[i].scolor = color(graph.nodes[graph.links[i].source].replace(/ .*/, "")); // color( name.replace....)
       graph.links[i].tcolor = color(graph.nodes[graph.links[i].target].replace(/ .*/, ""));

        var gradient = svg.append("defs")
          .append("linearGradient")
          .attr("id", "grad"+i);


          gradient.attr("x1", graph.links[i].source.x)
              .attr("y1", graph.links[i].source.y)
              .attr("x2", graph.links[i].target.x)
              .attr("y2", graph.links[i].target.y);

          gradient.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", graph.links[i].scolor)
                  .attr("stop-opacity", 1);

          gradient.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", graph.links[i].tcolor)
                  .attr("stop-opacity", 1);
       //graph.links[i].color = d3.interpolateRgb(graph.links[i].scolor, graph.links[i].tcolor);
     });

     console.log(graph.links[0]);

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);


// add in the links
  var link = grouplines.selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .attr("stroke", function(d, i){
              return "url(#grad"+i+")";}) 
              //return d.scolor;})
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = groupnodes.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		    return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		      this.parentNode.appendChild(this); })
      .on("drag", dragmove));

      var triFunction = d3.svg.line()
                        .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");



    graph.nodes.forEach(function(d){ // the coordinates for all arrow systems
        var lineData=[];
        var lineData0=[];
        var lineDataA=[];
        lineData=[{"x":d.dx, "y":0}, {"x":1.5*d.dx, "y":d.dy/2}, {"x":d.dx, "y":d.dy}, {"x":d.dx, "y":0}];
        lineData0=[{"x":d.dx, "y":0}, {"x":1.5*d.dx, "y":d.dy/2}, {"x":d.dx, "y":d.dy}]; //small excess arrows

        lineData1=[{"x":10, "y":0}, {"x":(d.dx-10), "y":d.dy/2}, {"x":10, "y":d.dy}]; //small excess arrows

        lineDataA=[{"x":d.dx, "y":0}, {"x":1.5*d.dx, "y":d.dy/2}, {"x":d.dx, "y":d.dy}, {"x":d.dx, "y":0}];
        lineDataB=[{"x":d.dx, "y":0}, {"x":1.5*d.dx, "y":d.dy/2}, {"x":d.dx, "y":d.dy}, {"x":d.dx, "y":0}];
        lineDataC=[{"x":d.dx, "y":0}, {"x":1.5*d.dx, "y":d.dy/2}, {"x":d.dx, "y":d.dy}, {"x":d.dx, "y":0}];

        //console.log(lineData);
        d.arrow=triFunction(lineData);
        d.arrow0=triFunction(lineData0);
        d.arrow1=triFunction(lineData1);
      });

      console.log(graph.nodes);
      console.log(width+margin.right*2);

  //-------------------------------adding the different articulations/arrows----------------------------------------------    

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .attr("opacity", .9)
      .style("fill", function(d) { 
      return d.color = color(d.name.replace(/ .*/, "")); })
    .append("title")
      .text(function(d) { 
      return d.name + "\n" + format(d.value); });

  node.append("path") //triangle basic for arrow
      .attr("d", function(d){
          return d.arrow;
      })
      .style("fill", function(d) {
      if ((width+margin.right*2)-d.x<150){
          return "none";
      } else {
          return d.color = color(d.name.replace(/ .*/ , "")); }})
      .attr("opacity", .9);

  node.append("path") //triangle edge for arrow
      .attr("d", function(d){
          return d.arrow0;
      })
      .style("stroke", function(d){
          if ((width+margin.right*2)-d.x<150){
          return "none";
      } else {
        return "#ffffff";}})
      .style("stroke-linecap", "round")
      .style("fill", "none")
      .style("stroke-width", "5px"); 


  /*node.append("path") //triangle edge for arrow1
      .attr("d", function(d){
          return d.arrow1;
      })
      .style("stroke", "#ffffff")
      .style("stroke-linecap", "round")
      .style("fill", "none")
      .style("stroke-width", "10px");*/


// change this to a set of options - rectangle, arrow/arrow impression sq, arrow extended, other

// add in the title for the nodes
  node.append("text")
      .attr("x", - 6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + 1.5*sankey.nodeWidth()) // set this to vary based on the arrow options...
      .attr("text-anchor", "start")
      .attr("stroke", "none");

// the function for moving the nodes in both the x and the y
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + (d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))) + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});

</script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>

</body>
</html>
