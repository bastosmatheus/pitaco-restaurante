class Exit {
  public backPageLogin() {
    const buttonExit = document.querySelector(".header__link.exit") as HTMLAnchorElement;
    buttonExit.addEventListener("click", () => {
      localStorage.clear();
    });
  }
}

const exit = new Exit();
exit.backPageLogin();
