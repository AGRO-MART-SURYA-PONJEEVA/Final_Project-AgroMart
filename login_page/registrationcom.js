const form = document.querySelector("form"),
        nextBtn = form.querySelector(".nextBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");


nextBtn.addEventListener("click", ()=> {
    form.classList.add('secActive');
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));
const phoneInputField = document.querySelector(".mobile");
const phoneInputField1 = document.querySelector(".mobile1");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["in"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
const phoneInput1 = window.intlTelInput(phoneInputField1, {
  preferredCountries: ["in"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});