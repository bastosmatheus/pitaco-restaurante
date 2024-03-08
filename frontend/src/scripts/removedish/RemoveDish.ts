import { z } from "zod";
import { ErrorAndModalStyling } from "../ErrorAndModalStyling";
import { Dish, ResponseDish } from "../@types/types";

class RemoveDish extends ErrorAndModalStyling {
  private form = document.querySelector(".removedish__form") as HTMLFormElement;

  constructor(inputs: NodeListOf<HTMLInputElement>, spansError: NodeListOf<HTMLSpanElement>) {
    super(inputs, spansError);
  }

  public searchDish() {
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const [inputNameDish] = this.inputs;

      const validation = this.inputsValidation(inputNameDish);

      if (validation.success) {
        fetch("http://localhost:3000/dishes/dishexists", {
          method: "POST",
          body: JSON.stringify({
            nameDish: inputNameDish.value,
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((responseDish: ResponseDish) => {
            if (responseDish.message === "Esse prato não existe no cardápio") {
              const spanInputName = inputNameDish.nextElementSibling as HTMLSpanElement;

              spanInputName.textContent = responseDish.message;
              inputNameDish.style.border = "2px solid red";
              return inputNameDish.focus();
            }

            this.removeDish(inputNameDish, responseDish.dish);
          });
      } else {
        this.errorsInValidation(validation);
      }
    });
  }

  private removeDish(inputNameDish: HTMLInputElement, dish: Dish) {
    const divBackgroundModal = document.querySelector(
      ".removedish__modal-background"
    ) as HTMLDivElement;
    const pConfirmation = document.querySelector(
      ".removedish__modal-confirmation"
    ) as HTMLParagraphElement;
    const buttonCancel = document.querySelector(
      ".removedish__modal-button.cancel"
    ) as HTMLButtonElement;
    const buttonConfirm = document.querySelector(
      ".removedish__modal-button.confirm"
    ) as HTMLButtonElement;
    const iconModal = document.querySelector(".removedish__modal i") as HTMLElement;

    divBackgroundModal.style.display = "block";
    pConfirmation.textContent = `Deseja remover o prato ${inputNameDish.value} do cardápio?`;

    buttonConfirm.addEventListener("click", () => {
      const id = dish._id;

      fetch(`http://localhost:3000/dishes/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "apllication/json; charset=utf-8",
        },
      });

      this.confirmationModal(
        pConfirmation,
        buttonCancel,
        buttonConfirm,
        iconModal,
        "Prato removido do cardápio, redirecionando para a página de cardápio...."
      );
    });

    buttonCancel.addEventListener("click", () => {
      divBackgroundModal.style.display = "none";
    });
  }

  private inputsValidation(inputNameDish: HTMLInputElement) {
    this.resetSpanAndInputStyle();

    const inputsSchema = z.object({
      nameDish: z.string().nonempty({ message: "O campo de nome do prato é obrigatório" }),
    });

    const result = inputsSchema.safeParse({
      nameDish: inputNameDish.value,
    });

    return result;
  }
}

const inputs = document.querySelectorAll(".removedish__input") as NodeListOf<HTMLInputElement>;
const spansError = document.querySelectorAll(".removedish__error") as NodeListOf<HTMLSpanElement>;
const editDish = new RemoveDish(inputs, spansError);
editDish.searchDish();
