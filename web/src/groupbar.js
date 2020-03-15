var margin = {top: 20, right: 50, bottom: 50, left: 100}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 350 - margin.top - margin.bottom; // Use the window's height


var countries = JSON.parse('['+
  '{"Country":"US","Innovation":"88","Wealth":"99","Happy":"55","Healthy":"85","Education":"66"},'+
  '{"Country":"CN","Innovation":"88","Wealth":"89","Happy":"55","Healthy":"76","Education":"66"},'+
  '{"Country":"JP","Innovation":"89","Wealth":"93","Happy":"55","Healthy":"93","Education":"66"},'+
  '{"Country":"NR","Innovation":"85","Wealth":"67","Happy":"55","Healthy":"89","Education":"66"},'+
  '{"Country":"DN","Innovation":"84","Wealth":"56","Happy":"55","Healthy":"90","Education":"66"},'+
  '{"Country":"SA","Innovation":"68","Wealth":"32","Happy":"55","Healthy":"68","Education":"66"}'+
']');

var region = JSON.parse('['+
  '{"Region":"NA","Innovation":"88","Wealth":"99","Happy":"55","Healthy":"85","Education":"66"},'+
  '{"Region":"SA","Innovation":"88","Wealth":"89","Happy":"55","Healthy":"76","Education":"66"},'+
  '{"Region":"Africa","Innovation":"89","Wealth":"93","Happy":"55","Healthy":"93","Education":"66"},'+
  '{"Region":"EU","Innovation":"85","Wealth":"67","Happy":"55","Healthy":"89","Education":"66"},'+
  '{"Region":"Australia","Innovation":"84","Wealth":"56","Happy":"55","Healthy":"90","Education":"66"},'+
  '{"Region":"Asia","Innovation":"68","Wealth":"32","Happy":"55","Healthy":"68","Education":"66"}'+
']');

var country = JSON.parse('['+
  '{"Country":"US","Innovation":"88","Wealth":"99","Happy":"55","Healthy":"85","Education":"66"}'+
']');

showGraph(countries);

function showGraph(data) {
  var keys = Object.keys(data[0])
  var groupKey = keys[0];
  
  var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x0 = d3.scaleBand()
    .domain(data.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.01)

  var x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(keys, key => +d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top])

  var color = d3.scaleOrdinal()
    .range(["#689bd0", "#7eaa55", "#f6c143", "#eb4034", "#ff8303"])

    svg.selectAll("g")
      .data(data)
        .join("g")
          .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
        .selectAll("rect")
        .data(d => keys.map(key => ({key, value: d[key]})))
        .join("rect")
          .attr("x", d => x1(d.key))
          .attr("y", d => y(+d.value))
          .attr("width", x1.bandwidth())
          .attr("height", d => y(0) - y(+d.value))
          .attr("fill", d => color(d.key));

  var xAxis = svg.append("g")
    .attr("transform",`translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove())

  var yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  var legendData = [
    { "color": "#689bd0", "name": "Innovation" },
    { "color": "#7eaa55", "name": "Wealth" },
    { "color": "#f6c143", "name": "Happy" },
    { "color": "#eb4034", "name": "Healthy" },
    { "color": "#ff8303", "name": "Education" }
  ]

  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width - 65)
    .attr("y", 75)
    .attr("height", 100)
    .attr("width", 100);

    legend.selectAll('g').data(legendData)
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);

        g.append("rect")
          .attr("x", width - 65)
          .attr("y", i*15)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", d.color)

        g.append("text")
          .attr("x", width - 50)
          .attr("y", i * 15+8)
          .attr("height",30)
          .attr("width",100)
          .attr("font-size", 10)
          .text(d.name);
        });
}
