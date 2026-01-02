import { createCalculator } from "./modules/createCalculator.js";
import { moveHistory } from "./modules/historyCalc.js";

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

window.historyBack = () => {
    const value = moveHistory(-1);
    if (value !== null) {
        calc.setCurrent(value);
        document.querySelector("#result .key_value").innerHTML = value;
        document.querySelector("#result .final_result").innerHTML = value;
    }
};

window.historyForward = () => {
    const value = moveHistory(1);
    if (value !== null) {
        calc.setCurrent(value);
        document.querySelector("#result .key_value").innerHTML = value;
        document.querySelector("#result .final_result").innerHTML = value;
    }
};



