var currentUnsupervisedDiffCluster = 0;
var myUnsupervisedDiffData = [];

var tipDiff = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(country, d) {
        var className = '';
        if (currentUnsupervisedDiffCluster === 0) {
          className = "green-text";
          return "<div>"+ country + "</div>"+
            "<br/><span class=\""+className+"\">"+
            returnSupervisedColumn(d, currentUnsupervisedDiffCluster, true)+
            " economical impacts</span>";
        }
        if (currentUnsupervisedDiffCluster === 1) {
          className = "purple-text";
          return "<div>"+ country + "</div>"+
            "<br/><span class=\""+className+"\">"+
            returnSupervisedColumn(d, currentUnsupervisedDiffCluster, true)+
            " creative impacts</span>";
          }
        if (currentUnsupervisedDiffCluster === 2) {
          className = "blue-text";
          var [value1, value2] = returnSupervisedColumn(d, currentUnsupervisedDiffCluster, true);
          return "<div>"+ country + "</div>"+
            "<br/><span class=\""+className+"\">"+
            "<span class=\"green-text\">"+value1+" economical impact<br/>"+
            "<span class=\"purple-text\">"+value2+" creative impact</span>";
        }

      })
      .offset([-12, 0])

function clickCountryDiffToolTip(country) {
  for (var i=0; i < myUnsupervisedDiffData.length; i++) {
    if (myUnsupervisedDiffData[i].country_iso === country) {
      tipDiff.show(country, myUnsupervisedDiffData[i])
      break;
    }
  }
}

function clickUnsupervisedDiffIndex(valueCluster) {
  var valueCluster = document.getElementById("unsupervisedValueDiffMap").value;
  currentUnsupervisedDiffCluster = +valueCluster;
  var selectValue = document.getElementById("unsupervisedSelectDataValue");
  if (+valueCluster === 0) valueCluster = 'Difference Between Combined and Economic Impact';
  if (+valueCluster === 1) valueCluster = 'Difference Between Combined and Creative Impact';
  if (+valueCluster === 2) valueCluster = 'Difference Between Combined With Both Economic and Creative Impact';
  selectValue.innerHTML = valueCluster;
  tipDiff.hide();
  updateUnsupervisedDiffData();
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var unsupervisedDiffWorldInfo;
var unsupervisedDiffCountries = []
var unsupervisedDiffSvg;
var unsupervisedDiffLegend;

function returnSupervisedColumn(d, value, negative) {
  if (negative) {
    if (value === 0) {
      value = +d['unsup_all_3clusters'] - +d['unsup_economic_3clusters'];
      if (value > 0) value = "above in";
      else if (value < 0) value = "below in";
      else value = "same"
      return value;
    }
    if (value === 1) {
      value = +d['unsup_all_3clusters'] - +d['unsup_creative_3clusters'];
      if (value > 0) value = "above in";
      else if (value < 0) value = "below in";
      else value = "same"
      return value;
    }
    if (value === 2) {
      var a = +d['unsup_economic_3clusters'];
      var b = +d['unsup_creative_3clusters'];
      var value1 = +d['unsup_all_3clusters'] - a;
      var value2 = +d['unsup_all_3clusters'] - b;
      if (+value1 > 0) value1 = "above in";
      else if (+value1 < 0) value1 = "below in";
      else value1 = "same"
      if (+value2 > 0) value2 = "above in";
      else if (+value2 < 0) value2 = "below in";
      else value2 = "same"
      return [value1, value2];
    }
  }
  else {
    if (value === 0) {
      return +Math.abs(d['unsup_all_3clusters'] - +d['unsup_economic_3clusters']);
    }
    if (value === 1) {
      return +Math.abs(d['unsup_all_3clusters'] - +d['unsup_creative_3clusters']);
    }
    if (value === 2) {
      var a = +d['unsup_economic_3clusters'];
      var b = +d['unsup_creative_3clusters'];
      var value = (a+b)/2;
      value = value - d['unsup_all_3clusters'];
      if (value > 0) return +Math.ceil(value)+1;
      if (value < 0) return +Math.floor(value)+1;
      return value+1;
    }
  }
}

function unsupervisedDiffChart() {

  var min = d3.min(myUnsupervisedDiffData.map(function(d) { return +returnSupervisedColumn(d, currentUnsupervisedDiffCluster, false); }))
  var max = d3.max(myUnsupervisedDiffData.map(function(d) { return +returnSupervisedColumn(d, currentUnsupervisedDiffCluster, false); }))

  var myColor = d3.scaleSequential()
    .domain([+min, max+1])
    .interpolator(d3.interpolateViridis);

  unsupervisedDiffSvg = d3.select("#unsupervisedDiffMap").append("svg")
    .attr("width", width)
    .attr("height", height);

  var projection = d3.geoEqualEarth()
  var path = d3.geoPath().projection(projection)
  var outline = ({type: "Sphere"})

  unsupervisedDiffSvg.append("g")
    .attr("class", "countries")
    .attr("width", width-100)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(unsupervisedDiffWorldInfo, unsupervisedDiffWorldInfo.objects.countries).features)
    .enter().append("path")
    .attr("d", path)

    unsupervisedDiffSvg.call(tipDiff)
}

