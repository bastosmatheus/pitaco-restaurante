class Login {
  public backPageLogin() {
    const buttonlogin = document.querySelector(".header__link.login") as HTMLAnchorElement;

    buttonlogin.addEventListener("click", () => {
      localStorage.clear();
    });
  }
}

const login = new Login();
login.backPageLogin();
