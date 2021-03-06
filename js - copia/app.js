
/////////////////////////////////////////////////////////////////////////////////CONSTANTESGLOBALES///////////////////////////////////////////////////////////////////
const WidthCaja = 480
const HeightCaja =400
/////////////////////////////////////////////////////////////////////////////////GRAFICA 1//////////////////////////////////////////////////////////////////////////

  var margin = {top: 20, right: 10, bottom: 40, left: 90},
  width = WidthCaja - margin.left - margin.right,
  height = HeightCaja - margin.top - margin.bottom;
  var svg = d3.select("#Grafica1")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
     
d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datatrabajo1.csv", function(data) {
//Aqui Llenamos el Combo de la Gráfica
var headerNames = d3.keys(data[0]);
var FirstHeader = headerNames[1]; 
const ComboSelect = d3.select("#Combo1")
ComboSelect
.selectAll("option")
.data(headerNames)
.enter()
.append("option")
.attr("value", (d) => d)
.text((d) => d)
d3.select('#Combo1').property('value', FirstHeader);
//Aqui seleccionamos el primer elemento de la Grafica
data.sort(function(a, b){
return b[FirstHeader]-a[FirstHeader];
});
///Aqui ordenamos los datos
var max = d3.max(data.map(d => parseFloat(d.Hombre)));
var x = d3.scaleLinear()
  .domain([0, max])
  .range([ 0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
     .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-0)")
    .style("text-anchor", "end");
var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) {return d.Municipio; }))
  .padding(.1);
svg.append("g")
  .call(d3.axisLeft(y))
svg.selectAll("myRect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", x(0) )
  .attr("y", function(d) { return y(d.Municipio); })
  .attr("width", function(d) { return x(d.Hombre); })
  .attr("height", y.bandwidth() )
  .attr("fill", "#0C4B68 ")
})

function actualizardata1(){




}