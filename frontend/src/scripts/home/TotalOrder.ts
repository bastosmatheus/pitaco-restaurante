export class TotalOrder {
  constructor(
    private spanPrice: HTMLSpanElement,
    private spanNumberOfItems: HTMLSpanElement,
    private spanTotal: HTMLSpanElement
  ) {
    spanNumberOfItems.textContent = "1";
  }

  public calculatePriceTotal() {
    const valueItem = this.spanPrice.innerText.split(" ")[1];

    this.spanTotal.textContent = (
      parseFloat(valueItem) * parseInt(this.spanNumberOfItems.innerText)
    ).toFixed(2);
  }
}
