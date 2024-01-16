import { structure } from "../structure";
import { InputSearch } from "./inputSearch";

export class Menu {
  public static readonly ulMenu: HTMLLIElement = document.querySelector(
    ".menu__list"
  ) as HTMLLIElement;

  public static structure: structure = new structure();

  public static input: InputSearch = new InputSearch();

  public static renderAllDishes(): void {
    fetch("http://localhost:3000/alldishs")
      .then((response) => response.json())
      .then((arrayData: Array<Response>) => {
        arrayData.forEach((data: unknown) => {
          this.createLiAndAddInTheList(data);
        });
      });
  }

  public static createLiAndAddInTheList(data: unknown) {
    const li = this.structure.createElement("li", { class: "menu__item" });
    const imgDish = this.structure.createElement("img", {
      class: "menu__img",
      loading: "lazy",
    });
    const divFirstColumn = this.structure.createElement("div", { class: "menu__first-column" });
    const h2NameDish = this.structure.createElement("h2", { class: "menu__name-dish" });
    const pDishDescription = this.structure.createElement("p", { class: "menu__dish-description" });
    const spanServes = this.structure.createElement("span", {
      class: "menu__serves-how-many-people",
    });
    const spanPrice = this.structure.createElement("span", { class: "menu__price" });

    li.appendChild(divFirstColumn);
    li.appendChild(imgDish);
    divFirstColumn.appendChild(h2NameDish);
    divFirstColumn.appendChild(pDishDescription);
    divFirstColumn.appendChild(spanServes);
    divFirstColumn.appendChild(spanPrice);
    this.ulMenu.appendChild(li);

    this.addInfosInLi(
      li,
      imgDish,
      divFirstColumn,
      h2NameDish,
      pDishDescription,
      spanServes,
      spanPrice,
      data
    );

    this.input.searching(li);
  }

  public static addInfosInLi(
    li: HTMLElement,
    imgDish: HTMLElement,
    divFirstColumn: HTMLElement,
    h2NameDish: HTMLElement,
    pDishDescription: HTMLElement,
    spanServes: HTMLElement,
    spanPrice: HTMLElement,
    data: unknown
  ): void {
    imgDish.setAttribute("src", data.image);
    imgDish.setAttribute("alt", data.nameDish);
    imgDish.setAttribute("title", data.nameDish);
    h2NameDish.innerText = `${data.nameDish}`;
    pDishDescription.innerText = `${data.description}`;
    spanServes.innerText = `${
      data.servesHowManyPeople > 1
        ? `Serve ${data.servesHowManyPeople} pessoas.`
        : `Serve ${data.servesHowManyPeople} pessoa.`
    }`;
    spanPrice.innerText = `R$ ${data.value}`;
  }
}

Menu.renderAllDishes();
