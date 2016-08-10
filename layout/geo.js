function displayMap(tracts, clusters, id, width, height, color = "cb", classe = "tracts") {

	var svg = d3.select(id).append("svg").attr("width", width).attr("height", height);
	var map = svg.append("g").attr("class", "map");

	var projection = d3.geoMercator().center([-122.3871, 37.7729])
        .scale(60000)
        .translate([width/2, height/2]);

	clusters.forEach(d => {
		clusterById[d.Geo_FIPS] = +d.cluster;
		pca1ById[d.Geo_FIPS] = +d.PC1;
		pca2ById[d.Geo_FIPS] = +d.PC2;
	});

	map.selectAll("path")
		.data(tracts.features)
		.enter().append("path")
			.attr("class", classe)
			.attr("cluster", function(d){
				return "cl"+clusterById[+d.properties.GEOID];
			})
			.attr("Geo_FIPS", function(d) {
				return +d.properties.GEOID;
			})
			.style("fill", function(d){ 
				if (pca1ById[+d.properties.GEOID] != null) {
					if (color == "cb") { return setBrewerColor(clusterById[+d.properties.GEOID]); }
					else { return setLabColor(pca1ById[+d.properties.GEOID], pca2ById[+d.properties.GEOID], [-8, 8], [-8, 4]); }
				}	
			})
			.attr("d", d3.geoPath().projection(projection));
	
	// Overlay rect for pan & zoom function
	svg.append("rect")
	    .attr("width", width)
	    .attr("height", height)
	    .style("fill", "none")
	    .style("pointer-events", "all")
	    .call(d3.zoom()
	        .scaleExtent([1 / 2, 4])
	        .on("zoom", zoomed));

	function zoomed() {
	  map.attr("transform", d3.event.transform);
	}
}