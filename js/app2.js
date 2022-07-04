
/////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////
const draw = async (el = "#Grafica2") => {
  var margin2 = {top: 10, right: 30, bottom: 40, left: 50},
      width2 = WidthCaja - margin2.left - margin2.right,
      height2 = HeightCaja - margin2.top - margin2.bottom;
  
  var svg2 = d3.select("#Grafica2")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
  
  //const dataset = await d3.csv("dataset2.csv", d3.autoType)
  d3.csv("dataset2.csv", function(data) {
  
    /***************** Combo ****************/ 
  
  const Municipio = Array.from(new Set(data.map((d) => d.Municipio)))
  const Combo2 = d3.select("#Combo2")
  Combo2
    .selectAll("option")
    .data(Municipio)
    .enter()
    .append("option")
    .attr("value", (d) => d)
    .text((d) => d)
  
  
  const xAccessor = (d) => d.ComboSelect
  const yAccessor = (d) => d.Grupo_edad
  
    var x2 = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor)) //.domain([0, 5])
      .range([ 0, width2 ])
      .nice()
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2).tickSize(-height2*1.3).ticks(5))
      .select(".domain").remove()
  
  
    var y2 = d3.scaleLinear()
      .domain([0, 20000])  //1.01 --eje y
      .range([ height2, 0])
      .nice()
    svg2.append("g")
      .call(d3.axisLeft(y2).tickSize(-width2*1.3).ticks(10))
      .select(".domain").remove()
  
    svg2.selectAll(".tick line").attr("stroke", "#EBEBEB")
  
    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("x", width2)
        .attr("y", height2 + margin2.top + 20)
        .text("Grupo de Edades")
  
    svg2.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin2.left+20)
        .attr("x", -margin2.top)
        .text("Horas de trabajo")
  
    var color2 = d3.scaleOrdinal()
      .domain(Municipio)
      .range(d3.schemeTableau10)
  
  
  
  svg2.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .merge(svg2)
  .attr("cx", (d) => x2(d.Grupo_edad) )
  .attr("cy", (d) => y2(d.Menos_de_15_horas) )
  .attr("r", 5)
  .attr("fill", (d) => color2(d.Municipio) )
  })
  
  /*Combo2.on("change", (event) => {
   event.preventDefault()
    draw()
  })
  */
  }
  
  draw()
  
  d3.select("#Combo2").on("change", () => {    
    d3.select("svg2")
    .remove(); 
    draw()
   })