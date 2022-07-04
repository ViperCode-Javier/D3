let primeracolumna2 = "";
////////////////////////////////////////////////////////////////////////////////GRAFICA 2//////////////////////////////////////////////////////////////////////////

const draw2 = async (el = "#Grafica2") => {
  let data2 = await d3.csv(
    "https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datatrabajo2b.csv",
    d3.autoType
  );

  const ComboSelect2 = d3.select("#Combo2");
  let len2 = document.getElementById("Combo2").length;
  let val2 = document.getElementById("Combo2").value;
  if (len2 == 1) {
    //const Municipio = Array.from(new Set(data2.map((d) => d.Municipio)));
    //const ComboSelect2 = d3.select("#Combo2");
    //ComboSelect2.selectAll("option")
    //  .data(Municipio)
    //  .enter()
    //  .append("option")
    //  .attr("value", (d) => d)
    //  .text((d) => d);
    let headerNames = data2.columns;
    ComboSelect2.selectAll("option")
      .data(headerNames)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d);
  }
  //En este caso el valor de la columna es el valor del combo
  primeracolumna2 = val2;
  console.log(primeracolumna2)
  let max2 = d3.max(data2.map((d) => d[primeracolumna2]));
  //let max2 = 100000;
  //Ordenamos y Sacamos el Maximo
  data2.sort(function (a, b) {
    return d3.descending(a[primeracolumna2], b[primeracolumna2]);
  });

  // Accessors
  const yAccessor2 = (d) => d.Grupo_edad;
  const xAccessor2 = (d) => d[primeracolumna2];
  const margin = { top: 20, right: 10, bottom: 40, left: 90 },
    width = WidthCaja - margin.left - margin.right,
    height = HeightCaja - margin.top - margin.bottom;

  const rsvg2 = d3
    .select("#Grafica2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear().domain([0, max2]).range([0, width]);
  rsvg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-0)")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data2.map(function (d) {
        return d.Grupo_edad;
      })
    )
    .padding(0.1);

  rsvg2.append("g").call(d3.axisLeft(y));

 

  rsvg2
    .selectAll("myRect2")
    .data(data2)
    .enter()
    .append("rect")
    .transition()
    .duration(1000)
    .attr("x", x(0))
    .attr("y", (d) => y(d.Grupo_edad))
    .attr("width", function (d) {
      return x(d[primeracolumna2]);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#46B960");


  /// agregamos los Etiquetas de las Barras
  const g = rsvg2
    .append("g")
    .attr("transform", `translate(${margin.left - 65},${margin.top})`);
  const et = g.append("g");
  const etiquetas = et.selectAll("text").data(data2);
  etiquetas
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d[primeracolumna2]);
    })
    .attr("y", (d) => y(yAccessor2(d)))
    .merge(etiquetas)
    .transition()
    .duration(1000)
    .attr("x", 10000)
    .attr("y", (d) => y(yAccessor2(d)))
    .text((d) => d[primeracolumna2])
    .attr("class", "etiquetax");
};
draw2();

d3.select("#Combo2").on("change", () => {
  d3.selectAll("svg").remove();
  d3.select("rsvg2").remove();
  draw();
  draw2();
});
