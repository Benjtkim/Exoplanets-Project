let svgW = 49850;
let svgH = 550;
let lightYears = [];

for (let i = 1; i <= 9; i++ ) {
  lightYears.push(500 * i);
};

let svg = d3.select("#myChart").append("svg")
svg.attr("width", svgW)
svg.attr("height", svgH)

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)

svg.append('line')
  .style('stroke', 'white')
  .style('stroke-width', 10)
  .attr("x1", 10)
  .attr("y1", 510)
  .attr("x2", 49800)
  .attr("y2", 500)

svg.selectAll("text")
  .data(lightYears)
  .enter()
  .append("text")
  .attr("x", (data) => data * 9.98)
  .attr("y", 525)
  .attr('stroke', 'white')
  .attr('fill', 'white')
  .style('font-size', 10)
  .text(function (data) {
    return data;
  });

svg.append('text')
  .attr('x', 10)
  .attr('y', 525)
  .attr('stroke', 'white')
  .attr('fill', 'white')
  .style('font-size', 10)
  .text(0)


svg.append('text')
  .attr('x', 10)
  .attr('y', 500)
  .attr('stroke', 'white')
  .attr('fill', 'white')
  .style('font-size', 10)
  .text('Lightyears (l.y.)')

svg.append('text')
  .attr('x', 24910)
  .attr('y', 525)
  .attr('stroke', 'white')
  .attr('fill', 'white')
  .style('font-size', 10)
  .text(2488)

svg.append('text')
  .attr('x', 49652)
  .attr('y', 525)
  .attr('stroke', 'white')
  .attr('fill', 'white')
  .style('font-size', 10)
  .text(4976)

//I got the code for the glow from https://www.visualcinnamon.com/2016/06/glow-filter-d3-visualization/
var defs = svg.append("defs");
var filter = defs.append("filter")
  .attr("id","glow");
filter.append("feGaussianBlur")
  .attr("stdDeviation", 10)
  .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
  .attr("in","coloredBlur");
feMerge.append("feMergeNode")
  .attr("in","SourceGraphic")

d3.csv("data/habitable_exoplanets.csv").then(planets => {
  svg.selectAll()
    .data(planets)
    .enter()
    .append("image")
    // .append("circle")
    .attr("xlink:href", "data/planet.png")
    .attr("fill", "red")
    .attr("x", function(d) { return d.distance * 9.98 })
    .attr("y", function(d, i) { return ((i * 50) % 400) + 100 })
    .attr("width", function(d) { return d.radius / 2000 })
    .attr("height", function(d) { return d.radius / 2000 })
    .style("filter", "url(#glow)")
    .on("mouseover", function(event, d) {
      console.log(d);
      d3.select(this).attr("stroke", "blue");
      div.transition()
        .duration(200)
        .style("opacity", .9);
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
    })
});



