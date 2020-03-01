// create chart, and turn off default styling (using CSS instead)
var chart = venn.VennDiagram()
    .styled(false);

var one = 15;
var two = 7;
var three = 3;
var four = 2;
var five = 5;
// draw chart
d3.select("#venn")
  .datum([
    { sets: ['A'], size: one },
    { sets: ['B'], size: one },
    { sets: ['C'], size: one },
    { sets: ['D'], size: one },
    { sets: ['E'], size: one },
    { sets: ['A','B'], size: two, label : 'AB' },
    { sets: ['B','C'], size: two, label : 'BC' },
    { sets: ['C','D'], size: two, label : 'CD' },
    { sets: ['D','E'], size: two, label : 'DE' },
    { sets: ['E','A'], size: two, label : 'EA' },
    { sets: ['A','B','C'], size: three, label : 'ABC' },
    { sets: ['A','B','E'], size: three, label : 'ABE' },
    { sets: ['A','D','E'], size: three, label : 'ADE' },
    { sets: ['B','C','D'], size: three, label : 'BCD' },
    { sets: ['C','D','E'], size: three, label : 'CDE' },
    { sets: ['A','B','C','D'], size: four, label : 'ABCD' },
    { sets: ['A','B','C','E'], size: four, label : 'ABCE' },
    { sets: ['A','B','D','E'], size: four, label : 'ABDE' },
    { sets: ['A','C','D','E'], size: four, label : 'ACDE' },
    { sets: ['B','C','D','E'], size: four, label : 'BCDE' },
    { sets: ['A','B','C','D','E'], size: five, label : 'ABCDE' }
  ])
  .call(chart);

    // add listeners to all the groups to display tooltip on mouseover
    d3.select("#venn").selectAll("g")
      .on("mouseover", function(d, i) {
          // sort all the areas relative to the current item
          venn.sortAreas(d3.select("#venn"), d);
          console.log(d.label);
      })
