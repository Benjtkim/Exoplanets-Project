let svgW = 50000;
let svgH = 550;
let previousCoordinate = -1000;

let svg = d3.select("#myChart").append("svg");
svg.attr("width", svgW);
svg.attr("height", svgH);

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


svg.append('line')
  .style('stroke', 'white')
  .style('stroke-width', 10)
  .attr("x1", 50)
  .attr("y1", 500)
  .attr("x2", 9600)
  .attr("y2", 500)

d3.csv("data/habitable_exoplanets.csv").then(planets => {
  // create the circles from the apples array

  console.log("max light years: ", d3.max(planets.map(planet => planet.distance)));

  svg.selectAll()
    .data(planets)
    .enter()
    .append("circle")
    .attr("fill", "red")
    .attr("cx", function(d) {return d.distance * 10;})
    .attr("cy", function(d, i) {
      let yCoordinate = 100 + Math.random() * 300
      while (previousCoordinate - 200 < yCoordinate && yCoordinate < previousCoordinate + 200) {
        yCoordinate = 100 + Math.random() * 300
      }
      previousCoordinate = yCoordinate;
      return yCoordinate})
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