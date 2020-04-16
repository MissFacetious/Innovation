var currentUnsupervisedMap = 0;
var currentUnsupervisedCluster = 'clusters_3';
var myUnsupervisedData = [];

function clickUnsupervisedIndex() {
  var valueMap = document.getElementById("unsupervisedValueMap").value;
  var valueCluster = document.getElementById("unsupervisedValueCluster").value;
  if (valueMap==='kmeans_results_all') currentUnsupervisedMap = 0;
  if (valueMap==='kmeans_results_all_creative') currentUnsupervisedMap = 1;
  if (valueMap==='kmeans_results_all_non_creative') currentUnsupervisedMap = 2;
  if (valueMap==='kmeans_results_curated_creative') currentUnsupervisedMap = 3;
  if (valueMap==='kmeans_results_curated_non_creative') currentUnsupervisedMap = 4;
  if (valueMap==='kmeans_results_curated') currentUnsupervisedMap = 5;
  currentUnsupervisedCluster = 'clusters_'+valueCluster

  var selectValue = document.getElementById("unsupervisedSelectValue");
  selectValue.innerHTML = "1230"; // time. will delete later.
  updateUnsupervisedData();
}

var margin = {top: 5, right: 5, bottom: 5, left: 5}
  , width = 600 - margin.left - margin.right // Use the window's width
  , height = 470 - margin.top - margin.bottom; // Use the window's height

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
    .attr("width", 100%)
    .attr("height", 100%);

  var projection = d3.geoEqualEarth()
  var path = d3.geoPath().projection(projection)
  var outline = ({type: "Sphere"})

  unsupervisedSvg.append("g")
    .attr("class", "countries")
    .attr("width", width-10)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
}

function updateUnsupervisedData() {
    // Get the data again
    myUnsupervisedData = convertCountries(unsupervisedData[currentUnsupervisedMap]);

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
          .attr("x", width - 10)
          .attr("y", 75)
          .attr("height", 100)
          .attr("width", 100);

        unsupervisedLegend.selectAll('g').data(legendData)
          .enter()
          .append('g')
          .each(function(d, i) {
            var g = d3.select(this);
            g.append("rect")
              .attr("x", width - margin.right - 60)
              .attr("y", i*15)
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", d.color)

            g.append("text")
              .attr("x", width - margin.right - 40)
              .attr("y", i * 15+8)
              .attr("text-anchor","start")
              .attr("height",30)
              .attr("width",100)
              .attr("font-size", 10)
              .text(d.name);
            });
}

var width = 600;
var height = 470;

var unsupervisedData = [[], [], [], [], [], []];

var maps = [
  "kmeans_results_all",
  "kmeans_results_all_creative",
  "kmeans_results_all_non_creative",
  "kmeans_results_curated",
  "kmeans_results_curated_creative",
  "kmeans_results_curated_non_creative",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_all.csv", function(d) {
    unsupervisedData[0].push(d);
  }),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_all_creative.csv", function(d) {
    unsupervisedData[1].push(d);
  }),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_all_non_creative.csv", function(d) {
    unsupervisedData[2].push(d);
  }),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_curated_creative.csv", function(d) {
    unsupervisedData[3].push(d);
  }),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_curated_non_creative.csv", function(d) {
    unsupervisedData[4].push(d);
  }),
  d3.dsv(",", "./data_analysis/unsupervised/kmeans_results_curated.csv", function(d) {
    unsupervisedData[5].push(d);
  })
]

Promise.all(promises).then(function(world) {

  unsupervisedWorldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names

  myUnsupervisedData = convertCountries(unsupervisedData[currentUnsupervisedMap]);

  unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
  unsupervisedChart();
  clickUnsupervisedIndex();
});
