var convert = new Map([
  ["ZWE", "Zimbabwe"],
  ["ZMB", "Zambia"],
  ["YEM", "Yemen"],
  ["VNM", "Vietnam"],
  ["VEN", "Venezuela"],
  ["VUT", "Vanuatu"],
  ["UZB", "Uzbekistan"],
  ["URY", "Uruguay"],
  ["FSM", "Micronesia"],
  ["MHL", "Marshall Is."],
  ["MNP", "N. Mariana Is."],
  ["VIR", "U.S. Virgin Is."],
  ["GUM", "Guam"],
  ["ASM", "American Samoa"],
  ["PRI", "Puerto Rico"],
  ["USA", "United States of America"],
  ["SGS", "S. Geo. and the Is."],
  ["IOT", "Br. Indian Ocean Ter."],
  ["SHN", "Saint Helena"],
  ["PCN", "Pitcairn Is."],
  ["AIA", "Anguilla"],
  ["FLK", "Falkland Is."],
  ["CYM", "Cayman Is."],
  ["BMU", "Bermuda"],
  ["VGB", "British Virgin Is."],
  ["TCA", "Turks and Caicos Is."],
  ["MSR", "Montserrat"],
  ["JEY", "Jersey"],
  ["GGY", "Guernsey"],
  ["IMN", "Isle of Man"],
  ["GBR", "United Kingdom"],
  ["ARE", "United Arab Emirates"],
  ["UKR", "Ukraine"],
  ["UGA", "Uganda"],
  ["TKM", "Turkmenistan"],
  ["TUR", "Turkey"],
  ["TUN", "Tunisia"],
  ["TTO", "Trinidad and Tobago"],
  ["TON", "Tonga"],
  ["TGO", "Togo"],
  ["TLS", "Timor-Leste"],
  ["THA", "Thailand"],
  ["TZA", "Tanzania"],
  ["TJK", "Tajikistan"],
  ["SYR", "Syria"],
  ["CHE", "Switzerland"],
  ["SWE", "Sweden"],
  ["SWZ", "eSwatini"],
  ["SUR", "Suriname"],
  ["SSD", "S. Sudan"],
  ["SDN", "Sudan"],
  ["LKA", "Sri Lanka"],
  ["ESP", "Spain"],
  ["KOR", "South Korea"],
  ["ZAF", "South Africa"],
  ["SOM", "Somalia"],
  ["SLB", "Solomon Is."],
  ["SVK", "Slovakia"],
  ["SVN", "Slovenia"],
  ["SGP", "Singapore"],
  ["SLE", "Sierra Leone"],
  ["SYC", "Seychelles"],
  ["SRB", "Serbia"],
  ["SEN", "Senegal"],
  ["SAU", "Saudi Arabia"],
  ["STP", "São Tomé and Principe"],
  ["SMR", "San Marino"],
  ["WSM", "Samoa"],
  ["VCT", "St. Vin. and Gren."],
  ["LCA", "Saint Lucia"],
  ["KNA", "St. Kitts and Nevis"],
  ["RWA", "Rwanda"],
  ["RUS", "Russia"],
  ["ROU", "Romania"],
  ["QAT", "Qatar"],
  ["PRT", "Portugal"],
  ["POL", "Poland"],
  ["PHL", "Philippines"],
  ["PER", "Peru"],
  ["PRY", "Paraguay"],
  ["PNG", "Papua New Guinea"],
  ["PAN", "Panama"],
  ["PLW", "Palau"],
  ["PAK", "Pakistan"],
  ["OMN", "Oman"],
  ["NOR", "Norway"],
  ["PRK", "North Korea"],
  ["NGA", "Nigeria"],
  ["NER", "Niger"],
  ["NIC", "Nicaragua"],
  ["NZL", "New Zealand"],
  ["NIU", "Niue"],
  ["COK", "Cook Is."],
  ["NLD", "Netherlands"],
  ["ABW", "Aruba"],
  ["CUW", "Curaçao"],
  ["NPL", "Nepal"],
  ["NRU", "Nauru"],
  ["NAM", "Namibia"],
  ["MOZ", "Mozambique"],
  ["MAR", "Morocco"],
  ["ESH", "W. Sahara"],
  ["MNE", "Montenegro"],
  ["MNG", "Mongolia"],
  ["MDA", "Moldova"],
  ["MCO", "Monaco"],
  ["MEX", "Mexico"],
  ["MUS", "Mauritius"],
  ["MRT", "Mauritania"],
  ["MLT", "Malta"],
  ["MLI", "Mali"],
  ["MDV", "Maldives"],
  ["MYS", "Malaysia"],
  ["MWI", "Malawi"],
  ["MDG", "Madagascar"],
  ["MKD", "Macedonia"],
  ["LUX", "Luxembourg"],
  ["LTU", "Lithuania"],
  ["LIE", "Liechtenstein"],
  ["LBY", "Libya"],
  ["LBR", "Liberia"],
  ["LSO", "Lesotho"],
  ["LBN", "Lebanon"],
  ["LVA", "Latvia"],
  ["LAO", "Laos"],
  ["KGZ", "Kyrgyzstan"],
  ["KWT", "Kuwait"],
  ["KIR", "Kiribati"],
  ["KEN", "Kenya"],
  ["KAZ", "Kazakhstan"],
  ["JOR", "Jordan"],
  ["JPN", "Japan"],
  ["JAM", "Jamaica"],
  ["ITA", "Italy"],
  ["ISR", "Israel"],
  ["PSE", "Palestine"],
  ["IRL", "Ireland"],
  ["IRQ", "Iraq"],
  ["IRN", "Iran"],
  ["IDN", "Indonesia"],
  ["IND", "India"],
  ["ISL", "Iceland"],
  ["HUN", "Hungary"],
  ["HND", "Honduras"],
  ["HTI", "Haiti"],
  ["GUY", "Guyana"],
  ["GNB", "Guinea-Bissau"],
  ["GIN", "Guinea"],
  ["GTM", "Guatemala"],
  ["GRD", "Grenada"],
  ["GRC", "Greece"],
  ["GHA", "Ghana"],
  ["DEU", "Germany"],
  ["GEO", "Georgia"],
  ["GMB", "Gambia"],
  ["GAB", "Gabon"],
  ["FRA", "France"],
  ["SPM", "St. Pierre and Miquelon"],
  ["WLF", "Wallis and Futuna Is."],
  ["MAF", "St-Martin"],
  ["BLM", "St-Barthélemy"],
  ["PYF", "Fr. Polynesia"],
  ["NCL", "New Caledonia"],
  ["ALA", "Åland"],
  ["FIN", "Finland"],
  ["FJI", "Fiji"],
  ["ETH", "Ethiopia"],
  ["EST", "Estonia"],
  ["ERI", "Eritrea"],
  ["GNQ", "Eq. Guinea"],
  ["SLV", "El Salvador"],
  ["EGY", "Egypt"],
  ["ECU", "Ecuador"],
  ["DOM", "Dominican Rep."],
  ["DMA", "Dominica"],
  ["DJI", "Djibouti"],
  ["GRL", "Greenland"],
  ["FRO", "Faeroe Is."],
  ["DNK", "Denmark"],
  ["CZE", "Czechia"],
  ["CYP", "Cyprus"],
  ["CUB", "Cuba"],
  ["HRV", "Croatia"],
  ["CIV", "Côte d'Ivoire"],
  ["CRI", "Costa Rica"],
  ["COD", "Dem. Rep. Congo"],
  ["COG", "Congo"],
  ["COM", "Comoros"],
  ["COL", "Colombia"],
  ["CHN", "China"],
  ["MAC", "Macao"],
  ["HKG", "Hong Kong"],
  ["CHL", "Chile"],
  ["TCD", "Chad"],
  ["CAF", "Central African Rep."],
  ["CPV", "Cabo Verde"],
  ["CAN", "Canada"],
  ["CMR", "Cameroon"],
  ["KHM", "Cambodia"],
  ["MMR", "Myanmar"],
  ["BDI", "Burundi"],
  ["BFA", "Burkina Faso"],
  ["BGR", "Bulgaria"],
  ["BRN", "Brunei"],
  ["BRA", "Brazil"],
  ["BWA", "Botswana"],
  ["BIH", "Bosnia and Herz."],
  ["BOL", "Bolivia"],
  ["BTN", "Bhutan"],
  ["BEN", "Benin"],
  ["BLZ", "Belize"],
  ["BEL", "Belgium"],
  ["BLR", "Belarus"],
  ["BRB", "Barbados"],
  ["BGD", "Bangladesh"],
  ["BHR", "Bahrain"],
  ["BHS", "Bahamas"],
  ["AZE", "Azerbaijan"],
  ["AUT", "Austria"],
  ["AUS", "Australia"],
  ["HMD", "Heard I. and McDonald Is."],
  ["NFK", "Norfolk Island"],
  ["ARM", "Armenia"],
  ["ARG", "Argentina"],
  ["ATG", "Antigua and Barb."],
  ["AGO", "Angola"],
  ["AND", "Andorra"],
  ["DZA", "Algeria"],
  ["ALB", "Albania"],
  ["AFG", "Afghanistan"],
  ["ATA", "Antarctica"],
  ["SXM", "Sint Maarten"],
  ["VAT", "Vatican"],
])

