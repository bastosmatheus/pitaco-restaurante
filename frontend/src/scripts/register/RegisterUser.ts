class RegisterUser {
  private inputName: HTMLInputElement = document.querySelector(
    ".register__input.name"
  ) as HTMLInputElement;
  private inputLastname: HTMLInputElement = document.querySelector(
    ".register__input.lastname"
  ) as HTMLInputElement;
  private inputUsername: HTMLInputElement = document.querySelector(
    ".register__input.username"
  ) as HTMLInputElement;
  private inputEmail: HTMLInputElement = document.querySelector(
    ".register__input.email"
  ) as HTMLInputElement;
  private inputPassword: HTMLInputElement = document.querySelector(
    ".register__input.password"
  ) as HTMLInputElement;
  private form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;

  public register() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({
          name: this.inputName.value,
          lastname: this.inputLastname.value,
          username: this.inputUsername.value,
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
          if (data.message === "O usuário foi criado com sucesso") {
            window.location.replace("/login");
          }
        })
        .catch((error) => console.log(error));
    });
  }
}

const registerUser: RegisterUser = new RegisterUser();
registerUser.register();
