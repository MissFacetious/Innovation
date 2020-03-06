var element1 = document.getElementById("money");
var element2 = document.getElementById("education");

var spin1 = true;
var spin2 = true;

randomNum();
randomLetter();

function randomNum() {
  if (spin1) {
    var number1 = Math.floor(Math.random() * 10);
    var number2 = Math.floor(Math.random() * 10);
    element1.innerHTML = number1 + "" + number2 + "k";
  }
  setTimeout(randomNum, 200)
}

function randomLetter() {
  if (spin2) {
    var letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    var letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    element2.innerHTML = letter1 + "" + letter2;
  }
  setTimeout(randomLetter, 300)
}


function stopMoney() {
  if (spin1) {
    element1.classList.remove("spin")
    spin1 = false;
  }
  else {
    randomNum();
    element1.classList.add("spin")
    spin1 = true;
  }
}

function stopEducation() {
  if (spin2) {
    element2.classList.remove("spin")
    spin2 = false;
  }
  else {
    randomLetter();
    element2.classList.add("spin")
    spin2 = true;
  }
}
