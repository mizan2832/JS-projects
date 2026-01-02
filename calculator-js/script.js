import { createCalculator } from "./modules/createCalculator.js";

const calc = createCalculator();

window.cal_value = function (number) {
    document.querySelector("#result .key_value").innerHTML =
        calc.cal_value(number);
};

window.operator = function (op) {
    document.querySelector("#result .final_result").innerHTML =
        calc.operator(op).total;

    if (op === "CE") {
        document.querySelector("#result .key_value").innerHTML = "";
    }
};



