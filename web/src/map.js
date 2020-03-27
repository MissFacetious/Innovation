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
          console.log(d.properties.name);
          return "#00b3b3";
        })
        .attr("d", path)
      .append("title")
        .text(d => `${d.properties.name}
    ${data.has(d.properties.name) ? data.get(d.properties.name) : "N/A"}`);

  g.append("path")
    .datum(topojson.mesh(worldInfo, worldInfo.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
}

var data = new Map([
  // likely countries to convert
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Democratic People's Republic of Korea", "North Korea"],
  ["Democratic Republic of the Congo", "Dem. Rep. Congo"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Iran (Islamic Republic of)", "Iran"],
  ["Lao People's Democratic Republic", "Laos"],
  ["Marshall Islands", "Marshall Is."],
  ["Micronesia (Federated States of)", "Micronesia"],
  ["Republic of Korea", "South Korea"],
  ["Republic of Moldova", "Moldova"],
  ["Russian Federation", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["Solomon Islands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syrian Arab Republic", "Syria"],
  ["The former Yugoslav Republic of Macedonia", "Macedonia"],
  ["United Republic of Tanzania", "Tanzania"],
  ["Venezuela (Bolivarian Republic of)", "Venezuela"],
  ["Viet Nam", "Vietnam"],

// all possible countries to convert
  ["", "Zimbabwe"],
  ["", "Zambia"],
  ["", "Yemen"],
  ["", "Vietnam"],
  ["", "Venezuela"],
  ["", "Vatican"],
  ["", "Vanuatu"],
  ["", "Uzbekistan"],
  ["", "Uruguay"],
  ["", "Micronesia"],
  ["", "Marshall Is."],
  ["", "N. Mariana Is."],
  ["", "U.S. Virgin Is."],
  ["", "Guam"],
  ["", "American Samoa"],
  ["", "Puerto Rico"],
  ["", "United States of America"],
  ["", "S. Geo. and the Is."],
  ["", "Br. Indian Ocean Ter."],
  ["", "Saint Helena"],
  ["", "Pitcairn Is."],
  ["", "Anguilla"],
  ["", "Falkland Is."],
  ["", "Cayman Is."],
  ["", "Bermuda"],
  ["", "British Virgin Is."],
  ["", "Turks and Caicos Is."],
  ["", "Montserrat"],
  ["", "Jersey"],
  ["", "Guernsey"],
  ["", "Isle of Man"],
  ["", "United Kingdom"],
  ["", "United Arab Emirates"],
  ["", "Ukraine"],
  ["", "Uganda"],
  ["", "Turkmenistan"],
  ["", "Turkey"],
  ["", "Tunisia"],
  ["", "Trinidad and Tobago"],
  ["", "Tonga"],
  ["", "Togo"],
  ["", "Timor-Leste"],
  ["", "Thailand"],
  ["", "Tanzania"],
  ["", "Tajikistan"],
  ["", "Taiwan"],
  ["", "Syria"],
  ["", "Switzerland"],
  ["", "Sweden"],
  ["", "eSwatini"],
  ["", "Suriname"],
  ["", "S. Sudan"],
  ["", "Sudan"],
  ["", "Sri Lanka"],
  ["", "Spain"],
  ["", "South Korea"],
  ["", "South Africa"],
  ["", "Somalia"],
  ["", "Somaliland"],
  ["", "Solomon Is."],
  ["", "Slovakia"],
  ["", "Slovenia"],
  ["", "Singapore"],
  ["", "Sierra Leone"],
  ["", "Seychelles"],
  ["", "Serbia"],
  ["", "Senegal"],
  ["", "Saudi Arabia"],
  ["", "São Tomé and Principe"],
  ["", "San Marino"],
  ["", "Samoa"],
  ["", "St. Vin. and Gren."],
  ["", "Saint Lucia"],
  ["", "St. Kitts and Nevis"],
  ["", "Rwanda"],
  ["", "Russia"],
  ["", "Romania"],
  ["", "Qatar"],
  ["", "Portugal"],
  ["", "Poland"],
  ["", "Philippines"],
  ["", "Peru"],
  ["", "Paraguay"],
  ["", "Papua New Guinea"],
  ["", "Panama"],
  ["", "Palau"],
  ["", "Pakistan"],
  ["", "Oman"],
  ["", "Norway"],
  ["", "North Korea"],
  ["", "Nigeria"],
  ["", "Niger"],
  ["", "Nicaragua"],
  ["", "New Zealand"],
  ["", "Niue"],
  ["", "Cook Is."],
  ["", "Netherlands"],
  ["", "Aruba"],
  ["", "Curaçao"],
  ["", "Nepal"],
  ["", "Nauru"],
  ["", "Namibia"],
  ["", "Mozambique"],
  ["", "Morocco"],
  ["", "W. Sahara"],
  ["", "Montenegro"],
  ["", "Mongolia"],
  ["", "Moldova"],
  ["", "Monaco"],
  ["", "Mexico"],
  ["", "Mauritius"],
  ["", "Mauritania"],
  ["", "Malta"],
  ["", "Mali"],
  ["", "Maldives"],
  ["", "Malaysia"],
  ["", "Malawi"],
  ["", "Madagascar"],
  ["", "Macedonia"],
  ["", "Luxembourg"],
  ["", "Lithuania"],
  ["", "Liechtenstein"],
  ["", "Libya"],
  ["", "Liberia"],
  ["", "Lesotho"],
  ["", "Lebanon"],
  ["", "Latvia"],
  ["", "Laos"],
  ["", "Kyrgyzstan"],
  ["", "Kuwait"],
  ["", "Kosovo"],
  ["", "Kiribati"],
  ["", "Kenya"],
  ["", "Kazakhstan"],
  ["", "Jordan"],
  ["", "Japan"],
  ["", "Jamaica"],
  ["", "Italy"],
  ["", "Israel"],
  ["", "Palestine"],
  ["", "Ireland"],
  ["", "Iraq"],
  ["", "Iran"],
  ["", "Indonesia"],
  ["", "India"],
  ["", "Iceland"],
  ["", "Hungary"],
  ["", "Honduras"],
  ["", "Haiti"],
  ["", "Guyana"],
  ["", "Guinea-Bissau"],
  ["", "Guinea"],
  ["", "Guatemala"],
  ["", "Grenada"],
  ["", "Greece"],
  ["", "Ghana"],
  ["", "Germany"],
  ["", "Georgia"],
  ["", "Gambia"],
  ["", "Gabon"],
  ["", "France"],
  ["", "St. Pierre and Miquelon"],
  ["", "Wallis and Futuna Is."],
  ["", "St-Martin"],
  ["", "St-Barthélemy"],
  ["", "Fr. Polynesia"],
  ["", "New Caledonia"],
  ["", "Fr. S. Antarctic Lands"],
  ["", "Åland"],
  ["", "Finland"],
  ["", "Fiji"],
  ["", "Ethiopia"],
  ["", "Estonia"],
  ["", "Eritrea"],
  ["", "Eq. Guinea"],
  ["", "El Salvador"],
  ["", "Egypt"],
  ["", "Ecuador"],
  ["", "Dominican Rep."],
  ["", "Dominica"],
  ["", "Djibouti"],
  ["", "Greenland"],
  ["", "Faeroe Is."],
  ["", "Denmark"],
  ["", "Czechia"],
  ["", "N. Cyprus"],
  ["", "Cyprus"],
  ["", "Cuba"],
  ["", "Croatia"],
  ["", "Côte d'Ivoire"],
  ["", "Costa Rica"],
  ["", "Dem. Rep. Congo"],
  ["", "Congo"],
  ["", "Comoros"],
  ["", "Colombia"],
  ["", "China"],
  ["", "Macao"],
  ["", "Hong Kong"],
  ["", "Chile"],
  ["", "Chad"],
  ["", "Central African Rep."],
  ["", "Cabo Verde"],
  ["", "Canada"],
  ["", "Cameroon"],
  ["", "Cambodia"],
  ["", "Myanmar"],
  ["", "Burundi"],
  ["", "Burkina Faso"],
  ["", "Bulgaria"],
  ["", "Brunei"],
  ["", "Brazil"],
  ["", "Botswana"],
  ["", "Bosnia and Herz."],
  ["", "Bolivia"],
  ["", "Bhutan"],
  ["", "Benin"],
  ["", "Belize"],
  ["", "Belgium"],
  ["", "Belarus"],
  ["", "Barbados"],
  ["", "Bangladesh"],
  ["", "Bahrain"],
  ["", "Bahamas"],
  ["", "Azerbaijan"],
  ["", "Austria"],
  ["", "Australia"],
  ["", "Indian Ocean Ter."],
  ["", "Heard I. and McDonald Is."],
  ["", "Norfolk Island"],
  ["", "Ashmore and Cartier Is."],
  ["", "Armenia"],
  ["", "Argentina"],
  ["", "Antigua and Barb."],
  ["", "Angola"],
  ["", "Andorra"],
  ["", "Algeria"],
  ["", "Albania"],
  ["", "Afghanistan"],
  ["", "Siachen Glacier"],
  ["", "Antarctica"],
  ["", "Sint Maarten"]
])

var width = 975;
var height = 475;

var promises = [
  d3.json("./web/data/countries-50m.json")
]

Promise.all(promises).then(function(world) {
  worldInfo = world[0];
  //console.log(worldInfo)
  countries = topojson.feature(worldInfo, worldInfo.objects.countries)
  chart();
});
