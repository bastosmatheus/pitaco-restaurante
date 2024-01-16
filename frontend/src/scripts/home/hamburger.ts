export class Hamburger {
  public menuHamburger = document.querySelector(".header .ph-list") as HTMLElement;
  public nav = document.querySelector(".header .header__nav") as HTMLElement;
  public ul = document.querySelector(".header .header__list") as HTMLElement;

  public toggleNav(): void {
    this.menuHamburger.addEventListener("click", () => {
      this.nav.classList.add("show-nav");
      this.ul.classList.add("transition-ul");
      document.body.style.overflow = "hidden";
    });

    this.nav.addEventListener("click", (event) => {
      if (
        event.target?.className === "header__nav show-nav" ||
        event.target?.className === "ph-bold ph-x"
      ) {
        this.nav.classList.remove("show-nav");
        this.ul.classList.remove("transition-ul");
        document.body.style.overflow = "auto";
      }
    });
  }
}

const menuHamburger: Hamburger = new Hamburger();
menuHamburger.toggleNav();
