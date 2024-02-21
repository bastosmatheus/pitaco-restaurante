export class Hamburger {
  public toggleNav(): void {
    const menuHamburger = document.querySelector(".header .ph-list") as HTMLElement;
    const nav = document.querySelector(".header .header__nav") as HTMLElement;
    const ul = document.querySelector(".header .header__list") as HTMLElement;

    menuHamburger.addEventListener("click", () => {
      nav.classList.add("show-nav");
      ul.classList.add("transition-ul");
      document.body.style.overflow = "hidden";
    });

    nav.addEventListener("click", (event: Event) => {
      if (
        event.target?.className === "header__nav show-nav" ||
        event.target?.className === "ph-bold ph-x"
      ) {
        nav.classList.remove("show-nav");
        ul.classList.remove("transition-ul");
        document.body.style.overflow = "auto";
      }
    });
  }
}

const menuHamburger = new Hamburger();
menuHamburger.toggleNav();
