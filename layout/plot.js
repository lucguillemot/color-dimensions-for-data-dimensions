function displayPca(data, id, w, h, margin, color, r, num) {
    // Principal Components layout
    //var pca_margin = {top: 20, right: 20, bottom: 30, left: 40},
    var width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;
    // Scales
    var x = d3. scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    data.forEach(d => {
        d.PC1 = +d.PC1;
        d.PC2 = +d.PC2;
        d.PC3 = +d.PC3;
    });

    x.domain(d3.extent(data, function(d) { return d.PC1; }));
    y.domain(d3.extent(data, function(d) { return d.PC2; }));

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("circle")
        .data(data)
            .enter()
        .append("circle")
        //.attr("class", function(d){ return "cl-circle cl-"+d.cluster })
        .attr("class", "pca-circle-"+num)
        .attr("cluster-circle", function(d) { return "cl"+d.cluster; })
        .attr("Geo_FIPS-circle", function(d) { return "cl"+d.Geo_FIPS; })
        .attr("cx", function(d) { return x(d.PC1); })
        .attr("cy", function(d) { return y(d.PC2); })
        .attr("r", r)
        .attr("fill", function(d) {
            if (color == "cb") { return setBrewerColor(+d.cluster); }
            else { return setLabColor(d.PC1, d.PC2, [-8, 8], [-8, 4]); }
        });

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis axis--x-"+num)
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axis axis--y-"+num)
        .call(d3.axisLeft(y));

    // Axis labels
    svg.append("text")
        .attr("class", "x label label"+num)
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("PC1")
      .on("click", function(){
        d3.selectAll(".x.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentXPC = "PC1";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );
    svg.append("text")
        .attr("class", "x label label"+num)
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 15)
        .attr("fill", "#bbb")
        .text("PC2")
      .on("click", function(){
        d3.selectAll(".x.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentXPC = "PC2";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );
    svg.append("text")
        .attr("class", "x label label"+num)
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 24)
        .attr("fill", "#bbb")
        .text("PC3")
      .on("click", function(){
        d3.selectAll(".x.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentXPC = "PC3";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );
    svg.append("text")
        .attr("class", "y label label"+num)
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#bbb")
        .text("PC1")
      .on("click", function(){
        d3.selectAll(".y.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentYPC = "PC1";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );
    svg.append("text")
        .attr("class", "y label label"+num)
        .attr("text-anchor", "end")
        .attr("y", 15)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("PC2")
      .on("click", function(){
        d3.selectAll(".y.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentYPC = "PC2";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );
    svg.append("text")
        .attr("class", "y label label"+num)
        .attr("text-anchor", "end")
        .attr("y", 24)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#bbb")
        .text("PC3")
      .on("click", function(){
        d3.selectAll(".y.label.label"+num).attr("fill", "#bbb");
        d3.select(this).attr("fill", "#000");
        currentYPC = "PC3";
        pcaTransition(data, num, color);
        mapColorTransition(data, color);
      }
    );

function mapColorTransition(data, color) {
    data.forEach(d => {
        clusterById[d.Geo_FIPS] = +d.cluster;
        xById[d.Geo_FIPS] = switchXPC(d);
        yById[d.Geo_FIPS] = switchYPC(d);
    });

    x.domain(d3.extent(data, function(d) { return switchXPC(d); }));
    y.domain(d3.extent(data, function(d) { return switchYPC(d); }));

    d3.selectAll("div#pcaMap > svg > g > path")
        .data(data)
      .transition()
        .duration(1000)
        .style("fill", function(d) {
            var geo = d3.select(this).attr("Geo_FIPS");
            if (color == "lab" && xById[geo] != null) {
                return setLabColor(xById[geo], yById[geo], x.domain(), y.domain() ); 
            }
        });
}

function pcaTransition(data, num, color) {
    data.forEach(d => {
        d.PC1 = +d.PC1;
        d.PC2 = +d.PC2;
        d.PC3 = +d.PC3;
    });
    
    x.domain(d3.extent(data, function(d) { return switchXPC(d); }));
    y.domain(d3.extent(data, function(d) { return switchYPC(d); }));

    d3.selectAll(".pca-circle-"+num)
        .data(data)
      .transition()
        .duration(1000)
        .attr("cx", function(d) { return x(switchXPC(d)); })
        .attr("cy", function(d) { return y(switchYPC(d)); })
        .attr("fill", function(d) {
            if (color == "lab") { 
                var a = switchXPC(d);
                var b = switchYPC(d);
                return setLabColor(a, b, x.domain(), y.domain() ); 
            }
        });

    d3.select(".axis--x-"+num)
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x));
    d3.select(".axis--y-"+num)
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
    }
}

function switchXPC(d) {
    switch(currentXPC) { 
        case "PC1": return d.PC1; break;
        case "PC2": return d.PC2; break;
        case "PC3": return d.PC3; break;
    }
}

function switchYPC(d) {
    switch(currentYPC) { 
        case "PC1": return d.PC1; break;
        case "PC2": return d.PC2; break;
        case "PC3": return d.PC3; break;
    }
}

// FORCE
function displayForce(id, graph, w, h, margin) {
    var width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var svg = d3.select(id).append("svg")
                .attr("class", "force")
                .attr("width", w)
                .attr("height", h)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(function(d){ return (d.value*130); }))
            .force("center", d3.forceCenter(width / 2, height / 2)) // does not modify relative positions
            .force("collide", d3.forceCollide(20))
            //.force("charge", d3.forceManyBody().strength(function(d){ console.log(d.value); return d.value; }))
            ; 

    var link = svg.append("g")
            .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line");

    var nodes = svg.selectAll(".node")
          .data(graph.nodes)
        .enter().append("g")
          .attr("class", "node");
//                .call(d3.drag()
//                      .on("start", dragstarted)
//                      .on("drag", dragged));

    var node = nodes.append("circle")
          .attr("class", function(d) { return "force-circle "+d.id; })
          .attr("r", 9);

    var label = nodes.append("text")
          .attr("class", "force-labels")
          .text(function(d) { return d.id; });   

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

        label.attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; });

        getNodeColorValue();
    }
}

function getNodeColorValue() {
    // Get node position + update colors on the map.
    d3.selectAll(".force-circle").each(function(d, i) {
        d3.selectAll(".tracts-force-lab[cluster=cl"+(i+1)+"]").style("fill", function(i) {
            //console.log(d);
            return setLabColor(d.x, d.y, [0, 360], [0, 360]);
        });
    })
} // getNodeColorValue()
