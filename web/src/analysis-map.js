function clickIndex(value) {
  console.log("you click " + value + " index")
}

var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = 700 - margin.left - margin.right // Use the window's width
  , height = 550 - margin.top - margin.bottom; // Use the window's height

var worldInfo;

var countries = []
function chart() {

  var myColor = d3.scaleSequential()
    .domain([0,3])
    .interpolator(d3.interpolateViridis);

  console.log(myColor)

  var svg = d3.select("#map").append("svg")
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

    const g = svg.append("g")

    g.append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
        .attr("fill", function(d) {
          for (var i=0; i < myData.length; i++) {
            if (myData[i].country_iso === d.properties.name) {
              return myColor(myData[i].clusters_3);
            }
          }
          //console.log(d.properties.name);
          return "#00b3b3";
        })
        .attr("d", path)
        .on("click", function(d) {
          alert(d.properties.name)
        })
    //  .append("title")
    //    .text(d => `${d.properties.name}
    //${data.has(d.properties.name) ? data.get(d.properties.name) : "N/A"}`);

  g.append("path")
    .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);


    var legendData = [
      { "color": "#31688E", "name": "0" },
      { "color": "#35B779", "name": "1" },
      { "color": "#440154", "name": "2" },
      { "color": "#00B3B3", "name": "no data" },
    ]

    var legend = svg.append("g")
      .attr("class", "legend")
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

var data = [];

var promises = [
  d3.json("./web/data/countries-50m.json"),
  d3.dsv(",", "./data_analysis/kmeans_results_all.csv", function(d) {
    data.push(d);
  })
  /*,
  d3.dsv(",", "../data_analysis/kmeans_results_all_creative.csv", function(d) {
    data.push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_all_non_creative.csv", function(d) {
    data.push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated_creative.csv", function(d) {
    data.push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated_non_creative.csv", function(d) {
    data.push(d);
  }),
  d3.dsv(",", "../data_analysis/kmeans_results_curated.csv", function(d) {
    data.push(d);
  })
  */
]

Promise.all(promises).then(function(world) {

  worldInfo = world[0];
  // example of array of iso country codes that get converted to our map safe names

  myData = convertCountries(data);

  console.log(myData)
  countries = topojson.feature(worldInfo, worldInfo.objects.countries);
  chart();
});
