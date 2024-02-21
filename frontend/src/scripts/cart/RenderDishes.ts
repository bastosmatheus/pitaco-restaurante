import { CartDish, ResponseCart } from "../@types/types";
import { Structure } from "../Structure";

class Cart {
  public renderDishesInCart() {
    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:3000/user/cart/${token}`)
      .then((response) => response.json())
      .then((responseCart: ResponseCart) => {
        const dishes = responseCart.cart.dishes;
        const lengthCart = dishes.length;

        const spanItems = document.querySelector(".cart__quantity-items") as HTMLSpanElement;

        spanItems.innerText = `${
          lengthCart === 1
            ? `Você tem ${lengthCart} item no carrinho`
            : `Você tem ${lengthCart} itens no carrinho`
        }`;

        dishes.forEach((dish: CartDish) => {
          this.createLiAndAddInTheList(dish);
        });

        this.calculatePriceTotal();
      });
  }

  private createLiAndAddInTheList(dish: CartDish) {
    const structure = new Structure();

    const ul = structure.createElement("ul", { class: "cart__list" });
    const li = structure.createElement("li", { class: "cart__item" });
    const imgDish = structure.createElement("img", {
      class: "cart__img",
      loading: "lazy",
    });
    const divFirstColumn = structure.createElement("div", { class: "cart__second-column" });
    const h2NameDish = structure.createElement("h2", { class: "cart__name-dish" });
    const spanPrice = structure.createElement("span", { class: "cart__price" });

    const divDishes = document.querySelector(".cart__dishes") as HTMLDivElement;

    li.appendChild(imgDish);
    li.appendChild(divFirstColumn);
    divFirstColumn.appendChild(h2NameDish);
    divFirstColumn.appendChild(spanPrice);

    this.addInfos(imgDish, h2NameDish, spanPrice, dish);
    ul.appendChild(li);
    divDishes.appendChild(ul);
  }

  private addInfos(
    imgDish: HTMLElement,
    h2NameDish: HTMLElement,
    spanPrice: HTMLElement,
    dish: CartDish
  ): void {
    imgDish.setAttribute("src", dish.image);
    imgDish.setAttribute("alt", dish.nameDish);
    imgDish.setAttribute("title", dish.nameDish);
    h2NameDish.innerText = `${dish.quantityOfOrder}x ${dish.nameDish}`;
    spanPrice.innerText = `R$ ${dish.valueTotal.toFixed(2)}`;
  }

  private calculatePriceTotal() {
    const spansValue = document.querySelectorAll(".cart__value") as NodeListOf<HTMLSpanElement>;
    const spansPriceWithSymbols = document.querySelectorAll(
      ".cart__price"
    ) as NodeListOf<HTMLSpanElement>;
    const spansPriceWithoutSymbols: number[] = [];

    spansPriceWithSymbols.forEach((spanPriceWithSymbol) => {
      spansPriceWithoutSymbols.push(Number(spanPriceWithSymbol.innerText.split(" ")[1]));
    });

    const [spanDelivery, spanTotalDishes, spanTotalOrder] = spansValue;

    const totalPriceOfDishes = spansPriceWithoutSymbols
      .reduce((acc, currentValue) => acc + currentValue, 0)
      .toFixed(2);

    spanDelivery.textContent = `5.00`;
    spanTotalDishes.textContent = `${totalPriceOfDishes}`;
    spanTotalOrder.textContent = `${(
      parseFloat(totalPriceOfDishes) + parseFloat(spanDelivery.textContent)
    ).toFixed(2)}`;
  }
}

const cart = new Cart();
cart.renderDishesInCart();
