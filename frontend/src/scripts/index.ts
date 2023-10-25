import { z } from "zod";

class RenderModal {
  constructor(private liList: NodeListOf<HTMLLIElement>) {}

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

    this.selectInputs(modalForm, sectionModals);
  }

  selectInputs(modalForm: HTMLFormElement, sectionModals: HTMLElement): void {
    const inputSubmit = modalForm.querySelector(`input[type="submit"]`) as HTMLInputElement;

    inputSubmit.addEventListener("click", (event: Event) => {
      event.preventDefault();

      const inputs = modalForm.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;
      if (this.validateInputs(inputs)) {
        modalForm.style.display = "none";
        sectionModals.style.display = "none";
      }
    });
  }

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
renderModal.isLi();
