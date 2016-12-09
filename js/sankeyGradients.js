function sankeyGradients(){


    var gradientHA = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradHA");

          gradientHA.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", "#ffffff")
                  .attr("stop-opacity", 0);

          gradientHA.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", "#ff006a")
                  .attr("stop-opacity", .25);        

          gradientHA.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", "#ff006a")// pink
                  .attr("stop-opacity", 1);

    var gradientLA = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradLA");

          gradientLA.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", "#ff006a")
                  .attr("stop-opacity", 1);

          gradientLA.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", "#ff006a")
                  .attr("stop-opacity", .25);        

          gradientLA.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", "#ffffff")// pink
                  .attr("stop-opacity", 0);


    var gradientHAG = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradHAG");

          gradientHAG.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", "#ffffff")
                  .attr("stop-opacity", 0);

          gradientHAG.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", "#333333")
                  .attr("stop-opacity", .25);        

          gradientHAG.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", "#333333")// grey
                  .attr("stop-opacity", 1);

    var gradientLAG = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradLAG");

          gradientLAG.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", "#333333")
                  .attr("stop-opacity", 1);

          gradientLAG.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", "#333333")
                  .attr("stop-opacity", .25);        

          gradientLAG.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", "#ffffff")// pink
                  .attr("stop-opacity", 0);

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
       graph.links[i].scolor = color(graph.nodes[graph.links[i].source].replace(/ .*/, "")); // color( name.replace....)
       graph.links[i].tcolor = color(graph.nodes[graph.links[i].target].replace(/ .*/, ""));

        var gradient = svg.append("defs")
          .append("linearGradient")
          .attr("id", "grad"+i);

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

         // loop through each link replacing the text with its index from node
     graph.adding.forEach(function (d, i) {
       graph.adding[i].source = graph.nodes.indexOf(graph.adding[i].source); //should give a -1 index ... if get -1, search other links and take their x half way between areas
       graph.adding[i].target = graph.nodes.indexOf(graph.adding[i].target);
       graph.adding[i].scolor = "#ffffff"; // color( name.replace....)
       graph.adding[i].tcolor = color(graph.nodes[graph.adding[i].target].replace(/ .*/, ""));

        var gradient = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradA"+i);

          gradient.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", graph.adding[i].scolor)
                  .attr("stop-opacity", 0);

          gradient.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", graph.adding[i].scolor)
                  .attr("stop-opacity", .25);        

          gradient.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", graph.adding[i].tcolor)
                  .attr("stop-opacity", 1);

       //graph.links[i].color = d3.interpolateRgb(graph.links[i].scolor, graph.links[i].tcolor);
     });

     graph.loss.forEach(function (d, i) {
       graph.loss[i].source = graph.nodes.indexOf(graph.loss[i].source); 
       graph.loss[i].target = graph.nodes.indexOf(graph.loss[i].target); //should give a -1 index ... if get -1, search other links and take their x half way between areas
       graph.loss[i].tcolor = "#ffffff"; // color( name.replace....)
       graph.loss[i].scolor = color(graph.nodes[graph.loss[i].source].replace(/ .*/, ""));

        var gradient = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradL"+i);

          gradient.append("stop")
                  .attr("offset", "0%")
                  .attr("stop-color", graph.loss[i].scolor)
                  .attr("stop-opacity", 1);

          gradient.append("stop")
                  .attr("offset", "50%")
                  .attr("stop-color", graph.loss[i].tcolor)
                  .attr("stop-opacity", .25);

          gradient.append("stop")
                  .attr("offset", "100%")
                  .attr("stop-color", graph.loss[i].tcolor)
                  .attr("stop-opacity", 0);
       //graph.links[i].color = d3.interpolateRgb(graph.links[i].scolor, graph.links[i].tcolor);
     });

     graph.loop.forEach(function (d, i) {
       graph.loop[i].source = graph.nodes.indexOf(graph.loop[i].source); 
       graph.loop[i].target = graph.nodes.indexOf(graph.loop[i].target); //should give a -1 index ... if get -1, search other links and take their x half way between areas
       graph.loop[i].tcolor = color(graph.nodes[graph.loop[i].target].replace(/ .*/, ""));// color( name.replace....)
       graph.loop[i].scolor = color(graph.nodes[graph.loop[i].source].replace(/ .*/, ""));
       //graph.loop[i].mcolor = d3.interpolateCubehelix(graph.loop[i].tcolor, graph.loop[i].scolor)(0.5);
       //graph.loop[i].mcolor = interpolator(.5); 

        var gradient = svg.append("defs")
          .append("linearGradient")
          .attr("id", "gradF"+i);

          gradient.append("stop")
                  .attr("offset", "30%")
                  .attr("stop-color", graph.loop[i].tcolor)
                  .attr("stop-opacity", 1);

          gradient.append("stop")
                  .attr("offset", "70%")
                  .attr("stop-color", graph.loop[i].scolor)
                  .attr("stop-opacity", 1);
     });

};