function updateUnsupervisedDiffData() {
    // Get the data again
    myUnsupervisedDiffData = convertCountries(unsupervisedDiffData);

    var min = d3.min(myUnsupervisedDiffData.map(function(d) { return +returnSupervisedColumn(d, currentUnsupervisedDiffCluster, false); }))
    var max = d3.max(myUnsupervisedDiffData.map(function(d) { return +returnSupervisedColumn(d, currentUnsupervisedDiffCluster, false); }))

    var myColor = d3.scaleLinear()
      .domain(d3.range(+min, max+1))

      if (+currentUnsupervisedDiffCluster === 0)
        // green like money!
        myColor.range(["#149c9322", "#77e83a"]);
      else if (+currentUnsupervisedDiffCluster === 1)
        // pink purple creatives
        myColor.range(["#683cb022", "#e637d4"]);
      else if (+currentUnsupervisedDiffCluster === 2) {
        // blue, default
        myColor.range(["#3461eb", "#2e98d733", "#2aeef5"]);
      }

    // Select the section we want to apply our changes to
    unsupervisedDiffCountries = topojson.feature(unsupervisedDiffWorldInfo, unsupervisedDiffWorldInfo.objects.countries);
    // Make the changes
    var currentCountry = '';
    unsupervisedDiffSvg.selectAll("path")
      .data(unsupervisedDiffCountries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < myUnsupervisedDiffData.length; i++) {
            if (myUnsupervisedDiffData[i].country_iso === d.properties.name) {
              return myColor(returnSupervisedColumn(myUnsupervisedDiffData[i], currentUnsupervisedDiffCluster, false));
            }
          }
          return "#aaaaaa";
        })
        // hacky hack hack because topography data doesn't want to keep country names in it
        .attr("class", function(d) {
          for (var i=0; i < myUnsupervisedDiffData.length; i++) {
            if (myUnsupervisedDiffData[i].country_iso === d.properties.name) {
              return d.properties.name;
            }
          }
          return "";
        })
        .datum(topojson.mesh(unsupervisedDiffWorldInfo, unsupervisedDiffWorldInfo.objects.countries, (a, b) => a !== b))
        .on("click", function(a) {
          tipDiff.hide();
          clickCountryDiffToolTip(this.className.baseVal);
        })

        var legendData = []

        if (currentUnsupervisedDiffCluster === 2) {
          legendData.push({color: myColor(0), name: "Above"})
          legendData.push({color: myColor(1), name: "Same"})
          legendData.push({color: myColor(2), name: "Below"})
        }
        else {
          for (var i=(max-min); i >= 0; i--) {
            var name = i === 0? "Same": "Different";
            legendData.push({color: myColor(i), name: name})
          }
        }
        legendData.push({color: "#aaaaaa", name: "no data"});

        d3.select("#unsupervisedDiffLegend").remove();

        unsupervisedDiffLegend = unsupervisedDiffSvg.append("g")
          .attr("class", "legend")
          .attr("id", "unsupervisedDiffLegend")
          .attr("x", width - 105)
          .attr("y", 75)
          .attr("height", 100)
          .attr("width", 100);

        unsupervisedDiffLegend.selectAll('g').data(legendData)
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

var unsupervisedDiffData = [[], [], [], [], [], []];

var maps = [
  "unsup_all_3clusters",
  "unsup_economic_3clusters",
  "unsup_creative_3clusters",
];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/unsupervised/data_analysis_final_results.csv", function(d) {
    unsupervisedDiffData.push(d);
  })
]

Promise.all(promises).then(function(world) {

  unsupervisedDiffWorldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names
  myUnsupervisedDiffData = convertCountries(unsupervisedDiffData);

  unsupervisedDiffCountries = topojson.feature(unsupervisedDiffWorldInfo, unsupervisedDiffWorldInfo.objects.countries);
  unsupervisedDiffChart();
  clickUnsupervisedDiffIndex('unsup_all_3clusters', false);
});
