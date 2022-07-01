
/////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////

var margin2 = {top: 10, right: 30, bottom: 40, left: 50},
    width2 = WidthCaja - margin2.left - margin2.right,
    height2 = HeightCaja - margin2.top - margin2.bottom;
var Svg2 = d3.select("#Grafica2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")")
d3.csv("https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datatrabajo2.csv", function(data) {
//Aqui Llenamos el Combo de la Gráfica
var headerNames2 = d3.keys(data[0]);
var FirstHeader2 = headerNames2[1]; 
const ComboSelect2 = d3.select("#Combo2")
ComboSelect2
.selectAll("option")
.data(headerNames2)
.enter()
.append("option")
.attr("value", (d) => d)
.text((d) => d)
d3.select('#Combo2').property('value', FirstHeader2);
//Aqui seleccionamos el primer elemento de la Grafica
data.sort(function(a, b){
  return b[FirstHeader2]-a[FirstHeader2];
  });
///Aqui ordenamos los datos
var max2 = d3.max(data.map(d => parseFloat(d.Hombre)));
console.log(FirstHeader2)
  var x2 = d3.scaleLinear()
    //.domain([4*0.95, 8*1.001])
    .domain([0,200000])
    .range([ 0, width2 ])
  Svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2).tickSize(-height2*1.3).ticks(10))
    .select(".domain").remove()


  var y2 = d3.scaleLinear()
    .domain([0, 15000])
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
    .domain(["Menos15", "De15a30" ])
    .range([ "#402D54", "#D18975"])

  Svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x2(d.Menos15); } )
      .attr("cy", function (d) { return y2(d.De15a30); } )
      .attr("r", 5)
      .style("fill", function (d) { return color2(d.Municipio) } )

})
