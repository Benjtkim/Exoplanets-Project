let svgW = 10000;
let svgH = 800;

let svg = d3.select("#myPlanet").append("svg");
svg.attr("width", svgW);
svg.attr("height", svgH);

var Tooltip = d3.select("#myPlanet")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")

d3.csv("data/habitable_exoplanets.csv").then(planets => {
  // create the circles from the apples array

  console.log("max light years: ", d3.max(planets.map(planet => planet.distance)));
  
  svg.selectAll()
    .data(planets)
    .enter()
    .append("circle")
    .attr("fill", "red")
    .attr("cx", function(d) { return d.distance*30; })
    .attr("cy", function(d, i) { return 20+Math.random()*(svgH-10) })
    .attr("r", function(d) { return 10; })

    .on('mouseenter', function (d) {
      d3.select(this).attr("stroke", "blue");
      d3.select('#myPlanet').html(d.properties.name);
      Tooltip.style("opacity", 1)
      d3.select(this)
      d3.style("stroke", "black")
      d3.style("opacity", 1)
    })

    .on('mouseleave', function (d) {
      d3.select(this).attr("stroke", "none")
      d3.select(this).html(d.properties.name)
      Tooltip.style("opacity", 0)
      d3.select(this)
      d3.style("stroke", "none")
      d3.style("opacity", 0.8)
  })
});



