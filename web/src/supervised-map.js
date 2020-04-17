var currentSupervisedMap = 0;
var mySupervisedData = [];

function clickSupervisedIndex() {
  var valueMap = document.getElementById("supervisedValueMap").value;
  currentSupervisedMap = +valueMap;
  updateSupervisedData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var supervisedWorldInfo;
var supervisedCountries = []
var supervisedSvg;
var supervisedLegend;

function returnSupervisedColumn(d, value) {
  if (value === 2) {
    return +Math.floor(Math.abs(+d['gii_innovation_output'] - +d['rfe_prediction']) / 5);
  }
  if (value === 4) {
    return +(Math.abs(+d['gii_innovation_output'] - +d['lasso_prediction']) *0.2);
  }
  if (value === 0) value = 'gii_innovation_output';
  if (value === 1) value = 'rfe_prediction';
  if (value === 3) value = 'lasso_prediction';
  return Math.floor(+d[value]/5);
}

function supervisedChart() {
  var min = 0;
  var max = 1;
  var myColor = d3.scaleLinear()

  supervisedSvg = d3.select("#supervisedMap").append("svg")
    .attr("width", width)
    .attr("height", height);

  var projection = d3.geoEqualEarth()
  var path = d3.geoPath().projection(projection)
  var outline = ({type: "Sphere"})

  supervisedSvg.append("g")
    .attr("class", "countries")
    .attr("width", width-100)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(supervisedWorldInfo, supervisedWorldInfo.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
}

function updateSupervisedData() {
    // Get the data again
    mySupervisedData = convertCountries(supervisedData);

    var min = Math.floor(d3.min(mySupervisedData.map(function(d) { return +returnSupervisedColumn(d, currentSupervisedMap); })) / 1);
    var max = Math.ceil(d3.max(mySupervisedData.map(function(d) { return +returnSupervisedColumn(d, currentSupervisedMap); })) / 1);

    var myColor = d3.scaleLinear()
      .domain(d3.range(min, max))
      .range(d3.quantize(d3.interpolateHcl("#f4e153", "#362142"), 10));

    // Select the section we want to apply our changes to
    supervisedCountries = topojson.feature(supervisedWorldInfo, supervisedWorldInfo.objects.countries);
    // Make the changes
    supervisedSvg.selectAll("path")
      .data(supervisedCountries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < mySupervisedData.length; i++) {
            if (mySupervisedData[i].country_iso === d.properties.name) {
              return myColor(returnSupervisedColumn(mySupervisedData[i], currentSupervisedMap));
            }
          }
          return "#aaaaaa";
        })
        .datum(topojson.mesh(supervisedWorldInfo, supervisedWorldInfo.objects.countries, (a, b) => a !== b))

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

        d3.select("#supervisedLegend").remove();

        supervisedLegend = supervisedSvg.append("g")
          .attr("class", "legend")
          .attr("id", "supervisedLegend")
          .attr("x", width - 105)
          .attr("y", 75)
          .attr("height", 100)
          .attr("width", 100);

        supervisedLegend.selectAll('g').data(legendData)
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

var supervisedData = [[], [], [], [], [], []];

var maps = [
  "innovation output",
  "prediction",
  "innovation output - prediction",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./web/data/lr_predictions.csv", function(d) {
    supervisedData.push(d);
  })
]

Promise.all(promises).then(function(world) {

  supervisedWorldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names
  mySupervisedData = convertCountries(supervisedData);

  supervisedCountries = topojson.feature(supervisedWorldInfo, supervisedWorldInfo.objects.countries);
  supervisedChart();
  clickSupervisedIndex();
});
