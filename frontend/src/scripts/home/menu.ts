import { Structure } from "../structure";
import { InputSearch } from "./inputSearch";

export class Menu {
  public readonly ulsMenu: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".menu__list"
  ) as NodeListOf<HTMLElement>;

  public readonly structure: Structure = new Structure();

  public readonly input: InputSearch = new InputSearch();

  public renderAllDishes(): void {
    fetch("http://localhost:3000/alldishs")
      .then((response) => response.json())
      .then((arrayData: Array<Response>) => {
        arrayData.forEach((data: Response) => {
          this.createLiAndAddInTheList(data);
        });
      });
  }

  public createLiAndAddInTheList(data: Response) {
    const li = this.structure.createElement("li", { class: "menu__item" });
    const imgDish = this.structure.createElement("img", {
      class: "menu__img",
      loading: "lazy",
    });
    const divFirstColumn = this.structure.createElement("div", { class: "menu__first-column" });
    const h2NameDish = this.structure.createElement("h2", { class: "menu__name-dish" });
    const pDishDescription = this.structure.createElement("p", {
      class: "menu__dish-description",
    });
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

    this.addInfosInLi(li, imgDish, h2NameDish, pDishDescription, spanServes, spanPrice, data);
  }

  //refactor
  public verifyCategory(li: HTMLElement, category: string) {
    this.ulsMenu.forEach((ul) => {
      if (ul.id === "mais-vendidos" && category.toLowerCase() === "mais vendidos") {
        ul.appendChild(li);
      }

      if (ul.id === "menu-premium" && category.toLowerCase() === "menu premium") {
        ul.appendChild(li);
      }

      if (ul.id === "match-perfeito" && category.toLowerCase() === "match perfeito") {
        ul.appendChild(li);
      }

      if (ul.id === "bebidas" && category.toLowerCase() === "bebidas") {
        ul.appendChild(li);
      }

      this.input.searching(li);
    });
  }

  public addInfosInLi(
    li: HTMLElement,
    imgDish: HTMLElement,
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
    this.verifyCategory(li, data.category);
  }
}

const menu: Menu = new Menu();
menu.renderAllDishes();
