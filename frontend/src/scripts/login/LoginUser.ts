import { z } from "zod";

class LoginUser {
  private inputs = document.querySelectorAll(".login__input") as NodeListOf<HTMLInputElement>;
  private spansError = document.querySelectorAll(".login__error") as NodeListOf<HTMLSpanElement>;
  private form = document.querySelector("form") as HTMLFormElement;

  public login() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputEmail, inputPassword] = this.inputs;

      this.resetSpanAndDivInputStyle();

      const validation = this.inputsValidation(inputEmail, inputPassword);

      if (!validation.success) {
        const errors = validation.error.issues;

        this.inputs.forEach((input) => {
          const idInput = input.id;
          const divInput = input.parentElement as HTMLDivElement;
          const spanError = divInput.nextElementSibling as HTMLSpanElement;

          errors.forEach((error) => {
            if (error.path[0] === idInput) {
              this.addErrorMessageInSpanAndStyling(spanError, divInput, error.message);
            }
          });
        });
      }

      if (validation.success) {
        fetch("http://localhost:3000/login", {
          method: "POST",
          body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value,
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        })
          .then((r) => r.json())
          .then((data: unknown) => {
            if (data.message === "Email inválido") {
              const divInput = inputEmail.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = data.message;
              return;
            }

            if (data.message === "Senha inválida") {
              const divInput = inputPassword.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = data.message;
              return;
            }

            localStorage.setItem("token", data.token);

            const token = localStorage.getItem("token") || "";

            fetch("http://localhost:8000/admin/dashboard", {
              headers: { authorization: token },
            });
          })
          .catch((error) => console.log(error));
      }
    });
  }

  private inputsValidation(email: HTMLInputElement, password: HTMLInputElement) {
    const userSchema = z.object({
      email: z.string().email({ message: "Informe um email válido" }),
      password: z.string().nonempty({ message: "Preencha o campo de senha" }),
    });

    const result = userSchema.safeParse({
      email: email.value,
      password: password.value,
    });

    return result;
  }

  private addErrorMessageInSpanAndStyling(
    spanError: HTMLSpanElement,
    divInput: HTMLDivElement,
    messageError: string
  ) {
    spanError.textContent = `${messageError}`;
    divInput.style.border = "2px solid red";
  }

  private resetSpanAndDivInputStyle() {
    this.inputs.forEach((input) => {
      const divInput = input.parentElement as HTMLDivElement;
      divInput.style.border = "2px solid transparent";
    });

    this.spansError.forEach((span) => {
      span.textContent = "";
    });
  }
}

const loginUser: LoginUser = new LoginUser();
loginUser.login();
