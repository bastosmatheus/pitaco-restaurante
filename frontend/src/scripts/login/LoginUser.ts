class LoginUser {
  private inputEmail: HTMLInputElement = document.querySelector(
    ".login__input.email"
  ) as HTMLInputElement;
  private inputPassword: HTMLInputElement = document.querySelector(
    ".login__input.password"
  ) as HTMLInputElement;
  private form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;

  public login() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.inputEmail.value,
          password: this.inputPassword.value,
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            window.location.replace("/");
          }
        })
        .catch((error) => console.log(error));
    });
  }
}

const loginUser: LoginUser = new LoginUser();
loginUser.login();
