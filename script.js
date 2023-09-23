"use strict";
const computer = document.querySelector(".display1");
const mobile = document.querySelector(".display2");
let myMediaQuery = window.matchMedia("(min-width: 915px)");
function widthChangeCallback(myMediaQuery) {
  if (myMediaQuery.matches) {
    mobile.classList.add("display");
    computer.classList.remove("display");
    setTimeout(() => {
      window.location.href = "/Com_agromart_mainPage.html";
    }, 100);
  } else {
    mobile.classList.remove("display");
    computer.classList.add("display");
    setTimeout(() => {
      window.location.href = "/Com_agromart_mainPage.html";
    }, 10000);
  }
}
myMediaQuery.addEventListener("change", widthChangeCallback);
widthChangeCallback(myMediaQuery);
const slider = document.querySelector(".slider");
const images = slider.querySelectorAll("img");

// Get the previous and next buttons
const prevBtn = slider.querySelector(".prev");
const nextBtn = slider.querySelector(".next");

// Set the index of the active image
let activeIndex = 0;

// Set the active class on the first image
images[activeIndex].classList.add("active");
const tick = function () {
  // Remove the active class from the current image
  images[activeIndex].classList.remove("active");
  // Increment the active index by 1
  activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
  // Add the active class to the new image
  images[activeIndex].classList.add("active");
};
setInterval(tick, 3000);
const loading=document.querySelector('.loading');
const btn=document.querySelector('.btn');
const start=document.querySelector('.start');
setTimeout(() => {

  loading.classList.add("display");
  btn.classList.remove("display");
  // window.location.href = "/Mobile/html/startPageM.html";
}, 8000);
start.addEventListener('click',function()
{
  window.location.href = "/Mobile/html/startPageM.html";
})