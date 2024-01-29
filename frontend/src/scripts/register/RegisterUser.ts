import { z } from "zod";

class RegisterUser {
  private inputs = document.querySelectorAll(".register__input") as NodeListOf<HTMLInputElement>;
  private spansError = document.querySelectorAll(".register__error") as NodeListOf<HTMLSpanElement>;
  private form = document.querySelector("form") as HTMLFormElement;

  public register() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputName, inputLastname, inputUsername, inputEmail, inputPassword] = this.inputs;

      this.resetSpanAndDivInputStyle();

      const validation = this.inputsValidation(
        inputName,
        inputLastname,
        inputUsername,
        inputEmail,
        inputPassword
      );

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
        fetch("http://localhost:3000/register", {
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
          .then((r) => r.json())
          .then((data: unknown) => {
            if (data.message === "Username já está em uso") {
              const divInput = inputUsername.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = data.message;
              return;
            }

            if (data.message === "Email já está em uso") {
              const divInput = inputEmail.parentElement as HTMLDivElement;
              const spanError = divInput.nextElementSibling as HTMLSpanElement;

              divInput.style.border = "2px solid red";
              spanError.textContent = data.message;
              return;
            }

            window.location.replace("/login");
          })
          .catch((error) => console.log(error));
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

const registerUser: RegisterUser = new RegisterUser();
registerUser.register();
