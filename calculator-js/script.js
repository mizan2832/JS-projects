
function createCalculator(){
    let current = 0;
    let total = 0;
    let lastop = null;

    return {
        cal_value(number){
            current = current*10 + number;
            console.log("current :",current,lastop)
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

                case "equal":
                     if(lastop=="minus"){
                    total = total-current;
                    }
                    else if(lastop=="devide") {
                        total = total / current;
                    }
                    else 
                        total = total + current;
                    current =0;
                    break;

            }

             return {
                total: Math.abs(total),
                lastop
             };
        }
    }
}


const calc = createCalculator();
// console.log(op);

function cal_value(number){
    let key_value = document.querySelector("#result .key_value");
    key_value.innerHTML = calc.cal_value(number);
    // console.log(calc.cal_value(number));
}
function operator(op){
    let final_result = document.querySelector("#result .final_result");
    final_result.innerHTML = Math.abs(calc.operator(op).total);
    if(op=="CE"){
         let key_value = document.querySelector("#result .key_value");
         key_value.innerHTML = " "; 
    }
}



