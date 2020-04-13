function showCountry(value) {
  let numberDiv = document.getElementById("top5-number");
  let titleDiv = document.getElementById("top5-title");
  let summaryDiv = document.getElementById("top5-summary");
  let bulbDiv = document.getElementById("bulb"+value);
  console.log(bulbDiv);
  let array = [
    {
      "country": "Country Name1",
      "summary": "This is a summary for...",
    },
    {
      "country": "Country Name2",
      "summary": "This is a summary for...",
    },
    {
      "country": "Country Name3",
      "summary": "This is a summary for...",
    },
  ];
    bulbDiv.classList.remove("yellow"+value+"-solid")
    bulbDiv.classList.add("yellow"+value)
    for (var i=0; i < array.length; i++) {
      console.log(value === (i+1))
      if (value !== (i+1)) {
        console.log(i+1)
        let bulbDiv2 = document.getElementById("bulb"+(i+1));
        bulbDiv2.classList.remove("yellow"+(i+1))
        bulbDiv2.classList.add("yellow"+(i+1)+"-solid")
      }
    }
    titleDiv.innerHTML = array[value-1].country;
    summaryDiv.innerHTML = array[value-1].summary;
    numberDiv.innerHTML = "#"+value;
}
