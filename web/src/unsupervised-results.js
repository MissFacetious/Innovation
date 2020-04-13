var currentUnsupervisedCluster = 0;
var myUnsupervisedData = [];

var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(country, d) {
        return "<p>" + country + "</p>" +
        "<br/><span>all: </span>" + d.unsup_all_3clusters +
        "<br/><span>econ: </span>" + d.unsup_economic_3clusters +
        "<br/><span>creative: </span>" + d.unsup_creative_3clusters
       })
      .offset([-12, 0])

function clickUnsupervisedIndex(valueCluster) {
  //var valueCluster = document.getElementById("unsupervisedValueCluster").value;
  currentUnsupervisedCluster = valueCluster;
  var selectValue = document.getElementById("unsupervisedSelectValue");
  if (valueCluster === 'unsup_all_3clusters') valueCluster = 'Combined Innovation';
  if (valueCluster === 'unsup_economic_3clusters') valueCluster = 'Economic Impact';
  if (valueCluster === 'unsup_creative_3clusters') valueCluster = 'Creative Impact';
  selectValue.innerHTML = valueCluster;
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

    unsupervisedSvg.call(tip)
}

function updateUnsupervisedData() {
    // Get the data again
    myUnsupervisedData = convertCountries(unsupervisedData);

    var min = d3.min(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))
    var max = d3.max(myUnsupervisedData.map(function(d) { return +d[currentUnsupervisedCluster]; }))

    var myColor = d3.scaleLinear()
      .domain(d3.range(min, max))

      if (currentUnsupervisedCluster === 'unsup_all_3clusters')
        // blue, default
        myColor.range(d3.quantize(d3.interpolateHcl("#3461eb", "#27cfc3"), 3));
      else if (currentUnsupervisedCluster === 'unsup_economic_3clusters')
        // green like money!
        myColor.range(d3.quantize(d3.interpolateHcl("#149c93", "#77e83a"), 3));
      else if (currentUnsupervisedCluster === 'unsup_creative_3clusters')
        // pink purple creatives
        myColor.range(d3.quantize(d3.interpolateHcl("#683cb0", "#e637d4"), 3));
      else
        myColor.range(d3.quantize(d3.interpolateHcl("#f4e153", "#ff6699"), 3));
    // Select the section we want to apply our changes to
    unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
    // Make the changes
    var currentCountry = '';
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
        // hacky hack hack because topography data doesn't want to keep country names in it
        .attr("class", function(d) {
          for (var i=0; i < myUnsupervisedData.length; i++) {
            if (myUnsupervisedData[i].country_iso === d.properties.name) {
              return d.properties.name;
            }
          }
          return "";
        })
        .datum(topojson.mesh(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries, (a, b) => a !== b))
        .on("mouseover", function(a) {
          var country = this.className.baseVal;
          for (var i=0; i < myUnsupervisedData.length; i++) {
            if (myUnsupervisedData[i].country_iso === country) {
              tip.show(country, myUnsupervisedData[i])
              break;
            }
          }
        })
        .on("mouseout", function(a) {
          tip.hide();
        })

        var legendData = []
        for (var i=(max-min); i >= 0; i--) {
          var name = '';
          if (i <= 0) name = "Low Innovation";
          if (i === 1) name = "Medium Innovation";
          if (i >= 2) name = "High Innovation";
          legendData.push({color: myColor(i), name: name})
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
  myUnsupervisedData = convertCountries(unsupervisedData);

  unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
  unsupervisedChart();
  clickUnsupervisedIndex('unsup_all_3clusters');
});
