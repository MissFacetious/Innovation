function clickIndex(value) {
  console.log("you click " + value + " index")
}

var worldInfo;

var countries = []
function chart() {

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
          //console.log(d.properties.name);
          return "#00b3b3";
        })
        .attr("d", path)
    //  .append("title")
    //    .text(d => `${d.properties.name}
    //${data.has(d.properties.name) ? data.get(d.properties.name) : "N/A"}`);

  g.append("path")
    .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
}

var width = 975;
var height = 475;

var promises = [
  d3.json("./web/data/countries-50m.json")
]

Promise.all(promises).then(function(world) {
  worldInfo = world[0];
  var myData = [
  // all possible countries to convert
    "Zimbabwe",
    "Zambia",
    "Yemen",
    "Viet Nam",
    "Venezuela (Bolivarian Republic of)",
    "Vanuatu",
    "Uzbekistan",
    "Uruguay",
    "Micronesia (Federated States of)",
    "Marshall Islands",
    "Northern Mariana Islands",
    "United States Virgin Islands",
    "Guam",
    "American Samoa",
    "Puerto Rico",
    "United States of America",
    "South Georgia and the South Sandwich Islands",
    "British Indian Ocean Territory"];

  myData = convertCountries(myData)
  countries = topojson.feature(worldInfo, worldInfo.objects.countries)
  chart();
});