// all the highlight functions-------------------------------- secondary shifts to color/appearance

    function highlightN(dt){
            //dt=d3.select(this);
            //NodeOver and NodeIcon for the bracket interactions to be more general.
            var nodeOrigin='';
            if (dt.attr("id").match("NodeOver")){ nodeOrigin = "#"+dt.attr("id").replace("NodeOver", ''); 
            } else if (dt.attr("id").match("NodeIcon")){ nodeOrigin = "#"+dt.attr("id").replace("NodeIcon", ''); 
            } else { nodeOrigin = "#"+dt.attr("id").replace("Node", ''); };
            
            var highLink=[], // to hold all source links // target links
                highNodes=[]; // the nodes at the end of those links

            var mainNode=graph.nodes.filter(function(d){
                  return d.name===nodeOrigin.slice(1);
                });
                
                mainNode[0].sourceLinks.forEach(function(source){
                  highLink.push("#"+source.source.name+source.target.name);
                  if (source.target !== -1){ 
                      highNodes.push("#"+source.target.name+"Node"); 
                      //highLink.push(source.source.name+source.target.name); 
                    };
                });
                mainNode[0].targetLinks.forEach(function(target){
                  highLink.push("#"+target.source.name+target.target.name);
                  if (target.source !== -1){ highNodes.push("#"+target.source.name+"Node"); };
                }); 

                graph.loop.forEach(function(loop){
                  if (loop.name === nodeOrigin.slice(1)){
                    highLink.push("#"+loop.name+loop.nameEnd);
                    highNodes.push("#"+loop.nameEnd+"Node"); 
                  } else if (loop.nameEnd === nodeOrigin.slice(1)){
                    highLink.push("#"+loop.name+loop.nameEnd);
                    highNodes.push("#"+loop.name+"Node");
                  };
                });

            var col="";
            var colA="";
            var colL="";
            if (opt.c==="greysContrast"|| opt.c==="defaultColor"|| opt.c==="googleFonts"){
                col="#ff006a";
                colA="url(#gradHA)";
                colL="url(#gradLA)";
            } else if (opt.c==="colorGradients"){
                col="#333333";
                colA="url(#gradHAG)";
                colL="url(#gradLAG)";
            };
            

                // original node filling
                      d3.select(nodeOrigin+"Node").attr("fill", col);
                      d3.select(nodeOrigin+"Node").attr("stroke", col);
                      d3.select(nodeOrigin).attr("fill", col);
                        if (d3.select(nodeOrigin+"Arrow")){ 
                        d3.select(nodeOrigin+"Arrow").attr("fill", col);
                        };

                // loop throught additional nodes
                //console.log(nodeOrigin, highLink, highNodes);
                highLink.forEach(function(link){
                  if (d3.selectAll(link).attr("class")==="link"||d3.selectAll(link).attr("class")==="loop"){ 
                    d3.selectAll(link).attr("stroke", col);
                  } else if (d3.selectAll(link).attr("class")==="adding"){
                    d3.selectAll(link).attr("stroke",colA);
                  } else if (d3.selectAll(link).attr("class")==="loss"){
                    d3.selectAll(link).attr("stroke",colL);
                  };
                });

                highNodes.forEach(function(node){
                  //console.log(node);
                    d3.selectAll(node).attr("fill", col);
                    d3.selectAll(node).attr("stroke", col);

                    var nodetext=node.slice(0,-4);
                      d3.select(nodetext).attr("fill", col);
                      if (d3.select(nodetext+"Arrow")){ 
                          d3.select(nodetext+"Arrow").attr("fill", col);
                          };
                });
          };

    function normalN(dt){
            //dt=d3.select(this);

            // will have to collect original colors for each type... all will be different
            var nodeOrigin='';
            if (dt.attr("id").match("NodeOver")){ nodeOrigin = "#"+dt.attr("id").replace("NodeOver", ''); 
            } else if (dt.attr("id").match("NodeIcon")){ nodeOrigin = "#"+dt.attr("id").replace("NodeIcon", ''); 
            } else { nodeOrigin = "#"+dt.attr("id").replace("Node", ''); };
            console.log(nodeOrigin);

            var highLink=[], // to hold all source links // target links
                highNodes=[];

            //var col=dt.attr("C1"); // will have to collect original colors for each type... all will be different
                //colLink=[],
                //colNodes=[];

            var mainNode=graph.nodes.filter(function(d){
                  return d.name===nodeOrigin.slice(1);
                });
                
                mainNode[0].sourceLinks.forEach(function(source){
                  highLink.push("#"+source.source.name+source.target.name);
                  if (source.target !== -1){ 
                      highNodes.push("#"+source.target.name+"Node"); 
                      //highLink.push(source.source.name+source.target.name); 
                    };
                });
                mainNode[0].targetLinks.forEach(function(target){
                  highLink.push("#"+target.source.name+target.target.name);
                  if (target.source !== -1){ highNodes.push("#"+target.source.name+"Node"); };
                }); 

                graph.loop.forEach(function(loop){
                  if (loop.name === nodeOrigin.slice(1)){
                    highLink.push("#"+loop.name+loop.nameEnd);
                    highNodes.push("#"+loop.nameEnd+"Node"); 
                  } else if (loop.nameEnd === nodeOrigin.slice(1)){
                    highLink.push("#"+loop.name+loop.nameEnd);
                    highNodes.push("#"+loop.name+"Node");
                  };
                });

                // original node filling
                var colN=d3.select(nodeOrigin+"Node").attr("C1");
                      d3.select(nodeOrigin+"Node").attr("fill", colN);
                      d3.select(nodeOrigin+"Node").attr("stroke", colN);
                      d3.select(nodeOrigin).attr("fill", "#333333");
                        if (d3.select(nodeOrigin+"Arrow")){ 
                        d3.select(nodeOrigin+"Arrow").attr("fill", colN);
                        };

                // links
                highLink.forEach(function(link){
                  col=d3.select(link).attr("C1");
                  d3.selectAll(link).attr("stroke", col);
                });

                // nodes
                highNodes.forEach(function(node){
                    //console.log(node);
                    col=d3.select(node).attr("C1");
                    d3.selectAll(node).attr("fill", col);
                    d3.selectAll(node).attr("stroke", col);

                    var nodetext=node.slice(0,-4);
                      d3.select(nodetext).attr("fill", "#333333");
                    if (d3.select(nodetext+"Arrow")){ 
                        d3.select(nodetext+"Arrow").attr("fill", col);
                        };
                });
                      
          };

      function overN(dt){
            //dt=d3.select(this);
            //NodeOver and NodeIcon for the bracket interactions to be more general.
            var nodeOrigin='';
            if (dt.attr("id").match("NodeOver")){ nodeOrigin = "#"+dt.attr("id").replace("Over", ''); 
            } else if (dt.attr("id").match("NodeIcon")){ nodeOrigin = "#"+dt.attr("id").replace("Icon", ''); 
            } else { nodeOrigin = "#"+dt.attr("id"); };
            

            // width, height, x, y from that node as specified
            // set placeholder box at bottom 3 wide x 1 wide, id=plcholder
            var mainNode=graph.nodes.filter(function(d){
                  return d.name===nodeOrigin.slice(1,-4);
                });

            var w = d3.select(nodeOrigin).attr("width"),
                h = d3.select(nodeOrigin).attr("height"); 

            var tL="subtitle".length*8; // make a function of node subtitle later

            var w0 = tL+10,
                  x0 = w/2-w0/2,
                 y0 = Number(h)+7,
                  h0 = w/2; 

            var nodethis=d3.select(nodeOrigin+"Group");

            // set up formula later.

            /*var sSum='';
            mainNode[0].sourceLinks.forEach(function(d){
              sSum+=" "+d.target.name+": "+d.value;
            });
            console.log("out:"+sSum);

            var tSum='';
            mainNode[0].targetLinks.forEach(function(d){
              tSum+=" "+d.value;
            });
            console.log("in:"+tSum);*/ 

            nodethis.append("rect")
                .attr("x", x0)
                .attr("y", y0)
                .attr("width", w0)
                .attr("height", h0)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("id", function(d){
                  return "place"+mainNode[0].name;
                })
                .attr("fill", "#ffffff")
                .attr("stroke", "#333333")
                .attr("stroke-width", .5)
                .attr("opacity", .9);

            nodethis.append("text")
                .attr("x", w/2)
                .attr("y", y0+14)
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .text("subtitle")
                .attr("id", function(d){
                  return "placeT"+mainNode[0].name;
                })
                .attr("fill", "#333333")
                .attr("opacity", .9);

      };

      function overNO(dt){
            //dt=d3.select(this);
            //NodeOver and NodeIcon for the bracket interactions to be more general.
            var nodeOrigin='';
            if (dt.attr("id").match("NodeOver")){ nodeOrigin = "#"+dt.attr("id").replace("Over", ''); 
            } else if (dt.attr("id").match("NodeIcon")){ nodeOrigin = "#"+dt.attr("id").replace("Icon", ''); 
            } else { nodeOrigin = "#"+dt.attr("id"); };
            //console.log(nodeOrigin);

            d3.select("#place"+nodeOrigin.slice(1,-4)).remove();
            d3.select("#placeT"+nodeOrigin.slice(1,-4)).remove();

      };

      function overNOAll(){
            //dt=d3.select(this);
            graph.nodes.forEach(function(node){
              d3.select("#place"+node.name).remove();
              d3.select("#placeT"+node.name).remove();
            });

      };

