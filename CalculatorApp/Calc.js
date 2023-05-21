var num1 = 0;
var num2 = 0;
var result = 0;
var operatorPress = false;
var operation;
var decimal = false;

function multiply(op1, op2) {
    return op1 * op2;
}

function add(op1, op2) {
    return op1 + op2;
}

function divide(op1, op2) {
    return op1 / op2;
}

function mod(op1, op2) {
    return op1 % op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function backspace() {
    if(num1 === 0 && num2 === 0 && result != 0) {
        console.log("Nothing to delete");
    } else {
        if(operatorPress) {
            num2 = (num2 - (num2 % 10)) / 10;
            $(".output").html(num2);
        } else {
            num1 = (num1 - (num1 % 10)) / 10;
            $(".output").html(num1);
        } 
    }
}

function reset() {
    num1 = 0;
    num2 = 0;
    operatorPress = false;
    decimal = false;
    operation = "";
}

$(".num").on("click", function(event) {
    if(operatorPress === true) {
        if(num2 === 0) {
            if(decimal) {
                num2 = event.target.value;
                num2 = num2 / 10;
            } else {
                num2 = event.target.value;
            }
        } else {
            if(decimal) {
                num2 = num2 + (1 / event.target.value);
            } else {
                num2 = num2 + event.target.value;
            }
        }
        $(".output").html(num2);
    } else {
        if(num1 === 0) {
            if(decimal) {
                num1 = event.target.value;
                num1 = num1 / 10
            } else {
                num1 = event.target.value;
            }
        } else {
            if(decimal) {
                var temp = event.target.value / 10;
                num1 = num1 + temp;
            } else {    
                num1 = num1 + event.target.value;
            }
        }
        $(".output").html(num1);
    }
    console.log("num1: " + num1 + " num2: " + num2);
});

$(".op").on("click", function(event) {
    switch (event.target.value) {
        case "del":
            backspace();
            break;
        case "%":
            operation = "%";
            break;
        case "/":
            operation = "/";
            break;
        case "x":
            operation = "x";
            break;
        case "-":
            operation = "-";
            break;
        case "+":
            operation = "+";
            break;
        default:
            console.log(event);
            break;
    }

    if(event.target.value === "=") {
        switch (operation) {
            case "%":
                result = mod(num1, num2);
                break;
            case "/":
                result = divide(num1, num2);
                break;
            case "x":
                result = multiply(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "+":
                result = add(num1, num2);
                break;
            default:
                result = num1;
                break;
        }

        $(".output").html(result);
        reset();
    } else if(!(event.target.value === "del")){
        operatorPress = true;
        decimal = false;
    }
});

$(".clear").on("click", function() {
    reset();
    $(".output").html(num1)
})

$(".modify").on("click", function(event) {
    switch (event.target.value) {
        case "abs":
            if(operatorPress && num2 < 0) {
                num2 *= -1;
            } else if(!operatorPress && num1 < 0) {
                num1 *= -1;
            }
            break;
        case "(":

            break;
        case ")":

            break;
        case "negate":
            if(operatorPress) {
                num2 *= -1;
            } else {
                num1 *= -1;
            }
            break;
        case "decimal":
            if(operatorPress) {
                decimal = true;
                $(".output").text(num2 + ".");
            } else {
                decimal = true;
                $(".output").text(num1 + ".");
            }
            break;
        default:
            break;
    }
})