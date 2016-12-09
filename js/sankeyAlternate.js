d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [],
      adding = [],
      loss = [],
      loop = [];

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.adding = function(_) {
    if (!arguments.length) return adding;
    adding = _;
    return sankey;
  };

  sankey.loss = function(_) {
    if (!arguments.length) return loss;
    loss = _;
    return sankey;
  };

  sankey.loop = function(_) {
    if (!arguments.length) return loop;
    loop = _;
    return sankey;
  };

var h='';
  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    h=size[1];
    return sankey;
  };


  sankey.layout = function(iterations) {
    computeNodeLinks();
    /*computeNodeAdd();
    computeNodeLoss();
    computeNodeLoop();*/
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };
    //console.log(link);
    return link;
  };

  //sankey.addingCurve (shift to this table)

  //sankey.lossCurve (shift to this table)

  //sankey.loopCurve (shift to this table)





  // Populate the sourceLinks and targetLinks for each node. 
  // this is where to set up the number or percent function... and make sure you are starting from input numbers.
  // Also, if the source and target are not objects, assume they are indices. 
  function computeNodeLinks() {
    //console.log(nodes);

    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });

    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source]; //making sure to get objects not numbers
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });

    adding.forEach(function(addition) {
          //source = addition.source,
          targetA = addition.target;
          //console.log(targetA);
      if (typeof targetA === "number") targetA = addition.target = nodes[addition.target];
      targetA.targetLinks.push(addition);

    });

    loss.forEach(function(waste) {
          //source = addition.source,
          sourceL = waste.source;
          //console.log(waste);
      if (typeof sourceL === "number") sourceL = waste.source = nodes[waste.source];
      sourceL.sourceLinks.push(waste);
          
    });

   loop.forEach(function(circular) {
        var sourceC = circular.source,
            targetC = circular.target;
      if (typeof sourceC === "number") sourceC = circular.source = nodes[circular.source]; //making sure to get objects not numbers
      if (typeof targetC === "number") targetC = circular.target = nodes[circular.target];
      sourceC.sourceLinks.push(circular);
      targetC.targetLinks.push(circular); 
      // so this has shifted the numbers of connection into name-base labels, 
      // this has also added the feedback loops into the source/target counts... and can be internally counted below
    });



  } // end of ComputeNodeLinks

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),//+d3.sum(node.sourceAdds, value),
        d3.sum(node.targetLinks, value)//+d3.sum(node.sourceLosses, value)
        //now has add/loss/loop. . .
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          //console.log(link);
          if (link.type!=="loss" && link.type!=="loop"){ // && link.type!=="loop") does this need to be shited to exclude loops (doesn't seem likely)
              nextNodes.push(link.target);
          } else if (link.type==="loop"){ 
              //console.log(link);// && link.type!=="loop") does this need to be shited to exclude loops (doesn't seem likely)
              //nextNodes.push(link.target);
          };
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    moveSinksRight(x);
    scaleNodeBreadths((width - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });

      loop.forEach(function(loops) {
        loop.dy = loop.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
      console.log(node.targetLinks);
    });

    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
            var posLinks=[],
                postLinks=[],
                fb = 0;
      loop.forEach(function(feedback){
        if (feedback.name===node.name){
          fb += feedback.value;
        };
      });

      node.sourceLinks.forEach(function(link) {
        if (link.dy){
          posLinks.push(link.dy);
        }; // full value is full height, need from zero to start at dy+loss.dy
      });
          sy=node.dy-d3.sum(posLinks)-(fb*node.dy/node.value);
          if (sy===NaN || sy < 1){
            sy=node.dy-d3.sum(posLinks);
          };
          console.log(sy, node.name);

      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });


      node.targetLinks.forEach(function(link, i) {
        
        if (ty || i===0){
        link.ty = ty;
        ty += link.dy;
      } else {
        ty=link.value/node.value*node.dy; // where am I missing this catch earlier?
        link.ty=ty;
        ty+=link.dy;
      };
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }


  return sankey;
};
