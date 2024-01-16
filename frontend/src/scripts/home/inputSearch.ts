export class InputSearch {
  public inputSearch: HTMLInputElement = document.querySelector(
    ".search__input"
  ) as HTMLInputElement;

  public searching(li: HTMLElement) {
    this.inputSearch.addEventListener("input", () => {
      const divFirstColumn = li.querySelector(".menu__first-column") as HTMLElement;
      const h2NameDish = divFirstColumn.querySelector(".menu__name-dish") as HTMLElement;
      const textNameDish = h2NameDish.textContent?.toLowerCase();

      if (this.inputSearch.value != "") {
        const valorInput = this.inputSearch.value.toLowerCase();

        if (!textNameDish?.includes(valorInput)) {
          return li.classList.add("hide");
        }
        return li.classList.remove("hide");
      }
    });
  }
}
