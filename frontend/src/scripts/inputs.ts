import { RenderModal } from "../scripts/index";
import { z } from "zod";

export class SelectAndValidateInputs extends RenderModal {
  constructor(liList: NodeListOf<HTMLLIElement>) {
    super(liList);
  }

  selectInputs(modalForm: HTMLFormElement, sectionModals: HTMLElement): void {
    modalForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const inputs = modalForm.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;

      const validation = this.validateInputs(inputs);
      const validationErrors = validation.error.issues;

      if (validationErrors.length > 0) {
        validationErrors.forEach((error: {}) => {
          this.setError(error.path, error.message);
        });
      }
    });
  }

  validateInputs(inputs: NodeListOf<HTMLInputElement>) {
    if (inputs.length > 2) {
      const [nameDish, image, value, ingredients, servesHowManyPeople, description] = inputs;

      const dishSchema = z.object({
        nameDish: z.string().min(3, { message: "O prato deve conter no minimo 3 caracteres." }),
        imageDish: z.string().url({ message: "Digite um URL válido." }),
        valueDish: z
          .number()
          .nonnegative({ message: "Insira um valor maior que 0R$." })
          .min(0.5, { message: "Insira um valor válido." }),
        ingredientsDish: z
          .array(z.string())
          .min(1, { message: "Insira os ingredientes usados na receita." }),
        servesHowManyPeople: z
          .number()
          .min(1, { message: "O prato deve servir ao menos uma pessoa." }),
        descriptionDish: z.string().min(1, { message: "Insira uma descrição." }),
      });

      const result = dishSchema.safeParse({
        nameDish: nameDish.value,
        imageDish: image.value,
        valueDish: parseInt(value.value),
        ingredientsDish: [...ingredients.value],
        servesHowManyPeople: parseInt(servesHowManyPeople.value),
        descriptionDish: description.value,
      });

      return result;
    }

    const [id] = inputs;

    const idSchema = z.object({
      idDish: z
        .string()
        .min(24, { message: "O ID deve conter pelo menos 24 caracteres." })
        .max(24, { message: "O ID não pode ter mais de 24 caracteres." }),
    });

    const result = idSchema.safeParse({
      idDish: id.value,
    });

    return result;
  }

  setError(idInput: string, messageError: string) {
    const input = document.querySelector(`#${idInput}`) as HTMLInputElement;
    const error = input.nextElementSibling as HTMLSpanElement;
    error.innerText = `${messageError}`;
    input.style.border = "2px solid red";
  }
}
