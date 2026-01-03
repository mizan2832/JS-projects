import { saveHistory } from "./historyCalc.js";

export function createCalculator(){
    let current = 0;
    let total = 0;
    let lastop = null;

    return {
        cal_value(number){
            current = current*10 + number;
            if(lastop=="root"){
                console.log(lastop,current);
                document.querySelector("#result .key_value").innerHTML = `"&radic;(${current})"`;
            }
            return current; 
        },
        operator(op){

            switch(op){
                case "plus":
                   total = total + current;
                   current = 0;
                   lastop = "plus"; 
                   break;

                case "minus":
                    total = Math.abs(total - current);
                    current = 0;
                    lastop = "minus";
                    break;

                case "devide":
                    if(total===0){
                    total = current;
                    }
                    else if(current===0){
                        total = total;
                    }
                    else
                        total = total / current;
                    current = 0;
                    lastop="devide";
                    break;

                case "CE":
                    current=0;
                    total = 0;
                    break;
                case "root":
                    document.querySelector("#result .key_value").innerHTML = '&radic;()';
                    total = current;
                    lastop="root";
                    break;

                case "equal":
                     if(lastop=="minus"){
                    total = total-current;
                    }
                    else if(lastop=="devide") {
                        total = total / current;
                    }
                    else if(lastop=="root") {
                        total = Math.sqrt(total); 
                    }
                    else 
                        total = total + current;
                    saveHistory(total);
                    current =0;
                    break;

            }

             return {
                total: Math.abs(total),
                lastop
             };
        }
        
    }

    function setCurrent(value){
        current = value;
        total = value;
    }
    return {
        cal_value,
        operator,
        setCurrent
    }
}