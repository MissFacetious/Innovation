var currentUnsupervisedCluster = 0;
var myUnsupervisedData = [];

function clickUnsupervisedIndex() {
  var valueCluster = document.getElementById("unsupervisedValueCluster").value;
  currentUnsupervisedCluster = valueCluster;
  var selectValue = document.getElementById("unsupervisedSelectValue");
  selectValue.innerHTML = "File: " + valueCluster;
  updateUnsupervisedData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var unsupervisedWorldInfo;
var unsupervisedCountries = []
var unsupervisedSvg;
var unsupervisedLegend;

function unsupervisedChart() {

  var min = d3.min(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))
  var max = d3.max(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))

  var myColor = d3.scaleSequential()
    .domain([min, max])
    .interpolator(d3.interpolateViridis);

  unsupervisedSvg = d3.select("#unsupervisedMap").append("svg")
    .attr("width", width)
    .attr("height", height);

  var projection = d3.geoEqualEarth()
  var path = d3.geoPath().projection(projection)
  var outline = ({type: "Sphere"})

  unsupervisedSvg.append("g")
    .attr("class", "countries")
    .attr("width", width-100)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
}

function updateUnsupervisedData() {
    // Get the data again
    myUnsupervisedData = convertCountries(unsupervisedData);

    var min = d3.min(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))
    var max = d3.max(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))

    var myColor = d3.scaleSequential()
      .domain([min, max])
      .interpolator(d3.interpolateViridis);
    // Select the section we want to apply our changes to
    unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
    // Make the changes
    unsupervisedSvg.selectAll("path")
      .data(unsupervisedCountries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < myUnsupervisedData.length; i++) {
            if (myUnsupervisedData[i].country_iso === d.properties.name) {
              return myColor(myUnsupervisedData[i][currentUnsupervisedCluster]);
            }
          }
          return "#aaaaaa";
        })
        .datum(topojson.mesh(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries, (a, b) => a !== b))

        var legendData = []
        for (var i=0; i <= max-min; i++) {
          legendData.push({color: myColor(i), name: i})
        }
        legendData.push({color: "#aaaaaa", name: "no data"});

        d3.select("#unsupervisedLegend").remove();

        unsupervisedLegend = unsupervisedSvg.append("g")
          .attr("class", "legend")
          .attr("id", "unsupervisedLegend")
          .attr("x", width - 105)
          .attr("y", 75)
          .attr("height", 100)
          .attr("width", 100);

        unsupervisedLegend.selectAll('g').data(legendData)
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

var unsupervisedData = [[], [], [], [], [], []];

var maps = [
  "unsup_all_3clusters",
  "unsup_economic_3clusters",
  "unsup_creative_3clusters",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/unsupervised/data_analysis_final_results.csv", function(d) {
    unsupervisedData.push(d);
  })
]

Promise.all(promises).then(function(world) {

  unsupervisedWorldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names

  console.log(unsupervisedData);
  myUnsupervisedData = convertCountries(unsupervisedData);

  unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
  unsupervisedChart();
  clickUnsupervisedIndex();
});
