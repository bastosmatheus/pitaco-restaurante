import { QuantityOfOrders } from "./QuantityOfOrders";

export class TotalOrder {
  private inputCounter: HTMLElement;
  private spanPrice: HTMLSpanElement;
  private iconPlus: HTMLElement;
  private iconMinus: HTMLElement;

  constructor(input: HTMLElement, span: HTMLSpanElement, plus: HTMLElement, minus: HTMLElement) {
    this.inputCounter = input;
    this.spanPrice = span;
    this.iconPlus = plus;
    this.iconMinus = minus;

    const quantityOfOrders = new QuantityOfOrders(this.iconPlus, this.iconMinus);
    quantityOfOrders.updatesOrderInput();
  }

  public calculatePriceTotal() {
    const spansValue = document.querySelectorAll(".cart__value") as NodeListOf<HTMLSpanElement>;

    const [spanValueDelivery, spanValueDishes, spanValueTotal] = [...spansValue];

    const priceItem = parseFloat(this.spanPrice.innerText?.split(" ")[1] as string);
    const totalValueOfDishes = priceItem + Number(spanValueDishes.innerText);
    const amount = totalValueOfDishes + Number(spanValueDelivery.innerText);

    spanValueDelivery.innerText = "5.00";
    spanValueDishes.innerText = totalValueOfDishes.toFixed(2);
    spanValueTotal.innerText = amount.toFixed(2);

    this.updatePrice(
      totalValueOfDishes,
      priceItem,
      spanValueDishes,
      spanValueTotal,
      spanValueDelivery
    );
  }

  private updatePrice(
    totalValueOfDishes: number,
    priceItem: number,
    spanValueDishes: HTMLElement,
    spanValueTotal: HTMLElement,
    spanValueDelivery: HTMLElement
  ) {
    this.iconPlus.addEventListener("click", () => {
      if (this.inputCounter.valueAsNumber >= 1 && this.inputCounter.valueAsNumber < 10) {
        totalValueOfDishes = priceItem + Number(spanValueDishes.innerText);
        this.totalPrices(spanValueDishes, spanValueTotal, spanValueDelivery, totalValueOfDishes);
      }
    });

    this.iconMinus.addEventListener("click", () => {
      if (this.inputCounter.valueAsNumber > 1 && this.inputCounter.valueAsNumber <= 10) {
        totalValueOfDishes = Number(spanValueDishes.innerText) - priceItem;
        this.totalPrices(spanValueDishes, spanValueTotal, spanValueDelivery, totalValueOfDishes);
      }
    });
  }

  private totalPrices(
    spanValueDishes: HTMLElement,
    spanValueTotal: HTMLElement,
    spanValueDelivery: HTMLElement,
    totalValueOfDishes: number
  ) {
    spanValueDishes.textContent = totalValueOfDishes.toFixed(2);
    const amount = totalValueOfDishes + Number(spanValueDelivery.innerText);
    spanValueTotal.textContent = amount.toFixed(2);
  }
}
