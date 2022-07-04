
let primeracolumna2 = ""
////////////////////////////////////////////////////////////////////////////////GRAFICA 1//////////////////////////////////////////////////////////////////////////

const draw2 = async (el = "#Grafica2") => {
  let data2 = await d3.csv(
    "https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datatrabajo2.csv",
    d3.autoType
  );

  const ComboSelect2 = d3.select("#Combo2");
  let len2 = document.getElementById("Combo2").length;
  let val2 = document.getElementById("Combo2").value;
  console.log(len2)
  console.log(val2)


  if (len2==1) {    
    const Municipio = Array.from(new Set(data2.map((d) => d.Grupo_edad)))
    const ComboSelect2 = d3.select("#Combo2")
       ComboSelect2
      .selectAll("option")
      .data(Municipio)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d)  
  }
  
  //Seleccionamos el primer filtro
  if (ComboSelect2.empty()) {
   primeracolumna2 = data2.columns[1]; 
   console.log(primeracolumna2)     
  }
  else
  {
    primeracolumna2 =val2 
    console.log(val2)   
  }

  let max2 = d3.max2(data2.map((d) => d[primeracolumna2]));
 
  //Ordenamos y Sacamos el Maximo
  data2.sort(function (a, b) {
    return d3.descending(a[primeracolumna2], b[primeracolumna2]);
  });

// Accessors
  const yAccessor2 = (d) => d.Grupo_edad
  const margin = { top: 20, right: 10, bottom: 40, left: 90 },
    width = WidthCaja - margin.left - margin.right,
    height = HeightCaja - margin.top - margin.bottom;

  const svg2 = d3
    .select("#Grafica2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 const x = d3.scaleLinear().domain([0, max2]).range([0, width]);
  svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-90)")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
  .domain(
      data2.map(function (d) {
        return d.Grupo_edad;
     })    )
     .padding(0.1);

  svg2.append("g").call(d3.axisLeft(y));

  svg2
    .selectAll("myRect")
    .data(data2)
    .enter()
    .append("rect")
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .attr("x", x(0))
    .attr("y", (d) => y(yAccessor2(d)))
    //.attr("width", (d) => x(xAccessor(d)))
    .attr("width",  function(d) { return x(d[primeracolumna2]); })
    .attr("height", y.bandwidth())
    .attr("fill", "#457b9d");   

  svg2
  .selectAll("text")
  .data(data2)
  .enter()
  .append("text")
  .attr("x", x(0))
  .attr("y", (d) => y(yAccessor2(d)))
  .text(function(d) {x(d[primeracolumna2]);})
   
};
draw2()

d3.select("#Combo2").on("change", () => {    
 d3.select("svg2")
 .remove(); 
 draw2()
})





