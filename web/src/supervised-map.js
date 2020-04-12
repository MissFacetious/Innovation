var currentMap = 0;

function clickIndex() {
  var valueMap = document.getElementById("valueMap").value;
  selectValue.innerHTML = "File: " + valueMap;
  if (valueMap === 'innovation output') valueMap = 0;
  if (valueMap === 'prediction') valueMap = 1;
  if (valueMap === 'innovation output - prediction') valueMap = 2;
  currentMap = valueMap;
  updateData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var worldInfo;
var countries = []
var svg;
var legend;

function returnColumn(d, value) {
  if (value === 2) {
    return +Math.floor(Math.abs(d['gii_innovation_output'] - d['prediction']) /5);
  }
  if (value === 0) value = 'gii_innovation_output';
  if (value === 1) value = 'prediction';
  return Math.floor(d[value]/5);
}

function chart() {
  var min = 0;
  var max = 1;
  var myColor = d3.scaleLinear()

  svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

  var projection = d3.geoEqualEarth()
  var path = d3.geoPath().projection(projection)
  var outline = ({type: "Sphere"})

  svg.append("g")
    .attr("class", "countries")
    .attr("width", width-100)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(worldInfo, worldInfo.objects.countries).features)
    .enter().append("path")
    .attr("d", path)

  svg.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
      .attr("fill", function(d) {
        for (var i=0; i < myData.length; i++) {
          if (myData[i].country_iso === d.properties.name) {
            return myColor(returnColumn(myData[i], currentMap));
          }
        }
        return "#aaaaaa";
      })
      .attr("d", path)
      .on("click", function(d) {
        //alert(d.properties.name)
      })

  svg.append("path")
    .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

    var legendData = []
    console.log(max + " " + min);
    for (var i=0; i <= (max*10-min*10); i++) {
      legendData.push({color: myColor(i), name: i})
    }
    legendData.push({color: "#aaaaaa", name: "no data"});
}

function updateData() {
    // Get the data again
    myData = convertCountries(data);

    var min = Math.floor(d3.min(myData.map(function(d) { return +returnColumn(d, currentMap); })) / 1);
    var max = Math.ceil(d3.max(myData.map(function(d) { return +returnColumn(d, currentMap); })) / 1);

    var myColor = d3.scaleLinear()
      .domain(d3.range(min, max))
      .range(d3.quantize(d3.interpolateHcl("#f4e153", "#362142"), 10));

    // Select the section we want to apply our changes to
    countries = topojson.feature(worldInfo, worldInfo.objects.countries);
    // Make the changes
    svg.selectAll("path")
      .data(countries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < myData.length; i++) {
            if (myData[i].country_iso === d.properties.name) {
              return myColor(returnColumn(myData[i], currentMap));
            }
          }
          return "#aaaaaa";
        })
        .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")

        var legendData = []
        for (var i=0; i <= max-min; i++) {
          if ((max-min) === i) {
            legendData.push({color: myColor(i), name: (i*5) + "+ "})
          }
          else {
            legendData.push({color: myColor(i), name: (i*5) + " - " + ((i+1)*5-1)})
          }
        }
        legendData.push({color: "#aaaaaa", name: "no data"});

        d3.select("#legend").remove();

        legend = svg.append("g")
          .attr("class", "legend")
          .attr("id", "legend")
          .attr("x", width - 105)
          .attr("y", 75)
          .attr("height", 100)
          .attr("width", 100);

        legend.selectAll('g').data(legendData)
          .enter()
          .append('g')
          .each(function(d, i) {
            var g = d3.select(this);
            g.append("rect")
              .attr("x", width - margin.right - 50)
              .attr("y", i*15)
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", d.color)

            g.append("text")
              .attr("x", width - margin.right - 35)
              .attr("y", i * 15+8)
              .attr("text-anchor","start")
              .attr("height",30)
              .attr("width",100)
              .attr("font-size", 10)
              .text(d.name);
            });
}

var width = 975;
var height = 475;

var data = [[], [], [], [], [], []];

var maps = [
  "innovation output",
  "prediction",
  "innovation output - prediction",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/supervised/linear_regression.csv", function(d) {
    data.push(d);
  })
]

Promise.all(promises).then(function(world) {

  worldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names
  myData = convertCountries(data);

  countries = topojson.feature(worldInfo, worldInfo.objects.countries);
  chart();
  clickIndex();
});
