/////////////////////////////////////////////////////////////////////////////////GRAFICA 1//////////////////////////////////////////////////////////////////////////
var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    var svg = d3.select("#Grafica1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/data.csv", function(data) {
var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Country; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Country); })
    .attr("width", function(d) { return x(d.Value); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
})
/////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////
const graf = d3.select("#Grafica2")
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const margins = {
  top: 60,
  right: 20,
  bottom: 75,
  left: 100,
}
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom
const svg2 = graf
  .append("svg2")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "graf")
const layer = svg2
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)
layer
  .append("rect")
  .attr("height", alto)
  .attr("width", ancho)
  .attr("fill", "white")
const g = svg2
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)
const load = async (variable = "clientes") => {
  data = await d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datagraph2.csv", d3.autoType)
  const yAccessor = (d) => d[variable]
  const xAccessor = (d) => d.tienda
  //data.sort((a, b) => yAccessor(b) - yAccessor(a))
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .range([alto, 0])
  console.log(data)
  console.log(d3.map(data, xAccessor))
  const x = d3
    .scaleBand()
    .domain(d3.map(data, xAccessor))
    .range([0, ancho])
    .paddingOuter(0.2)
    .paddingInner(0.1)
  const rect = g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(xAccessor(d)))
    .attr("y", (d) => y(yAccessor(d)))
    .attr("width", x.bandwidth())
    .attr("height", (d) => alto - y(yAccessor(d)))
    .attr("fill", "#e9c46a")
  const et = g
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => x(xAccessor(d)) + x.bandwidth() / 2)
    .attr("y", (d) => y(yAccessor(d)))
    .text(yAccessor)
  g.append("text")
    .attr("x", ancho / 2)
    .attr("y", -15)
    .classed("titulo", true)
    .text(`${variable} de las Tiendas`)
  const xAxis = d3.axisBottom(x)
  const yAxis = d3.axisLeft(y).ticks(8)
  const xAxisGroup = g
    .append("g")
    .attr("transform", `translate(0, ${alto})`)
    .classed("axis", true)
    .call(xAxis)
  const yAxisGroup = g.append("g").classed("axis", true).call(yAxis)
}
load("margen")

