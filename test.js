let ans = document.querySelector("#ans");
let history = document.querySelector("#history");
let allowedCharac = "123456789*%-+/";
let allowedOperators = "%*-+/";
let ansGene = false;

function isDigit(char) {
  return !isNaN(char) && char.trim() !== "";
}
function lastChar(char) {
  return char.slice(-1);
}
function isOperator(char) {
  return allowedOperators.includes(char);
}

function add(e) {
  if (ansGene) {
    ans.innerHTML = e.value;
  } else if (isOperator(lastChar(ans.innerHTML))) {
    ans.innerHTML = ans.innerHTML + " " + e.value;
  } else if (isDigit(e.value)) {
    ans.innerHTML = ans.innerHTML + e.value;
  } else {
    ans.innerHTML = ans.innerHTML + " " + e.value;
  }
  ansGene = false;
}
function evalAns() {
  let historyList = document.createElement("li");

  try {
    historyList.innerText = ans.innerHTML; // add 3 + 4 in list
    ans.innerHTML = eval(ans.innerHTML); // evaluate the equation and replace the ans.innerText with accual answer
    historyList.innerText = historyList.innerText + " = " + ans.innerHTML; // add 3 + 4 = 7 in list
    history.appendChild(historyList); // adding list in history
    ansGene = true;
    ans.style.boxShadow = "inset 0 0 0 transparent";
  } catch (err) {
    ans.style.boxShadow = "inset 0 0 0 2px rgb(236, 144, 144)";
  }
}

function del() {
  ans.innerText = ans.innerText.slice(0, -1);
  ans.innerText = ans.innerText.trim();
}

document.addEventListener("keydown", function (e) {
  if (allowedCharac.includes(e.key)) {
    // console.log(e.key);
    ans.innerHTML = ans.innerHTML + " " + e.key;
  } else if (e.key == "Backspace") {
    del();
  } else if (e.key == "=" || e.key == "Enter") {
    evalAns();
  }
});
