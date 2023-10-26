<<<<<<< HEAD
// import { SelectAndValidateInputs } from "./inputs";

class RenderModal {
  constructor(protected liList: NodeListOf<HTMLLIElement>) {}
=======
import { z } from "zod";

class RenderModal {
  constructor(private liList: NodeListOf<HTMLLIElement>) {}
>>>>>>> 0ff93cce48af1e29d6f0e5e2cff579ce3dfdca65

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

<<<<<<< HEAD
    const selectAndValidateInputs = new SelectAndValidateInputs(this.liList);

    selectAndValidateInputs.selectInputs(modalForm, sectionModals);
  }
}

import { z } from "zod";

class SelectAndValidateInputs extends RenderModal {
  constructor(liList: NodeListOf<HTMLLIElement>) {
    super(liList);
=======
    this.selectInputs(modalForm, sectionModals);
>>>>>>> 0ff93cce48af1e29d6f0e5e2cff579ce3dfdca65
  }

  selectInputs(modalForm: HTMLFormElement, sectionModals: HTMLElement): void {
    const inputSubmit = modalForm.querySelector(`input[type="submit"]`) as HTMLInputElement;

    inputSubmit.addEventListener("click", (event: Event) => {
      event.preventDefault();

      const inputs = modalForm.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;
<<<<<<< HEAD

      const validation = this.validateInputs(inputs);

      if (validation.success) {
        console.log(validation.data);
=======
      if (this.validateInputs(inputs)) {
        modalForm.style.display = "none";
        sectionModals.style.display = "none";
>>>>>>> 0ff93cce48af1e29d6f0e5e2cff579ce3dfdca65
      }
    });
  }

<<<<<<< HEAD
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
=======
  validateInputs(inputs: NodeListOf<HTMLInputElement>): boolean {
    const dishSchema = z.object({
      nameDish: z.string().min(3, { message: "O prato deve conter no minimo 3 caracteres." }),
      image: z.string().url({ message: "Digite um URL válido." }),
      value: z.number(),
      ingredients: z.array(z.string()),
      servesHowManyPeople: z
        .number()
        .min(1, { message: "O prato deve servir ao menos uma pessoa." }),
      description: z.string(),
    });

    const result = dishSchema.safeParse({
      nameDish: inputs[0].value,
      image: inputs[1].value,
      value: parseInt(inputs[2].value),
      ingredients: [...inputs[3].value],
      servesHowManyPeople: parseInt(inputs[4].value),
      description: inputs[5].value,
    });

    return result.success;
  }
}

const divs = document.querySelectorAll(`.main-content__item`) as NodeListOf<HTMLLIElement>;
const renderModal = new RenderModal(divs);
>>>>>>> 0ff93cce48af1e29d6f0e5e2cff579ce3dfdca65
renderModal.isLi();
