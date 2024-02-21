import { z } from "zod";
import { ErrorAndModalStyling } from "../ErrorAndModalStyling";
import { ResponseDish } from "../@types/types";

class AddDish extends ErrorAndModalStyling {
  constructor(
    protected inputs: NodeListOf<HTMLInputElement>,
    protected spansError: NodeListOf<HTMLSpanElement>
  ) {
    super(inputs, spansError);
  }

  public createDish() {
    const form = document.querySelector(".adddish__form") as HTMLFormElement;

    form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const divBackgroundModal = document.querySelector(
        ".adddish__modal-background"
      ) as HTMLDivElement;
      const pConfirmation = document.querySelector(
        ".adddish__modal-confirmation"
      ) as HTMLParagraphElement;
      const buttonCancel = document.querySelector(
        ".adddish__modal-button.cancel"
      ) as HTMLButtonElement;
      const buttonConfirm = document.querySelector(
        ".adddish__modal-button.confirm"
      ) as HTMLButtonElement;
      const iconModal = document.querySelector(".adddish__modal i") as HTMLElement;

      const [
        inputNameDish,
        inputValueDish,
        inputImageDish,
        inputDescriptionDish,
        inputServesHowManyPeople,
        inputCategoryDish,
      ] = this.inputs;

      const validation = this.inputsValidation(
        inputNameDish,
        inputValueDish,
        inputImageDish,
        inputDescriptionDish,
        inputServesHowManyPeople,
        inputCategoryDish
      );

      if (validation.success) {
        divBackgroundModal.style.display = "block";
        pConfirmation.textContent = `Deseja adicionar o prato ${inputNameDish.value} ao cardápio?`;
      } else {
        this.errorsInValidation(validation);
      }

      buttonConfirm.addEventListener("click", () => {
        fetch("http://localhost:3000/dishes", {
          method: "POST",
          body: JSON.stringify({
            nameDish: inputNameDish.value,
            image: inputImageDish.value,
            value: inputValueDish.value,
            servesHowManyPeople: inputServesHowManyPeople.value,
            description: inputDescriptionDish.value,
            category: inputCategoryDish.value,
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((responseDish: ResponseDish) => {
            if (responseDish.statusCode === 409) {
              const spanInputName = inputNameDish.nextElementSibling as HTMLSpanElement;

              divBackgroundModal.style.display = "none";
              inputNameDish.style.border = "2px solid red";
              spanInputName.textContent = responseDish.message;
              inputNameDish.focus();
              return;
            }

            this.confirmationModal(
              pConfirmation,
              buttonCancel,
              buttonConfirm,
              iconModal,
              "Prato criado com sucesso, redirecionando para a página de cardápio...."
            );
          });
      });

      buttonCancel.addEventListener("click", () => {
        divBackgroundModal.style.display = "none";
      });
    });
  }

  private inputsValidation(
    inputNameDish: HTMLInputElement,
    inputValueDish: HTMLInputElement,
    inputImageDish: HTMLInputElement,
    inputDescriptionDish: HTMLInputElement,
    inputServesHowManyPeople: HTMLInputElement,
    inputCategoryDish: HTMLInputElement
  ) {
    this.resetSpanAndInputStyle();

    const inputsSchema = z.object({
      nameDish: z.string().nonempty({ message: "O campo de nome é obrigatório" }),
      valueDish: z
        .number({ invalid_type_error: "O valor deve ser um número" })
        .positive({ message: "O valor deve ser positivo" }),
      imageDish: z
        .string()
        .nonempty({ message: "O campo de imagem é obrigatório" })
        .url({ message: "Digite uma URL válida" }),
      descriptionDish: z.string().nonempty({ message: "O campo de descrição é obrigatório" }),
      servesHowManyPeople: z
        .number({ invalid_type_error: "O valor deve ser um número" })
        .positive({ message: "O valor deve ser positivo" })
        .max(10, { message: "O máximo de pessoas que um prato do Pitaco serve é 10" }),
      categoryDish: z.string().nonempty({ message: "O campo de categoria é obrigatório" }),
    });

    const result = inputsSchema.safeParse({
      nameDish: inputNameDish.value,
      valueDish: Number(inputValueDish.value),
      imageDish: inputImageDish.value,
      descriptionDish: inputDescriptionDish.value,
      servesHowManyPeople: Number(inputServesHowManyPeople.value),
      categoryDish: inputCategoryDish.value,
    });

    return result;
  }
}

const inputs = document.querySelectorAll(".adddish__input") as NodeListOf<HTMLInputElement>;
const spansError = document.querySelectorAll(".adddish__error") as NodeListOf<HTMLSpanElement>;
const editDish = new AddDish(inputs, spansError);
editDish.createDish();
