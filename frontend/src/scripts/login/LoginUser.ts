import { z } from "zod";
import { ErrorAndModalStyling } from "../ErrorAndModalStyling";
import { ReponseToken, ResponseDefault } from "../@types/types";

class LoginUser extends ErrorAndModalStyling {
  constructor(
    protected inputs: NodeListOf<HTMLInputElement>,
    protected spansError: NodeListOf<HTMLSpanElement>
  ) {
    super(inputs, spansError);
  }

  public login() {
    const form = document.querySelector("form") as HTMLFormElement;

    form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputEmail, inputPassword] = this.inputs;

      const validation = this.inputsValidation(inputEmail, inputPassword);

      if (validation.success) {
        fetch("http://localhost:3000/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value,
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((responseDefault: ResponseDefault & ReponseToken) => {
            if (responseDefault.message === "Email inválido") {
              const divInput = inputEmail.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = responseDefault.message;
              return inputEmail.focus();
            }

            if (responseDefault.message === "Senha inválida") {
              const divInput = inputPassword.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = responseDefault.message;
              return inputPassword.focus();
            }

            localStorage.setItem("token", responseDefault.token);

            window.location.replace("/");
          });
      } else {
        this.errorsInValidation(validation);
      }
    });
  }

  private inputsValidation(email: HTMLInputElement, password: HTMLInputElement) {
    this.resetSpanAndInputStyle();

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
}

const inputs = document.querySelectorAll(".login__input") as NodeListOf<HTMLInputElement>;
const spansError = document.querySelectorAll(".login__error") as NodeListOf<HTMLSpanElement>;
const loginUser: LoginUser = new LoginUser(inputs, spansError);
loginUser.login();
