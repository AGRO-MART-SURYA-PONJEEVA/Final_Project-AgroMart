"use strict";
//api connection//

const firebaseConfig = {
  apiKey: "AIzaSyCEt3onEnuy00kKgoErbbVZKKajGzR2nTw",
  authDomain: "agro-mart-2f9dd.firebaseapp.com",
  databaseURL: "https://agro-mart-2f9dd-default-rtdb.firebaseio.com",
  projectId: "agro-mart-2f9dd",
  storageBucket: "agro-mart-2f9dd.appspot.com",
  messagingSenderId: "986382838818",
  appId: "1:986382838818:web:dff4d0cb805b5cc39cae7b",
};
firebase.initializeApp(firebaseConfig);
var formdb = firebase.database().ref("USER DATABASE");
/////////////////
let searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
};
let shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
};

let loginForm = document.querySelector(".login-form");
document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
};

window.onscroll = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
};

var swiper = new Swiper(".products-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});
//////////////////////////

let alreadyUser = [];
formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let ids = element.val().PermanentedId;
    ids = ids.toLowerCase();
    const user = {
      fullName: element.val().FullName,
      id: ids,
      roll: element.val().Roll,
      email: element.val().Email,
    };
    alreadyUser.push(user);
  });
  console.log(alreadyUser);
});
////
const login = document.querySelector(".butt");
const id = document.querySelector(".id");

const logIn = document.querySelector(".loginus");
const userName = document.querySelector(".name");
const agroMartId = document.querySelector(".Aid");
const userRoll = document.querySelector(".roll");
const email = document.querySelector(".email");
const send = document.querySelector(".but_send");
let a = 0;
login.addEventListener("click", function (e) {
  e.preventDefault();
  if (a === 0) {
    let userId = id.value;
    userId = userId.toLowerCase();
    const find1 = alreadyUser.find((mov) => mov?.id === userId);
    if (find1 !== undefined) {
      logIn.textContent = "login Us";
      id.classList.add("display");
      userName.textContent = `${find1.fullName}`;
      userName.classList.remove("display");
      agroMartId.textContent = `${find1.id}`;
      userRoll.textContent = `${find1.roll}`;
      login.textContent = "login out";
      a = 1;
      localStorage.setItem("send", find1.fullName);
    } else {
      alert("Plz check your Agro Mart Id");
    }
  } else {
    location.reload(true);
  }
});
agroMartId.addEventListener("click", function (e) {
  e.preventDefault();
  logIn.textContent = "Recovery";
  send.classList.remove("display");
  login.classList.add("display");
  id.classList.add("display");
  email.classList.remove("display");
  agroMartId.textContent = "";
});
send.addEventListener("click", function (e) {
  e.preventDefault();
  const emailget = email.value;
  const find1 = alreadyUser.find((mov) => mov?.email === emailget);
  if (find1 === undefined) {
    alert(
      "Your Email Id does not Exit :( \n Try again (or) Create New account"
    );
  } else {
    alert(`Your Agro Mart ID: ${find1.id}`);
    location.reload(true);
  }
});
// RAJASURYA-2002-C
