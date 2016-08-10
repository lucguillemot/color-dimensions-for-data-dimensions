function setLabColor(La, Lb, MinMaxA, MinMaxB) {

    var labAScale = d3.scaleLinear()
        .domain(MinMaxA) // PC1 min and max
        .range([-100, 100]);
    
    var labBScale = d3.scaleLinear()
        .domain(MinMaxB) // PC2 min and max
        .range([-100, 100]);
   
    /*var labLScale = d3.scaleLinear()
        .domain([-8, 4])
        .range([0, height])
        .clamp(true);*/

    var a = labAScale(La),
        b = labBScale(Lb);

    return d3.lab(L, a, b);
}

function setBrewerColor(data) {
    var brewerColors = ['#8dd3c7','#fb8072','#bebada','#ffffb3','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5', '#dedede', '#ffed6f', '#e0f3f8', '#ffa696'];
	switch(data) {
        case 1: return brewerColors[0]; break;
        case 2: return brewerColors[1]; break;
        case 3: return brewerColors[2]; break;
        case 4: return brewerColors[3]; break;
        case 5: return brewerColors[4]; break;
        case 6: return brewerColors[5]; break;
        case 7: return brewerColors[6]; break;
        case 8: return brewerColors[7]; break;
        case 9: return brewerColors[8]; break;
        case 10: return brewerColors[9]; break;
        case 11: return brewerColors[10]; break;
        case 12: return brewerColors[11]; break;
        case 13: return brewerColors[12]; break;
        case 14: return brewerColors[13]; break;
        case 15: return brewerColors[14]; break;
      }
}

function displayLab(id, width, height) {
    var labAScale = d3.scaleLinear()
            .domain([0, width])
            .range([-100, 100]);
    var labBScale = d3.scaleLinear()
            .domain([0, height])
            .range([-100, 100]);
    var labLScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, height])
            .clamp(true);

    var canvas =  d3.select(id)
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style("width", width + "px")
        .style("height", height + "px")
        .node(),

    context = canvas.getContext("2d"),
    image = context.createImageData(width, height);

    var y = -1,
        i = -1;

    while (++y < height) {
        for (var x = 0, c; x < width; ++x) {
            var a = Math.round(labAScale(x)),
                b = Math.round(labBScale(y));
            c = d3.lab(L, a, b).rgb();
            image.data[++i] = c.r;
            image.data[++i] = c.g;
            image.data[++i] = c.b;
            image.data[++i] = 255;
        }
    }

    context.putImageData(image, 0, 0);
}