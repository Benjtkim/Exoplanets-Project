let svgW = 10000;
let svgH = 800;

let svg = d3.select("#myChart").append("svg");
svg.attr("width", svgW);
svg.attr("height", svgH);

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);



const svgLine = d3.select('#svgline')

svgLine.append('line')
  .style('stroke', 'black')
  .style('stroke-width', 10)
  .attr("x1", 0)
  .attr("y1", 150)
  .attr("x2", 200)
  .attr("y2", 150); 

d3.csv("data/habitable_exoplanets.csv").then(planets => {
  // create the circles from the apples array

  console.log("max light years: ", d3.max(planets.map(planet => planet.distance)));

  svg.selectAll()
    .data(planets)
    .enter()
    .append("circle")
    .attr("fill", "red")
    .attr("cx", function(d) { return d.distance * 50; })
    .attr("cy", function(d, i) { return 20 + Math.random() * (svgH - 20) })
    .attr("r", function(d) { return 10; })
    .on("mouseover", function(event, d) {
      console.log(d);
      d3.select(this).attr("stroke", "blue");
      div.transition()
        .duration(200)
        .style("opacity", .9);
      // div.html(formatTime(d.date) + "<br/>" + d.close)
      div.html("Name: "+ d.name + "\nDistance (l.y.): "+ d.distance + "\nPlanet Type: " + d.planet_type + "\nDiscovery Year: " + 
      d.discovery_year + "\nMass (kg): " + d.mass + "\nRadius (mil): " + d.radius)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      d3.select(this).attr("stroke", "none")
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });
});



