var currentUnsupervisedCluster = 0;
var myUnsupervisedData = [];
var filter = 'none';

var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(country, d) {
        var all = convertInnovationNumberToText(d.unsup_all_3clusters);
        var econ = convertInnovationNumberToText(d.unsup_economic_3clusters);
        var create = convertInnovationNumberToText(d.unsup_creative_3clusters);
        return "<div>" + country + "</div>" +
        "<br/><span class=\"blue-text\">Combined Innovation: </span><a class=\"tip\" href=\"javascript:filterChange('unsup_all_3clusters', '"+d.unsup_all_3clusters+"')\">" + all + "</a>" +
        "<br/><span class=\"green-text\">Economic Impact: </span><a class=\"tip\" href=\"javascript:filterChange('unsup_economic_3clusters', '"+d.unsup_economic_3clusters+"')\">" + econ + "</a>" +
        "<br/><span class=\"purple-text\">Creative Impact: </span><a class=\"tip\" href=\"javascript:filterChange('unsup_creative_3clusters', '"+d.unsup_creative_3clusters+"')\">" + create + "</a>"
       })
      .offset([-12, 0])

function clickCountryToolTip(country) {
  for (var i=0; i < myUnsupervisedData.length; i++) {
    if (myUnsupervisedData[i].country_iso === country) {
      tip.show(country, myUnsupervisedData[i])
      break;
    }
  }
}

function convertInnovationNumberToText(number) {
  var name = ''
  if (+number <= 0) name = "Low Innovation";
  if (+number === 1) name = "Medium Innovation";
  if (+number >= 2) name = "High Innovation";
  return name;
}

function filterChange(type, number) {
  clickUnsupervisedIndex(type, false);
  filter = +number;
  clickUnsupervisedIndex(currentUnsupervisedCluster);
  tip.hide();
}

function clickUnsupervisedIndex(valueCluster, reset) {
  //var valueCluster = document.getElementById("unsupervisedValueCluster").value;
  currentUnsupervisedCluster = valueCluster;
  var selectValue = document.getElementById("unsupervisedSelectValue");
  if (valueCluster === 'unsup_all_3clusters') valueCluster = 'Combined Innovation';
  if (valueCluster === 'unsup_economic_3clusters') valueCluster = 'Economic Impact';
  if (valueCluster === 'unsup_creative_3clusters') valueCluster = 'Creative Impact';
  selectValue.innerHTML = valueCluster;
  if (reset) {
      filter = 'none'
  }
  tip.hide();
  updateUnsupervisedData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 500 - margin.top - margin.bottom; // Use the window's height

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
          if (filter === 'none') {
            for (var i=0; i < myUnsupervisedData.length; i++) {
              if (myUnsupervisedData[i].country_iso === d.properties.name) {
                return myColor(myUnsupervisedData[i][currentUnsupervisedCluster]);
              }
            }
            return "#aaaaaa";
          }
          if (filter === 0) {
            for (var i=0; i < myUnsupervisedData.length; i++) {
              if (myUnsupervisedData[i].country_iso === d.properties.name) {
                if (+myUnsupervisedData[i][currentUnsupervisedCluster] === 0) {
                  return myColor(myUnsupervisedData[i][currentUnsupervisedCluster]);
                }
                else {
                  return "#dddddd";
                }
              }
            }
            return "#aaaaaa";
          }
          if (filter === 1) {
            for (var i=0; i < myUnsupervisedData.length; i++) {
              if (myUnsupervisedData[i].country_iso === d.properties.name) {
                if (+myUnsupervisedData[i][currentUnsupervisedCluster] === 1) {
                  return myColor(myUnsupervisedData[i][currentUnsupervisedCluster]);
                }
                else {
                  return "#dddddd";
                }
              }
            }
            return "#aaaaaa";
          }
          if (filter === 2) {
            for (var i=0; i < myUnsupervisedData.length; i++) {
              if (myUnsupervisedData[i].country_iso === d.properties.name) {
                if (+myUnsupervisedData[i][currentUnsupervisedCluster] === 2) {
                  return myColor(myUnsupervisedData[i][currentUnsupervisedCluster]);
                }
                else {
                  return "#dddddd";
                }
              }
            }
            return "#aaaaaa";
          }
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
        .on("click", function(a) {
          tip.hide();
          clickCountryToolTip(this.className.baseVal);
        })
        //.on("mouseout", function(a) {
        //  tip.hide();
        //})

        var legendData = []
        if (filter === 'none') {
          for (var i=(max-min); i >= 0; i--) {
            var name = convertInnovationNumberToText(i);
            legendData.push({color: myColor(i), name: name})
          }
        }
        else if (+filter === 0) { // low
          var name = convertInnovationNumberToText(0);
          legendData.push({color: myColor(max-min-2), name: name})
        }
        else if (+filter === 1) { // med
          var name = convertInnovationNumberToText(1);
          legendData.push({color: myColor(max-min-1), name: name})
        }
        else if (+filter === 2) { // hi
          var name = convertInnovationNumberToText(2);
          legendData.push({color: myColor(max-min), name: name})
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
              .attr("x", width - margin.right - 85)
              .attr("y", i*15)
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", d.color)
              .on("click", function(a) {
                if (d.name === "Low Innovation") value = 0;
                if (d.name === "Medium Innovation") value = 1;
                if (d.name === "High Innovation") value = 2;
                filterChange(currentUnsupervisedCluster, value)
              })

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

var width = 700;
var height = 500;

var unsupervisedData = [[], [], [], [], [], []];

var maps = [
  "unsup_all_3clusters",
  "unsup_economic_3clusters",
  "unsup_creative_3clusters",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./web/data/data_analysis_final_results.csv", function(d) {
    unsupervisedData.push(d);
  })
]

Promise.all(promises).then(function(world) {

  unsupervisedWorldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names
  myUnsupervisedData = convertCountries(unsupervisedData);

  unsupervisedCountries = topojson.feature(unsupervisedWorldInfo, unsupervisedWorldInfo.objects.countries);
  unsupervisedChart();
  clickUnsupervisedIndex('unsup_all_3clusters', false);
});
