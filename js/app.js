/////////////////////////////////////////////////////////////////////////////////CONSTANTESGLOBALES///////////////////////////////////////////////////////////////////
const WidthCaja = 480;
const HeightCaja = 450;
let primeracolumna = "";
////////////////////////////////////////////////////////////////////////////////GRAFICA 1//////////////////////////////////////////////////////////////////////////

const draw = async (el = "#Grafica1") => {
  let data = await d3.csv(
    "https://raw.githubusercontent.com/ViperCode-Javier/D3/main/datatrabajo1.csv",
    d3.autoType
  );

  const ComboSelect = d3.select("#Combo1");
  let len = document.getElementById("Combo1").length;
  let val = document.getElementById("Combo1").value;

  if (len == 1) {
    let headerNames = data.columns;
    ComboSelect.selectAll("option")
      .data(headerNames)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d);
  }

  //Seleccionamos el primer filtro
  if (ComboSelect.empty()) {
    primeracolumna = data.columns[1];
  } else {
    primeracolumna = val;
  }

  let max = d3.max(data.map((d) => d[primeracolumna]));
  max = max + 1200;
  //Ordenamos y Sacamos el Maximo
  data.sort(function (a, b) {
    return d3.descending(a[primeracolumna], b[primeracolumna]);
  });
  // Accessors
  const yAccessor = (d) => d.Municipio;
  const margin = { top: 20, right: 80, bottom: 40, left: 90 },
    width = WidthCaja - margin.left - margin.right,
    height = HeightCaja - margin.top - margin.bottom;

  const svg = d3
    .select("#Grafica1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear().domain([0, max]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-)")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d) {
        return d.Municipio;
      })
    )
    .padding(0.1);

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(1000)
    .attr("x", x(0))
    .attr("y", (d) => y(yAccessor(d)))
    .attr("width", function (d) {
      return x(d[primeracolumna]);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#457b9d");
    
  /// agregamos los Etiquetas de las Barras
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left - 65},${margin.top})`);
  const et = g.append("g");
  const etiquetas = et.selectAll("text").data(data);
  etiquetas
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d[primeracolumna]);
    })
    .attr("y", (d) => y(yAccessor(d)))
    .merge(etiquetas)
    .transition()
    .duration(1000)
    .attr("x", function (d) {
      return x(d[primeracolumna]);
    })
    .attr("y", (d) => y(yAccessor(d)))
    .text((d) => d[primeracolumna])
    .attr("class", "etiquetax");
};
draw();

d3.select("#Combo1").on("change", () => {
  d3.selectAll("svg").remove();
  d3.select("rsvg2").remove();
  draw();
  draw2();
});
