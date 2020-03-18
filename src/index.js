function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let temp = [];
    let stack = [];
    let result = [];

    const OPERATOR = {
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2,
        '(': 1,
        ')': 1
    }

    let operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => { 
            if(x === 0 || y === 0) {
                throw("TypeError: Division by zero.")
            }
            return x / y;
        },
    };
    
    let arr = expr.match(/\(|\)|\d+|[\+,\-,\*,\/]/g);

    for(let i = 0; i < arr.length; i++){
        
        if(arr.length) { 
            let checkOperator = arr[i];              
            if(checkOperator in OPERATOR) {
                if(stack.length) {
                    if(checkOperator === ')') {
                        let item = stack.some(stackItem => {
                            return stackItem === '(';
                        })

                        if(item) {
                            for(let i = stack.length - 1; i >= 0; i--) {
                                if(stack[i] !== "(" && stack.length > 0) {
                                    temp.push(stack.pop(stack[i]))
                                } else if(stack[i] === '(') {
                                    stack.pop(stack[i]);
                                    break;
                                }
                            }
                        } else {
                            throw("ExpressionError: Brackets must be paired");
                        }
                    } else if(checkOperator === '(') {
                        stack.push(checkOperator);
                    } else {
                        if (OPERATOR[checkOperator] > OPERATOR[stack[stack.length - 1]]) {
                            stack.push(checkOperator);
                        } else if(OPERATOR[checkOperator] === OPERATOR[stack[stack.length - 1]]) {
                            temp.push(stack.pop(stack[stack.length - 1]));
                            stack.push(checkOperator);
                        } else {
                            while(OPERATOR[checkOperator] <= OPERATOR[stack[stack.length - 1]]) {
                                temp.push(stack.pop(stack[stack.length - 1]));
                            }
                            stack.push(checkOperator);
                        }  
                    }    
                } else {
                    stack.push(checkOperator);
                }
            } else {
                temp.push(parseInt(checkOperator));
            }
        }
    }
    
    while(stack.length) {
        stack.forEach((checkOperator) => {
            if(checkOperator === '(') {
                throw("ExpressionError: Brackets must be paired");
            } else {
                temp.push(stack.pop(checkOperator));
            }    
        })
    }

    temp.map((checkOperator) => {
        if (checkOperator in operators) {
            let [x, y] = [result.splice(result.length - 2, 1).join(), result.splice(result.length - 1, 1).join()];
            result.push(operators[checkOperator](parseFloat(x), parseFloat(y)));
        } else {
            result.push(checkOperator);
        }
    });
    return result.pop();
};

module.exports = {
    expressionCalculator
}