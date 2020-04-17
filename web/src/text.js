var spin1 = true;
var spin2 = true;
var spin3 = true;
var spin4 = true;
var spin5 = true;
var spin6 = true;
var spin7 = true;
var spin8 = true;
var spin9 = true;
var spin10 = true;

startAnimation('a1')
startAnimation('a2')
startAnimation('a3')
startAnimation('a4')
startAnimation('a5')
startAnimation('a6')
startAnimation('a7')
startAnimation('a8')
startAnimation('a9')
startAnimation('a10')
//randomNum();
//randomLetter();

function change(element) {
  if (element === 'a1') {
    if (spin1) spin1 = false; else spin1 = true;
    return spin1;
  }
  if (element === 'a2') {
    if (spin2) spin2 = false; else spin2 = true;
    return spin2;
  }
  if (element === 'a3') {
    if (spin3) spin3 = false; else spin3 = true;
    return spin3;
  }
  if (element === 'a4') {
    if (spin4) spin4 = false; else spin4 = true;
    return spin4;
  }
  if (element === 'a5') {
    if (spin5) spin5 = false; else spin5 = true;
    return spin5;
  }
  if (element === 'a6') {
    if (spin6) spin6 = false; else spin6 = true;
    return spin6;
  }
  if (element === 'a7') {
    if (spin7) spin7 = false; else spin7 = true;
    return spin7;
  }
  if (element === 'a8') {
    if (spin8) spin8 = false; else spin8 = true;
    return spin8;
  }
  if (element === 'a9') {
    if (spin9) spin9 = false; else spin9 = true;
    return spin9;
  }
  if (element === 'a10') {
    if (spin10) spin10 = false; else spin10 = true;
    return spin10;
  }
}

function spinning(element) {
  if (element === 'a1') {
    return spin1;
  }
  if (element === 'a2') {
    return spin2;
  }
  if (element === 'a3') {
    return spin3;
  }
  if (element === 'a4') {
    return spin4;
  }
  if (element === 'a5') {
    return spin5;
  }
  if (element === 'a6') {
    return spin6;
  }
  if (element === 'a7') {
    return spin7;
  }
  if (element === 'a8') {
    return spin8;
  }
  if (element === 'a9') {
    return spin9;
  }
  if (element === 'a10') {
    return spin10;
  }
}

function randomNum(element) {
  if (spinning(element)) {
    var number1 = Math.floor(Math.random() * 10);
    var number2 = Math.floor(Math.random() * 10);
    var elementDiv = document.getElementById(element);
    var addition = '';
    if (elementDiv.innerHTML.includes("x")) {
      addition = "x";
    }
    if (elementDiv.innerHTML.includes("%")) {
      addition = "%";
    }
    elementDiv.innerHTML = number1 + "" + number2 + addition;
    setTimeout(function() { randomNum(element) }, 200);
  }
}

//function randomLetter() {
//  if (spin2) {
//    var letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
//    var letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
//    element2.innerHTML = letter1 + "" + letter2;
//  }
//  setTimeout(randomLetter, 300)
//}


//function stopMoney() {
//  if (spin1) {
//    element1.classList.remove("spin")
//    spin1 = false;
//  }
//  else {
//    randomNum();
//    element1.classList.add("spin")
//    spin1 = true;
//  }
//}

//function stopEducation() {
//  if (spin2) {
//    element2.classList.remove("spin")
//    spin2 = false;
//  }
//  else {
//    randomLetter();
//    element2.classList.add("spin")
//    spin2 = true;
//  }
//}


function stopAnimation(element, value) {
  change(element);
  var elementDiv = document.getElementById(element);
  elementDiv.classList.remove("spin")
  elementDiv.innerHTML = value;
}

function startAnimation(element) {
  randomNum(element);
  var elementDiv = document.getElementById(element);
  elementDiv.classList.add("spin")
}