// some assumptions to fill out the map
// missing part of Somaliland->somolia
// missing part of western sahara->Mauritania
// taiwain->china
// kosovo->serbia
// Antarctica->nothing

function copyCountry(country, name) {
  // serialize the javscript object to make a deep copy
  var countryStr = JSON.stringify(country)
  var newCountry = JSON.parse(countryStr);
  newCountry.country_iso = name;
  return newCountry;
}
function convertCountries(data) {
  var newData = []
  for (var i=0; i < data.length; i++) {
    var iso = data[i].country_iso;
    // if found in convert...
    if (convert.get(iso) !== undefined) {
      var new_data = null;
      // places on the map, we will copy close country info from
      if (iso === "CHN") { new_data = copyCountry(data[i], "Taiwan"); }
      if (iso === "SOM") { new_data = copyCountry(data[i], "Somaliland"); }
      if (iso === "MRT") { new_data = copyCountry(data[i], "W. Sahara"); }
      if (iso === "SRB") { new_data = copyCountry(data[i], "Kosovo"); }
      if (iso === "IND") { new_data = copyCountry(data[i], "Siachen Glacier"); }
      if (iso === "GBR") { new_data = copyCountry(data[i], "Indian Ocean Ter."); }
      if (iso === "IDN") { new_data = copyCountry(data[i], "Ashmore and Cartier Is."); }
      if (iso === "TUR") { new_data = copyCountry(data[i], "N. Cyprus"); }
      if (iso === "FRA") { new_data = copyCountry(data[i], "Fr. S. Antarctic Lands"); }

      if (new_data != null) newData.push(new_data)
      data[i].country_iso = convert.get(iso)
    }
  }
  for (var i=0; i < newData.length; i++) {
    data.push(newData[i]);
  }
  return data;
}

/*
function convertISO(data, csv_data) {
  var convertString = '';
  console.log(convert.length)
  for (var i=0; i < convert.length; i++) {
    for (var j=0; j < csv_data.length; j++) {
      var en1 = csv_data[j]["official_name_en"];
      var en2 = csv_data[j]["official_name_en"];
      //console.log(en)
      console.log(convert[i][0]);
      if (convert[i][0] === en1) {
        console.log("FOUND IT " + en1)
        var iso = csv_data[j]["ISO3166-1-Alpha-3"];
        convertString += '["'+iso+'", "'+en2+'"],\n'
      }
    }
  }
  console.log(convertString);
  return data;
}
*/
