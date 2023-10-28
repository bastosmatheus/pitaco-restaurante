import { SelectAndValidateInputs } from "../scripts/inputs";

export class RenderModal {
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

const lis = document.querySelectorAll(`.main-content__item`) as NodeListOf<HTMLLIElement>;
const renderModal = new RenderModal(lis);
renderModal.isLi();
