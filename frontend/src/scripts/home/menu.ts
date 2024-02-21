import { Structure } from "../Structure";
import { InputSearch } from "./InputSearch";
import { Dish, ResponseDefault, ResponseDishes } from "../@types/types";
import { QuantityOfOrders } from "./QuantityOfOrders";

export class Menu {
  public renderAllDishes(): void {
    fetch("http://localhost:3000/dishes")
      .then((response) => response.json())
      .then((responseDishes: ResponseDishes) => {
        const dishes = responseDishes.dishes;

        dishes.forEach((dish: Dish) => {
          this.createLiAndAddInTheList(dish);
        });
      });
  }

  private createLiAndAddInTheList(dish: Dish): void {
    const structure = new Structure();

    const li = structure.createElement("li", { class: "menu__item" });
    const imgDish = structure.createElement("img", {
      class: "menu__img",
      loading: "lazy",
    });
    const divFirstColumn = structure.createElement("div", { class: "menu__first-column" });
    const h2NameDish = structure.createElement("h2", { class: "menu__name-dish" });
    const pDishDescription = structure.createElement("p", {
      class: "menu__dish-description",
    });
    const spanServes = structure.createElement("span", {
      class: "menu__serves-how-many-people",
    });
    const spanPrice = structure.createElement("span", { class: "menu__price" });

    li.appendChild(divFirstColumn);
    li.appendChild(imgDish);
    divFirstColumn.appendChild(h2NameDish);
    divFirstColumn.appendChild(pDishDescription);
    divFirstColumn.appendChild(spanServes);
    divFirstColumn.appendChild(spanPrice);

    this.addInfos(imgDish, h2NameDish, pDishDescription, spanServes, spanPrice, dish);
    this.verifyCategory(li, dish.category);
    this.openModal(li, dish);
  }

  private verifyCategory(li: HTMLElement, category: string): void {
    const ulsMenu = document.querySelectorAll(".menu__list") as NodeListOf<HTMLElement>;

    ulsMenu.forEach((ul) => {
      if (ul.id === category.toLowerCase()) {
        ul.appendChild(li);
      }

      const inputSearch = new InputSearch();

      inputSearch.searching(li);
    });
  }

  private addInfos(
    imgDish: HTMLElement,
    h2NameDish: HTMLElement,
    pDishDescription: HTMLElement,
    spanServes: HTMLElement,
    spanPrice: HTMLElement,
    dish: Dish
  ): void {
    imgDish.setAttribute("src", dish.image);
    imgDish.setAttribute("alt", dish.nameDish);
    imgDish.setAttribute("title", dish.nameDish);
    h2NameDish.innerText = `${dish.nameDish}`;
    pDishDescription.innerText = `${dish.description}`;
    spanServes.innerText = `${
      dish.servesHowManyPeople > 1
        ? `Serve ${dish.servesHowManyPeople} pessoas`
        : `Serve ${dish.servesHowManyPeople} pessoa`
    }`;
    spanPrice.innerText = `R$ ${dish.value.toFixed(2)}`;
  }

  private openModal(li: HTMLElement, dish: Dish) {
    const divBackgroundModal = document.querySelector(".modal-background") as HTMLElement;
    const h2NameDish = document.querySelector(".modal__name-dish") as HTMLElement;
    const pDishDescription = document.querySelector(
      ".modal__dish-description"
    ) as HTMLParagraphElement;
    const spanServes = document.querySelector(".modal__serves-how-many-people") as HTMLSpanElement;
    const spanPrice = document.querySelector(".modal__price") as HTMLSpanElement;
    const imgDish = document.querySelector(".modal__img") as HTMLImageElement;

    li.addEventListener("click", () => {
      this.addInfos(imgDish, h2NameDish, pDishDescription, spanServes, spanPrice, dish);

      divBackgroundModal.style.display = "block";
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";

      this.addItemInCart(h2NameDish, imgDish, divBackgroundModal);
    });

    this.closeModal(divBackgroundModal);
  }

  private closeModal(divBackgroundModal: HTMLElement) {
    divBackgroundModal.addEventListener("click", (event: Event) => {
      if (
        event.target?.className === "modal-background" ||
        event.target?.className === "ph-bold ph-x"
      ) {
        divBackgroundModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  private addItemInCart(
    h2NameDish: HTMLElement,
    imgDish: HTMLImageElement,
    divBackgroundModal: HTMLElement
  ) {
    const buttonCart = document.querySelector(".modal__button-add-dish") as HTMLButtonElement;
    const buttonIncrement = document.querySelector(
      ".modal__button-counter.increment"
    ) as HTMLButtonElement;
    const buttonDecrement = document.querySelector(
      ".modal__button-counter.decrement"
    ) as HTMLButtonElement;
    const spanNumberOfItems = document.querySelector(".modal__number") as HTMLSpanElement;
    const spanPrice = document.querySelector(".modal__price") as HTMLSpanElement;
    const spanTotal = document.querySelector(".modal__total-price") as HTMLSpanElement;

    const quantityOfOrders = new QuantityOfOrders(
      buttonIncrement,
      buttonDecrement,
      spanNumberOfItems,
      spanPrice,
      spanTotal
    );
    quantityOfOrders.updatesItems();

    buttonCart.addEventListener("click", (event: Event) => {
      event.stopImmediatePropagation();

      const token = localStorage.getItem("token");

      fetch(`http://localhost:3000/user/cart/${token}`, {
        method: "POST",
        body: JSON.stringify({
          nameDish: h2NameDish.textContent,
          image: imgDish.src,
          valueTotal: Number(spanTotal.textContent),
          quantityOfOrder: Number(spanNumberOfItems.textContent),
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      })
        .then((response) => response.json())
        .then((responseDefault: ResponseDefault) => {
          if (responseDefault.statusCode === 200) {
            divBackgroundModal.style.display = "none";
          }
        });
    });
  }
}

const menu = new Menu();
menu.renderAllDishes();
