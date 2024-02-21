export class InputSearch {
  public searching(li: HTMLElement) {
    const inputSearch = document.querySelector(".search__input") as HTMLInputElement;

    inputSearch.addEventListener("input", () => {
      const divCategory = li.parentElement?.parentElement as HTMLElement;
      const divFirstColumn = li.querySelector(".menu__first-column") as HTMLElement;
      const h2NameDish = divFirstColumn.querySelector(".menu__name-dish") as HTMLHeadingElement;
      const textNameDish = h2NameDish.textContent?.toLowerCase();

      if (inputSearch.value !== "") {
        const allLis = divCategory.querySelectorAll("li") as NodeListOf<HTMLLIElement>;
        const allLisHide = divCategory.querySelectorAll("li.hide") as NodeListOf<HTMLLIElement>;

        if (allLis.length === allLisHide.length) {
          divCategory.classList.add("hide");
        } else {
          divCategory.classList.remove("hide");
        }

        const inputValue = inputSearch.value.toLowerCase();

        if (!textNameDish?.includes(inputValue)) {
          return li.classList.add("hide");
        }

        return li.classList.remove("hide");
      }

      if (inputSearch.value === "") {
        divCategory.classList.remove("hide");
        return li.classList.remove("hide");
      }
    });
  }
}
