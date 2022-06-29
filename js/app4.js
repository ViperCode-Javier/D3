
/////////////////////////////////////////////////////////////////////////////////GRAFICA 4//////////////////////////////////////////////////////////////////////////

var margin4 = {top: 10, right: 20, bottom: 30, left: 50},
    width = WidthCaja - margin4.left - margin4.right,
    height = HeightCaja - margin4.top - margin4.bottom;

var svg4 = d3.select("#Grafica4")
  .append("svg")
    .attr("width", width + margin4.left + margin4.right)
    .attr("height", height + margin4.top + margin4.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin4.left + "," + margin4.top + ")");

d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/data5.csv", function(data) {


  var x4 = d3.scaleLinear()
    .domain([0, 12000])
    .range([ 0, width ]);
  svg4.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x4));


  var y4 = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg4.append("g")
    .call(d3.axisLeft(y4));


  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);


  var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet2);


  svg4.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x4(d.gdpPercap); } )
      .attr("cy", function (d) { return y4(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", function (d) { return myColor(d.continent); } )
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "2px")

  })