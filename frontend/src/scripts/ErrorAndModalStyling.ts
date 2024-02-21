import { z } from "zod";

export class ErrorAndModalStyling {
  constructor(
    protected inputs: NodeListOf<HTMLInputElement>,
    protected spansError: NodeListOf<HTMLSpanElement>
  ) {
    this.inputs = inputs;
    this.spansError = spansError;
  }

  protected addErrorMessageInSpanAndStyling(
    spanError: HTMLSpanElement,
    input: HTMLInputElement | HTMLDivElement,
    messageError: string
  ) {
    spanError.textContent = `${messageError}`;
    input.style.border = "2px solid red";
  }

  protected resetSpanAndInputStyle() {
    this.inputs.forEach((input) => {
      if (input.nextElementSibling === null) {
        const divInput = input.parentElement as HTMLDivElement;
        divInput.style.border = "2px solid transparent";
      }

      input.style.border = "2px solid transparent";
    });

    this.spansError.forEach((span) => {
      span.textContent = "";
    });
  }

  protected errorsInValidation(validation: z.SafeParseError<Record<string, string | number>>) {
    const errors = validation.error.issues;

    this.inputs.forEach((input) => {
      const idInput = input.id;
      let spanError: HTMLSpanElement;

      return errors.forEach((error) => {
        if (error.path[0] === idInput) {
          if (input.nextElementSibling === null) {
            const divInput = input.parentElement as HTMLDivElement;
            spanError = divInput.nextElementSibling as HTMLSpanElement;
            this.addErrorMessageInSpanAndStyling(spanError, divInput, error.message);
          } else {
            spanError = input.nextElementSibling as HTMLSpanElement;
            this.addErrorMessageInSpanAndStyling(spanError, input, error.message);
          }

          input.focus();
        }
      });
    });
  }

  protected confirmationModal(
    pConfirmation: HTMLParagraphElement,
    buttonCancel: HTMLButtonElement,
    buttonConfirm: HTMLButtonElement,
    iconModal: HTMLElement,
    message: string
  ) {
    pConfirmation.textContent = message;
    buttonCancel.style.display = "none";
    buttonConfirm.style.display = "none";
    iconModal.classList.remove("ph-warning");
    iconModal.classList.add("ph-check-fat");
    iconModal.style.color = "#005000";

    const token = localStorage.getItem("token");

    setTimeout(() => {
      window.location.replace(`/admin/menu/${token}`);
    }, 3000);
  }
}
