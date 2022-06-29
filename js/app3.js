
/////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////

var margin3 = {top: 10, right: 30, bottom: 30, left: 60},
    width3 = WidthCaja - margin3.left - margin3.right,
    height3 = HeightCaja- margin3.top - margin3.bottom;


var svg3 = d3.select("#Grafica3")
  .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin3.left + "," + margin3.top + ")");


d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/data4.csv",function(data) {

  var x = d3.scaleLinear()
    .domain([1,100])
    .range([ 0, width3 ]);
  svg3.append("g")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x));


  var y = d3.scaleLinear()
    .domain([0, 13])
    .range([ height3, 0 ]);
  svg3.append("g")
    .call(d3.axisLeft(y));

  var bisect = d3.bisector(function(d) { return d.x; }).left;


  var focus = svg3
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)


  var focusText = svg3
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")


  svg3
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.x) })
      .y(function(d) { return y(d.y) })
      )

  
  svg3
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width3)
    .attr('height', height3)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);


  
  function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
  }

  function mousemove() {

    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisect(data, x0, 1);
    selectedData = data[i]
    focus
      .attr("cx", x(selectedData.x))
      .attr("cy", y(selectedData.y))
    focusText
      .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
      .attr("x", x(selectedData.x)+15)
      .attr("y", y(selectedData.y))
    }
  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
  }

})