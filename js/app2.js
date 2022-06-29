
/////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////

var margin2 = {top: 10, right: 30, bottom: 40, left: 50},
    width2 = 460 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;
var Svg2 = d3.select("#Grafica2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")")
d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/data3.csv", function(data) {

  var x2 = d3.scaleLinear()
    .domain([4*0.95, 8*1.001])
    .range([ 0, width2 ])
  Svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2).tickSize(-height2*1.3).ticks(10))
    .select(".domain").remove()


  var y2 = d3.scaleLinear()
    .domain([-0.001, 9*1.01])
    .range([ height2, 0])
    .nice()
  Svg2.append("g")
    .call(d3.axisLeft(y2).tickSize(-width2*1.3).ticks(7))
    .select(".domain").remove()

  Svg2.selectAll(".tick line").attr("stroke", "#EBEBEB")

  Svg2.append("text")
      .attr("text-anchor", "end")
      .attr("x", width2)
      .attr("y", height2 + margin2.top + 20)
      .text("Sepal Length");

  Svg2.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin2.left+20)
      .attr("x", -margin2.top)
      .text("Petal Length")

  var color2 = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#402D54", "#D18975", "#8FD175"])

  Svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x2(d.Sepal_Length); } )
      .attr("cy", function (d) { return y2(d.Petal_Length); } )
      .attr("r", 5)
      .style("fill", function (d) { return color2(d.Species) } )

})
