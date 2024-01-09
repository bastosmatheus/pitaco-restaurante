const buttonRegister = document.querySelector("input[type='submit']") as HTMLButtonElement;

buttonRegister.addEventListener("click", (event: Event) => {
  event.preventDefault();

  console.log("alo");
});
