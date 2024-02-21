import { z } from "zod";
import { Dish, ResponseDish } from "../@types/types";
import { ErrorAndModalStyling } from "../ErrorAndModalStyling";

class EditDish extends ErrorAndModalStyling {
  private form = document.querySelector(".editdish__form") as HTMLFormElement;
  private listener = (event: Event) => {
    event.preventDefault();

    const [
      inputNameDish,
      inputValueDish,
      inputImageDish,
      inputDescriptionDish,
      inputServesHowManyPeople,
      inputCategoryDish,
    ] = this.inputs;

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
          if (responseDish.statusCode === 404) {
            const spanError = inputNameDish.nextElementSibling as HTMLSpanElement;
            inputNameDish.style.border = "2px solid red";
            spanError.textContent = responseDish.message;
            return inputNameDish.focus();
          }

          this.fillInputs(
            inputNameDish,
            inputValueDish,
            inputImageDish,
            inputDescriptionDish,
            inputServesHowManyPeople,
            inputCategoryDish,
            responseDish.dish
          );
        });
    } else {
      this.errorsInValidation(validation);
    }
  };

  constructor(
    protected inputs: NodeListOf<HTMLInputElement>,
    protected spansError: NodeListOf<HTMLSpanElement>
  ) {
    super(inputs, spansError);
  }

  public searchDish() {
    this.form.addEventListener("submit", this.listener);
  }

  private updateDish(
    inputNameDish: HTMLInputElement,
    inputValueDish: HTMLInputElement,
    inputImageDish: HTMLInputElement,
    inputDescriptionDish: HTMLInputElement,
    inputServesHowManyPeople: HTMLInputElement,
    inputCategoryDish: HTMLInputElement,
    dish: Dish
  ) {
    const divBackgroundModal = document.querySelector(
      ".editdish__modal-background"
    ) as HTMLDivElement;
    const pConfirmation = document.querySelector(
      ".editdish__modal-confirmation"
    ) as HTMLParagraphElement;
    const buttonCancel = document.querySelector(
      ".editdish__modal-button.cancel"
    ) as HTMLButtonElement;
    const buttonConfirm = document.querySelector(
      ".editdish__modal-button.confirm"
    ) as HTMLButtonElement;
    const iconModal = document.querySelector(".editdish__modal i") as HTMLElement;

    this.form.removeEventListener("submit", this.listener);

    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const validation = this.inputsValidation(
        inputNameDish,
        inputValueDish,
        inputImageDish,
        inputDescriptionDish,
        inputServesHowManyPeople,
        inputCategoryDish
      );

      if (validation.success) {
        pConfirmation.textContent = `Deseja alterar o prato ${dish.nameDish}?`;
        divBackgroundModal.style.display = "block";
      } else {
        this.errorsInValidation(validation);
      }
    });

    buttonConfirm.addEventListener("click", () => {
      const id = dish._id;

      fetch(`http://localhost:3000/dishes/${id}`, {
        method: "PUT",
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
      });

      this.confirmationModal(
        pConfirmation,
        buttonCancel,
        buttonConfirm,
        iconModal,
        "Prato atualizado com sucesso, redirecionando para a página de cardápio...."
      );
    });

    buttonCancel.addEventListener("click", () => {
      divBackgroundModal.style.display = "none";
    });
  }

  private inputsValidation(
    inputNameDish: HTMLInputElement,
    inputValueDish?: HTMLInputElement,
    inputImageDish?: HTMLInputElement,
    inputDescriptionDish?: HTMLInputElement,
    inputServesHowManyPeople?: HTMLInputElement,
    inputCategoryDish?: HTMLInputElement
  ) {
    this.resetSpanAndInputStyle();

    if (
      inputValueDish !== undefined &&
      inputImageDish !== undefined &&
      inputDescriptionDish !== undefined &&
      inputServesHowManyPeople !== undefined &&
      inputCategoryDish !== undefined
    ) {
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

    const inputSchema = z.object({
      nameDish: z.string().nonempty({ message: "O campo do nome do prato é obrigatório" }),
    });

    const result = inputSchema.safeParse({
      nameDish: inputNameDish.value,
    });

    return result;
  }

  private fillInputs(
    inputNameDish: HTMLInputElement,
    inputValueDish: HTMLInputElement,
    inputImageDish: HTMLInputElement,
    inputDescriptionDish: HTMLInputElement,
    inputServesHowManyPeople: HTMLInputElement,
    inputCategoryDish: HTMLInputElement,
    dish: Dish
  ) {
    const divInputs = document.querySelector(".editdish__box-inputs") as HTMLDivElement;
    divInputs.style.display = "flex";

    inputValueDish.value = dish.value.toString();
    inputImageDish.value = dish.image;
    inputDescriptionDish.value = dish.description;
    inputServesHowManyPeople.value = dish.servesHowManyPeople.toString();
    inputCategoryDish.value = dish.category;

    this.updateDish(
      inputNameDish,
      inputValueDish,
      inputImageDish,
      inputDescriptionDish,
      inputServesHowManyPeople,
      inputCategoryDish,
      dish
    );
  }
}

const inputs = document.querySelectorAll(".editdish__input") as NodeListOf<HTMLInputElement>;
const spansError = document.querySelectorAll(".editdish__error") as NodeListOf<HTMLSpanElement>;
const editDish = new EditDish(inputs, spansError);
editDish.searchDish();
