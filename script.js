class Calculator {
    constructor(prevOpButton, currentOpButton) {
        this.prevOpButton = prevOpButton;
        this.currentOpButton = currentOpButton;
        this.clear()
    }


    clear() {
        this.currentOp = '';
        this.prevOp = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)

    }

    appendNum(number) {
        if(number === '.' && this.currentOp.includes('.'))
        return this.currentOp = this.currentOp.toString() + number.toString()
    }

    chooseOp(operation) {
        if(this.currentOp === '') return
        if(this.prevOp !== '') {
            this.calculate()
        }
        this.operation = operation;
        this.prevOp = this.currentOp;
        this.currentOp = '';
    }

    calculate() {
        let calculation
        const prev = parseFloat(this.prevOp)
        const current = parseFloat(this.currentOp)

        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '/':
                calculation = prev / current
                break
            default:
                return
        }
        this.currentOp = calculation
        this.operation = undefined
        this.prevOp = ''

    }

    getDisplayNumber(number) {
        const strNum = number.toString()
        const intDigits = parseFloat(strNum.split('.')[0])
        const decDigits = strNum.split('.')[1]

        let integerDisplay
        if(isNaN(intDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decDigits != null) {
            return `${integerDisplay}.${decDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOpButton.innerText = this.getDisplayNumber(this.currentOp)
        if(this.operation != null) {
            this.prevOpButton.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.operation}`
        } else {
            this.prevOpButton.innerText = ''
        }
    }

}

const numButtons = document.querySelectorAll('[data-num]');
const opButtons = document.querySelectorAll('[data-op]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpButton = document.querySelector('[data-previous-op]');
const currentOpButton = document.querySelector('[data-current-op]');

const calculator = new Calculator(prevOpButton, currentOpButton)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})