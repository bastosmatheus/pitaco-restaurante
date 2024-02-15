import { Structure } from "../Structure";
import { TotalOrder } from "./TotalOrder";

class Cart {
  private structure = new Structure();
  private ul = this.structure.createElement("ul", { class: "cart__list" });
  private divDishes = document.querySelector(".cart__dishes") as HTMLDivElement;
  private spanItens = document.querySelector(".cart__quantity-items") as HTMLSpanElement;

  public renderDishesInCart() {
    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:3000/cart/${token}`)
      .then((r) => r.json())
      .then((data) => {
        this.spanItens.innerText = `${
          data.cart.dishes.length === 1
            ? `Você tem ${data.cart.dishes.length} item no carrinho`
            : `Você tem ${data.cart.dishes.length} itens no carrinho`
        }`;
        data.cart.dishes.forEach((dish: unknown) => {
          this.createLiAndAddInTheList(dish);
        });
      });
  }

  private createLiAndAddInTheList(dish: unknown) {
    const li = this.structure.createElement("li", { class: "cart__item" });
    const imgDish = this.structure.createElement("img", {
      class: "cart__img",
      loading: "lazy",
    });
    const divFirstColumn = this.structure.createElement("div", { class: "cart__second-column" });
    const h2NameDish = this.structure.createElement("h2", { class: "cart__name-dish" });
    const spanPrice = this.structure.createElement("span", { class: "cart__price" });
    const divCounter = this.structure.createElement("div", { class: "cart__counter" });
    const iconMinus = this.structure.createElement("i", { class: "ph-bold ph-minus" });
    const inputCounter = this.structure.createElement("input", {
      class: "cart__input-counter",
      type: "number",
      name: "counter",
      id: "counter",
      readonly: "",
    });
    const iconPlus = this.structure.createElement("i", { class: "ph-bold ph-plus" });

    li.appendChild(imgDish);
    li.appendChild(divFirstColumn);
    divFirstColumn.appendChild(h2NameDish);
    divFirstColumn.appendChild(spanPrice);
    divFirstColumn.appendChild(divCounter);
    divCounter.appendChild(iconMinus);
    divCounter.appendChild(inputCounter);
    divCounter.appendChild(iconPlus);

    this.addInfosInLi(li, imgDish, h2NameDish, spanPrice, inputCounter, dish);

    const totalOrder = new TotalOrder(inputCounter, spanPrice, iconPlus, iconMinus);
    totalOrder.calculatePriceTotal();
  }

  private addInfosInLi(
    li: HTMLElement,
    imgDish: HTMLElement,
    h2NameDish: HTMLElement,
    spanPrice: HTMLElement,
    inputCounter: HTMLElement,
    dish: unknown
  ): void {
    imgDish.setAttribute("src", dish.image);
    imgDish.setAttribute("alt", dish.nameDish);
    imgDish.setAttribute("title", dish.nameDish);
    h2NameDish.innerText = `${dish.nameDish}`;
    spanPrice.innerText = `R$ ${dish.value}`;
    inputCounter.value = 1;

    this.ul.appendChild(li);
    this.divDishes.appendChild(this.ul);
  }
}

const cart = new Cart();
cart.renderDishesInCart();
