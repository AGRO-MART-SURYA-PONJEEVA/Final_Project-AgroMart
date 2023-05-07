"use strict";

const com = document.querySelectorAll(".com");
const mob = document.querySelectorAll(".mob");

let myMediaQuery = window.matchMedia("(min-width: 915px)");
function widthChangeCallback(myMediaQuery) {
  if (myMediaQuery.matches) {
    com.forEach((mov) => {
      mov.classList.remove("display");
    });
    mob.forEach((mov) => {
      mov.classList.add("display");
    });
  } else {
    mob.forEach((mov) => {
      mov.classList.remove("display");
    });
    com.forEach((mov) => {
      mov.classList.add("display");
    });
  }
}
myMediaQuery.addEventListener("change", widthChangeCallback);
widthChangeCallback(myMediaQuery);
