var currentMap = 0;
var currentCluster = 'clusters_3';

function clickIndex() {
  var valueMap = document.getElementById("valueMap").value;
  var valueCluster = document.getElementById("valueCluster").value;
  if (valueMap==='kmeans_results_all') currentMap = 0;
  if (valueMap==='kmeans_results_all_creative') currentMap = 1;
  if (valueMap==='kmeans_results_all_non_creative') currentMap = 2;
  if (valueMap==='kmeans_results_curated_creative') currentMap = 3;
  if (valueMap==='kmeans_results_curated_non_creative') currentMap = 4;
  if (valueMap==='kmeans_results_curated') currentMap = 5;
  currentCluster = 'clusters_'+valueCluster

  selectValue.innerHTML = "File: " + valueMap + "<br/>Column: " + currentCluster;
  updateData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var worldInfo;
var countries = []
var svg;
var legend;

function chart() {

  var min = d3.min(myData.map(function(d) { return +d[currentCluster]; }))
  var max = d3.max(myData.map(function(d) { return +d[currentCluster]; }))

  var myColor = d3.scaleSequential()
    .domain([min, max])
    .interpolator(d3.interpolateViridis);

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
            return myColor(myData[i][currentCluster]);
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
    for (var i=0; i <= max-min; i++) {
      legendData.push({color: myColor(i), name: i})
    }
    legendData.push({color: "#aaaaaa", name: "no data"});

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

function updateData() {
    // Get the data again
    myData = convertCountries(data[currentMap]);

    var min = d3.min(myData.map(function(d) { return +d[currentCluster]; }))
    var max = d3.max(myData.map(function(d) { return +d[currentCluster]; }))

    var myColor = d3.scaleSequential()
      .domain([min, max])
      .interpolator(d3.interpolateViridis);
    // Select the section we want to apply our changes to
    countries = topojson.feature(worldInfo, worldInfo.objects.countries);
    // Make the changes
    svg.selectAll("path")
      .data(countries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < myData.length; i++) {
            if (myData[i].country_iso === d.properties.name) {
              return myColor(myData[i][currentCluster]);
            }
          }
          return "#aaaaaa";
        })
        .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")

        var legendData = []
        for (var i=0; i <= max-min; i++) {
          legendData.push({color: myColor(i), name: i})
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
  "kmeans_results_all",
  "kmeans_results_all_creative",
  "kmeans_results_all_non_creative",
  "kmeans_results_curated",
  "kmeans_results_curated_creative",
  "kmeans_results_curated_non_creative",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/kmeans_results_all.csv", function(d) {
    data[0].push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_all_creative.csv", function(d) {
    data[1].push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_all_non_creative.csv", function(d) {
    data[2].push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated_creative.csv", function(d) {
    data[3].push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated_non_creative.csv", function(d) {
    data[4].push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated.csv", function(d) {
    data[5].push(d);
  })
]

Promise.all(promises).then(function(world) {

  worldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names

  myData = convertCountries(data[currentMap]);

  countries = topojson.feature(worldInfo, worldInfo.objects.countries);
  chart();
  clickIndex();
});
