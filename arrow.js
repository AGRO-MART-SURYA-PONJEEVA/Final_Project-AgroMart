"use strict";

const shop=document.querySelector(".btnn");
const shop1=document.querySelector(".shop1");
const upload=document.querySelector(".upload");
let myMediaQuery = window.matchMedia("(min-width: 915px)");
let myMediaQuery1 = window.matchMedia("(min-width: 915px)");
function widthChangeCallback(myMediaQuery) {
    if (myMediaQuery.matches) {
      setTimeout(() => {
        window.location.href = "/product_main_page/index.html";
      }, 100);
    } else {
      setTimeout(() => {
        window.location.href = "/product card popup/index.html";
      }, 100);
    }
  }
function widthChangeCallback1(myMediaQuery) {
    if (myMediaQuery.matches) {
      setTimeout(() => {
        window.location.href = "/farmer-upload/index.html";
      }, 100);
    } else {
      setTimeout(() => {
        window.location.href = "/farmer-upload/index2.html";
      }, 100);
    }
  }

shop.addEventListener("click",function(e)
{
    e.preventDefault();
    myMediaQuery.addEventListener("change", widthChangeCallback);
    widthChangeCallback(myMediaQuery);
})
shop1.addEventListener("click",function(e)
{
    e.preventDefault();
    // alert("jjjj")
    myMediaQuery.addEventListener("change", widthChangeCallback);
    widthChangeCallback(myMediaQuery);
});
upload.addEventListener("click",function(e)
{
  e.preventDefault();
  myMediaQuery1.addEventListener("change", widthChangeCallback);
  widthChangeCallback1(myMediaQuery1);
})