import { z } from "zod";
import { ErrorAndModalStyling } from "../ErrorAndModalStyling";
import { ResponseDefault } from "../@types/types";

class RegisterUser extends ErrorAndModalStyling {
  private form = document.querySelector("form") as HTMLFormElement;

  constructor(inputs: NodeListOf<HTMLInputElement>, spansError: NodeListOf<HTMLSpanElement>) {
    super(inputs, spansError);
  }

  public register() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputName, inputLastname, inputUsername, inputEmail, inputPassword] = this.inputs;

      const validation = this.inputsValidation(
        inputName,
        inputLastname,
        inputUsername,
        inputEmail,
        inputPassword
      );

      if (validation.success) {
        fetch("http://localhost:3000/user/register", {
          method: "POST",
          body: JSON.stringify({
            name: inputName.value,
            lastname: inputLastname.value,
            username: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((responseDefault: ResponseDefault) => {
            if (responseDefault.message === "Esse nome de usuário já existe") {
              const divInput = inputUsername.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = responseDefault.message;
              return inputUsername.focus();
            }

            if (responseDefault.message === "Esse email já foi cadastrado") {
              const divInput = inputEmail.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = responseDefault.message;
              return inputEmail.focus();
            }

            window.location.replace("/login");
          });
      } else {
        this.errorsInValidation(validation);
      }
    });
  }

  private inputsValidation(
    name: HTMLInputElement,
    lastname: HTMLInputElement,
    username: HTMLInputElement,
    email: HTMLInputElement,
    password: HTMLInputElement
  ) {
    this.resetSpanAndInputStyle();

    const userSchema = z.object({
      name: z.string().min(3, { message: "O nome deve conter pelo menos 3 caracteres" }),
      lastname: z.string().min(3, { message: "O sobrenome deve conter pelo menos 3 caracteres" }),
      username: z
        .string()
        .min(3, { message: "O nome de usuário deve conter pelo menos 3 caracteres" }),
      email: z.string().email({ message: "Informe um email válido" }),
      password: z.string().min(6, { message: "O número minimo de caracteres para uma senha é 6" }),
    });

    const result = userSchema.safeParse({
      name: name.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });

    return result;
  }
}

const inputs = document.querySelectorAll(".register__input") as NodeListOf<HTMLInputElement>;
const spansError = document.querySelectorAll(".register__error") as NodeListOf<HTMLSpanElement>;
const registerUser: RegisterUser = new RegisterUser(inputs, spansError);
registerUser.register();
