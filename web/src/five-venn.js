// Using this venn diagram from https://github.com/benfred/venn.js MIT license

// create chart, and turn off default styling (using CSS instead)
var chart = venn.VennDiagram()
    .styled(false);

var one = 15;
var two = 7;
var three = 4;
var four = 4;
var five = 4;

// draw chart
d3.select("#venn")
  .datum([
    { sets: ['A'], size: one, label : 'Innovation', title: 'Innovation', key: '', country: '', desc: '' },
    { sets: ['B'], size: one, label : 'Wealth', title: 'Wealth', key: '', country: '', desc: '' },
    { sets: ['C'], size: one, label : 'Happy', title: 'Happy', key: '', country: '', desc: '' },
    { sets: ['D'], size: one, label : 'Education', title: 'Education', key: '', country: '', desc: '' },
    { sets: ['E'], size: one, label : 'Healthy', title: 'Healthy', key: '', country: '', desc: '' },
    { sets: ['A','B'], size: two, label : '', title: 'Innovation & Wealth', key: '', country: '', desc: '' },
    { sets: ['B','C'], size: two, label : '', title: 'Wealth & Happy', key: '', country: '', desc: '' },
    { sets: ['C','D'], size: two, label : '', title: 'Happy & Education', key: '', country: '', desc: '' },
    { sets: ['D','E'], size: two, label : '', title: 'Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['E','A'], size: two, label : '', title: 'Innovation & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','B','C'], size: three, label : '', title: 'Innovation & Wealth & Happy', key: '', country: '', desc: '' },
    { sets: ['A','B','E'], size: three, label : '', title: 'Innovation & Wealth & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','D','E'], size: three, label : '', title: 'Innovation & Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['B','C','D'], size: three, label : '', title: 'Wealth & Happy & Education', key: '', country: '', desc: '' },
    { sets: ['C','D','E'], size: three, label : '', title: 'Happy & Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','B','C','D'], size: four, label : '', title: 'Innovation & Wealth & Happy & Education', key: '', country: '', desc: '' },
    { sets: ['A','B','C','E'], size: four, label : '', title: 'Innovation & Wealth & Happy & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','B','D','E'], size: four, label : '', title: 'Innovation & Happy & Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','C','D','E'], size: four, label : '', title: 'Innovation & Happy & Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['B','C','D','E'], size: four, label : '', title: 'Wealth & Happy & Education & Healthy', key: '', country: '', desc: '' },
    { sets: ['A','B','C','D','E'], size: five, label : '', title: 'Innovation & Wealth & Happy & Education & Healthy', key: '', country: '', desc: '' }
  ])
  .attr("class", "over")
  .call(chart);

  d3.select("#venn").selectAll("g")
    .on("mouseclick", function(d) {
      showInfo(d);
    })
    .on("mouseover", function(d) {
      showInfo(d);
    })

function showInfo(d) {
  venn.sortAreas(d3.select("#venn"), d);
  var country = document.getElementById("venn-title");
  var title = document.getElementById("venn-title");
  country.innerHTML = d.country;
  title.innerHTML = d.title;
}
