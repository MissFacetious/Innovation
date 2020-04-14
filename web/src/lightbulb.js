javascript:showCountry(1);

function showCountry(value) {
  let numberDiv = document.getElementById("top5-number");
  let titleDiv = document.getElementById("top5-title");
  let summaryDiv = document.getElementById("top5-summary");
  let bulbDiv = document.getElementById("bulb"+value);

  let array = [
    {
      "country": "High Innovation Countries",
      "summary": "Famous for new technology and advancements, these countries can be seen as something to strive towards.<br/><br/>"+
        "Countries include:<br/>"+
        "<span class=\"country\">United States of America</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text high-blue\">high</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">Japan</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text high-blue\">high</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">Sweden</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text high-blue\">high</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">China</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text high-purple\">high</span> creative but <span class=\"squared-text medium-purple\">medium</span> economic impacts</span><br/>"+
        "<span class=\"country\">Australia</span><br/>"+
        "<span class=\"effects\">which also has <span class=\"squared-text high-green\">high</span> economic but <span class=\"squared-text medium-purple\">medium</span> creative impacts</span>",
    },
    {
      "country": "Medium Innovation Countries",
      "summary": "Just hitting their stride, these countries can have a robust economy and creative sectors, but not potentially enough to set them apart from the best. <br/><br/>"+
        "Countries include:<br/>"+
        "<span class=\"country\">Russia</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text medium-blue\">medium</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">Mexico</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text medium-blue\">medium</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">Brazil</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text medium-green\">medium</span> economic but <span class=\"squared-text low-purple\">low</span> creative impacts</span><br/>"+
        "<span class=\"country\">Vietnam</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text medium-green\">medium</span> economic but <span class=\"squared-text low-purple\">low</span> creative impacts</span><br/>",
    },
    {
      "country": "Low Innovation Countries",
      "summary": "Still working through culture and economic factors, these countries could be the next big thing with a little bit of time. <br/><br/>"+
        "Countries include:<br/>"+
        "<span class=\"country\">Nigeria</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text low-blue\">low</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">Afghanistan</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text low-blue\">low</span> economic and creative impacts</span><br/>"+
        "<span class=\"country\">India</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text low-green\">low</span> economic but <span class=\"squared-text medium-purple\">medium</span> creative impacts</span><br/>"+
        "<span class=\"country\">Guatemala</span><br/>"+
        "<span class=\"effects\">which also have <span class=\"squared-text low-purple\">low</span> creative but <span class=\"squared-text medium-green\">medium</span> economics impacts</span><br/>",
    },
  ];
    bulbDiv.classList.remove("yellow"+value+"-solid")
    bulbDiv.classList.add("yellow"+value)
    for (var i=0; i < array.length; i++) {
      if (value !== (i+1)) {
        let bulbDiv2 = document.getElementById("bulb"+(i+1));
        bulbDiv2.classList.remove("yellow"+(i+1))
        bulbDiv2.classList.add("yellow"+(i+1)+"-solid")
      }
    }
    titleDiv.innerHTML = array[value-1].country;
    summaryDiv.innerHTML = array[value-1].summary;
    //numberDiv.innerHTML = "#"+value;
}
