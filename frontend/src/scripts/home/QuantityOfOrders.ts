import { TotalOrder } from "./TotalOrder";

export class QuantityOfOrders {
  private totalOrder = new TotalOrder(this.spanPrice, this.spanNumberOfItems, this.spanTotal);

  constructor(
    private buttonIncrement: HTMLButtonElement,
    private buttonDecrement: HTMLButtonElement,
    private spanNumberOfItems: HTMLSpanElement,
    private spanPrice: HTMLSpanElement,
    private spanTotal: HTMLSpanElement
  ) {}

  public updatesItems() {
    this.totalOrder.calculatePriceTotal();
    this.increaseItems();
    this.reduceItems();
  }

  private increaseItems() {
    this.buttonIncrement.addEventListener("click", (event: Event) => {
      event.stopImmediatePropagation();

      let numberOfItems = parseInt(this.spanNumberOfItems.innerText);

      if (numberOfItems >= 1 && numberOfItems < 10) {
        numberOfItems++;
        this.spanNumberOfItems.textContent = numberOfItems.toString();
      }

      this.totalOrder.calculatePriceTotal();
    });
  }

  private reduceItems() {
    this.buttonDecrement.addEventListener("click", (event: Event) => {
      event.stopImmediatePropagation();

      let numberOfItems = parseInt(this.spanNumberOfItems.innerText);

      if (numberOfItems > 1 && numberOfItems <= 10) {
        numberOfItems--;
        this.spanNumberOfItems.textContent = numberOfItems.toString();
      }

      this.totalOrder.calculatePriceTotal();
    });
  }
}
