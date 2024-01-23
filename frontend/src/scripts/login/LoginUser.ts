import { z } from "zod";

class LoginUser {
  private inputs = document.querySelectorAll(".login__input") as NodeListOf<HTMLInputElement>;
  private spansError = document.querySelectorAll(".login__error") as NodeListOf<HTMLSpanElement>;
  private form = document.querySelector("form") as HTMLFormElement;

  public login() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputEmail, inputPassword] = this.inputs;

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
        .then((data) => {
          this.resetSpanAndDivInputStyle();

          const validation = this.inputsValidation(inputEmail, inputPassword, data);

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
            window.location.replace("/");
          }
        })
        .catch((error) => console.log(error));
    });
  }

  private inputsValidation(email: HTMLInputElement, password: HTMLInputElement, data: unknown) {
    const userSchema = z.object({
      email: z
        .string()
        .email({ message: "Informe um email válido" })
        .superRefine((_, ctx) => {
          if (data.message === "Email inválido") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Email inválido",
            });
          }
        }),
      password: z
        .string()
        .nonempty({ message: "Preencha o campo de senha" })
        .superRefine((_, ctx) => {
          if (data.message === "Senha inválida") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Senha inválida",
            });
          }
        }),
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
