// import { SelectAndValidateInputs } from "./inputs";

class RenderModal {
  constructor(protected liList: NodeListOf<HTMLLIElement>) {}

  isLi(): void {
    this.liList.forEach((li) => {
      if (!li.classList.contains(`main-content__item`)) {
        return;
      }

      li.addEventListener(`click`, () => {
        const action = li.classList[1];
        this.openModal(action);
      });
    });
  }

  openModal(action: string): void {
    const sectionModals = document.querySelector(`.main-content__modals`) as HTMLElement;
    const modalForm = document.querySelector(
      `.main-content__modal.${action} form`
    ) as HTMLFormElement;
    sectionModals.style.display = `block`;
    modalForm.style.display = `block`;

    const selectAndValidateInputs = new SelectAndValidateInputs(this.liList);

    selectAndValidateInputs.selectInputs(modalForm, sectionModals);
  }
}

import { z } from "zod";

class SelectAndValidateInputs extends RenderModal {
  constructor(liList: NodeListOf<HTMLLIElement>) {
    super(liList);
  }

  selectInputs(modalForm: HTMLFormElement, sectionModals: HTMLElement): void {
    const inputSubmit = modalForm.querySelector(`input[type="submit"]`) as HTMLInputElement;

    inputSubmit.addEventListener("click", (event: Event) => {
      event.preventDefault();

      const inputs = modalForm.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;

      const validation = this.validateInputs(inputs);

      if (validation.success) {
        console.log(validation.data);
      }
    });
  }

  validateInputs(inputs: NodeListOf<HTMLInputElement>) {
    if (inputs.length > 2) {
      const [nameDish, image, value, ingredients, servesHowManyPeople, description] = inputs;

      const dishSchema = z.object({
        nameDish: z.string().min(3, { message: "O prato deve conter no minimo 3 caracteres." }),
        image: z.string().url({ message: "Digite um URL válido." }),
        value: z.number().min(0.5, { message: "Insira um valor válido." }),
        ingredients: z
          .array(z.string())
          .min(1, { message: "Insira os ingredientes usados na receita." }),
        servesHowManyPeople: z
          .number()
          .min(1, { message: "O prato deve servir ao menos uma pessoa." }),
        description: z.string().min(1, { message: "Insira uma descrição." }),
      });

      const result = dishSchema.safeParse({
        nameDish: nameDish.value,
        image: image.value,
        value: parseInt(value.value),
        ingredients: [...ingredients.value],
        servesHowManyPeople: parseInt(servesHowManyPeople.value),
        description: description.value,
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

    console.log(result);

    return result;
  }
}

const lis = document.querySelectorAll(`.main-content__item`) as NodeListOf<HTMLLIElement>;
const renderModal = new RenderModal(lis);
renderModal.isLi();
