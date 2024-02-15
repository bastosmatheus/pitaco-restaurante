export class QuantityOfOrders {
  private iconPlus: HTMLElement;
  private iconMinus: HTMLElement;

  constructor(plus: HTMLElement, minus: HTMLElement) {
    this.iconPlus = plus;
    this.iconMinus = minus;
  }

  public updatesOrderInput() {
    this.increaseOrders();
    this.reduceOrders();
  }

  private increaseOrders() {
    this.iconPlus.addEventListener("click", () => {
      const divCounter = this.iconPlus.parentElement as HTMLDivElement;
      const inputCounter = divCounter.querySelector(".cart__input-counter") as HTMLInputElement;

      if (inputCounter.valueAsNumber >= 1 && inputCounter.valueAsNumber < 10) {
        inputCounter.valueAsNumber++;
      }
    });
  }

  private reduceOrders() {
    this.iconMinus.addEventListener("click", () => {
      const divCounter = this.iconMinus.parentElement as HTMLDivElement;
      const inputCounter = divCounter.querySelector(".cart__input-counter") as HTMLInputElement;

      if (inputCounter.valueAsNumber >= 1 && inputCounter.valueAsNumber <= 10) {
        inputCounter.valueAsNumber--;
      }

      if (inputCounter.valueAsNumber === 0) {
        inputCounter.valueAsNumber = 1;
      }
    });
  }
}
