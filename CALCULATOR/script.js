const screen = document.querySelector(".screen");
const keys = document.querySelectorAll(".keys");
const clear = document.querySelector("#clear");
const percent = document.querySelector("#percent");
const decimal = document.querySelector("#decimal");
const equal = document.querySelector("#equal");
let operator = ["+", "-", "/", "x", ".", "%"];

keys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyValue = key.textContent;
    if (
      screen.innerHTML === "" ||
      (screen.innerHTML === "0" && keyValue === ".")
    ) {
      screen.innerHTML = "0.";
    }
    if (keyValue === "=") {
      keyValue = "";
    }
    if (keyValue === "C") {
      keyValue = "";
      screen.innerHTML = screen.innerHTML.slice(0, -1);
    }
    if (
      screen.innerHTML === "Error" ||
      (screen.innerHTML === "0" && keyValue !== ".")
    ) {
      screen.innerHTML = "";
    }
    if (keyValue === "*") {
      keyValue = "x";
    }
    if (operator.includes(keyValue)) {
      if (
        screen.innerHTML === "" ||
        operator.includes(screen.innerHTML.slice(-1))
      ) {
        return;
      }
    }
    screen.innerHTML += keyValue;
  });
});

clear.addEventListener("click", () => {
  screen.innerHTML = "0";
});

document.addEventListener("DOMContentLoaded", () => {
  screen.innerHTML = "0";
});

equal.addEventListener("click", () => {
  function calculate() {
    let expression = screen.textContent;
    if (expression.includes("x")) {
      expression = expression.replace(/x/g, "*");
    }
    try {
      let result = parseFloat(eval(expression).toFixed(2));
      screen.innerHTML = result;
    } catch (error) {
      console.error("Error in calculation:", error);
      screen.innerHTML = "Error";
    }
  }
  calculate();
});
percent.addEventListener("click", () => {
  let currentValue = parseFloat(screen.innerHTML);
  if (!isNaN(currentValue)) {
    screen.innerHTML = currentValue / 100;
  }
});
