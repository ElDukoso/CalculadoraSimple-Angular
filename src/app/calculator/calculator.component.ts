import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    if (!isNaN(Number(key))) {
      this.getNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      this.operation(key);
    } else if (key === 'Enter' || key === '=') {
      this.getAnswer();
    } else if (key === '.') {
      this.getDecimal();
    } else if (key === 'Backspace') {
      this.clear();
    }
  }

  public getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op: string, secondOperand: number) {
    switch (op) {
      case '+':
        return (this.firstOperand ?? 0) + secondOperand;
      case '-':
        return (this.firstOperand ?? 0) - secondOperand;
      case '*':
        return (this.firstOperand ?? 0) * secondOperand;
      case '/':
        return (this.firstOperand ?? 0) / secondOperand;
      default:
        return secondOperand;
    }
  }

  public operation(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  public getAnswer() {
    if (this.operator && this.firstOperand !== null) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitForSecondNumber = false;
    }
  }
}
