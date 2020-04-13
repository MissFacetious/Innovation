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
        "United States of America<br/>"+
        "Sweden<br/>"+
        "Japan<br/>"+
        "Australia<br/>",
    },
    {
      "country": "Medium Innovation Countries",
      "summary": "Just hitting their stride, these countries can have a robust economy and creative sectors, but not potentially enough to set them apart from the best. <br/><br/>"+
        "Countries include:<br/>"+
        "Brazil<br/>"+
        "India<br/>"+
        "Russia<br/>"+
        "Vietnam<br/>",
    },
    {
      "country": "Low Innovation Countries",
      "summary": "Still working through culture and economic factors, these countries could be the next big thing with a little bit of time. <br/><br/>"+
        "Countries include:<br/>"+
        "India<br/>"+
        "Nigeria<br/>"+
        "Guatemala<br/>"+
        "Afghanistan<br/>",
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
