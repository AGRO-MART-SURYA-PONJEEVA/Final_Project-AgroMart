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
var orderDetailsDatabase = firebase.database().ref("Global_order_details");
var deliveryDetailsDatabase = firebase
  .database()
  .ref("Global_delivery_details");
var qtyValueUpdate = firebase.database().ref("Global_Product_Details");
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
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",

      autoDisplay: "true",

      includedLanguages: "ta,ml,te,kn,hi",

      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    },
    "google_translate_element"
  );
}
//////////////////////////
//global declaration//
let alreadyUser = [];
let userCartDetails = [];
let currentLoginCart = [];
let key = [];
let updateKeyValue = [];
let qtyvalue = [];
let a = 0;
let n;
let userId = "";
let currentLogin = "";
let currentUserName = "";
let adress = [];
var database = firebase.database();
//class//
const login = document.querySelector(".butt");
const id = document.querySelector(".id");
const logIn = document.querySelector(".loginus");
const userName = document.querySelector(".name");
const agroMartId = document.querySelector(".Aid");
const userRoll = document.querySelector(".roll");
const email = document.querySelector(".email");
const send = document.querySelector(".but_send");
const row = document.querySelector(".scrol");
const priceUpdate = document.querySelector(".price_update");
//localStroage//
let funa1 = localStorage.getItem("send1");
let user = localStorage.getItem("send");
let logOut = localStorage.getItem("send2");
//getting value from firebase//

//user details in firebase
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
  userLoginAuto();
});

//cart details_firebase//
orderDetailsDatabase.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let customberDetails = element.val().CustomberAddress;
    customberDetails = customberDetails.split("-");
    console.log(customberDetails);
    const user = {
      cusName: customberDetails[0],
      product: customberDetails[5],
      price: customberDetails[7],
      qty: customberDetails[6],
      key: element.key,
      address: customberDetails,
      updateKey: customberDetails[10],
      liveQty: customberDetails[11],
    };
    userCartDetails.push(user);
  });
  // console.log(userCartDetails);
  userCartDetails.forEach((mov) => {
    // console.log(mov);
    if (mov.cusName === user) {
      adress.push(mov.address);
    }
  });
});

//take current user//

//function//

//User Auto Login localstroage
const userLoginAuto = function () {
  if (funa1 !== "" && logOut == 0) {
    const find1 = alreadyUser.find((mov) => mov?.id === funa1);
    logIn.textContent = "login Us";
    id.classList.add("display");
    userName.textContent = `${find1.fullName}`;
    userName.classList.remove("display");
    agroMartId.textContent = `${find1.id}`;
    userRoll.textContent = `${find1.roll}`;
    login.textContent = "login out";
    a = 1;
    currentLogin = find1.fullName;
    updatecart();
  }
};
//autoUpadate cart localstroage
const updatecart = function () {
  setTimeout(() => {
    displayCart();
  }, 200);
};
//get current user all order details//
let total = 0;
const displayCart = function () {
  userCartDetails.forEach((mov) => {
    if (mov.cusName === currentLogin) {
      currentLoginCart.push(mov);
      key.push(mov.key);
      updateKeyValue.push(mov.updateKey);
      qtyvalue.push(mov.qty);
    }
  });

  //condition//
  if (currentLoginCart.length !== 0) {
    row.innerHTML = "";
  }

  //cart details display
  currentLoginCart.forEach((mov, i) => {
    total = total + Number(mov.price);
    const html = `
    <div class="box" data-tra="${i}">
    <i class="fa fa-trash"></i>
    <img src="/image/farm.png" />
    <div class="content">
    <h3>${mov.product}</h3>
    <span class="price">₹${mov.price}/</span>
    <span class="Quanyity">Qty : ${mov.qty}</span>
  </div>
</div>     
    `;
    row.insertAdjacentHTML("afterbegin", html);
  });
  priceUpdate.textContent = total;
};

//cart delete
const cartDelete = function (n) {
  if (n !== "hi") {
    const userId = key[n];
    orderDetailsDatabase
      .child(userId)
      .remove()
      .then(() => {
        // console.log("User deleted successfully");
        alert(
          "We're sorry to hear that you removed a product from your cart. If you encountered any issues while shopping, please let us know so we can work to improve your experience. We strive to provide the best possible service and appreciate your feedback. If there's anything we can do to assist you in finding the right product, don't hesitate to reach out to our customer support team."
        );
        location.reload(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
};
//addEventListener
//login button
login.addEventListener("click", function (e) {
  e.preventDefault();
  if (a === 0) {
    userId = id.value;
    const userIdLogin = userId.toLowerCase();
    const find1 = alreadyUser.find((mov) => mov?.id === userIdLogin);
    if (find1 !== undefined) {
      logIn.textContent = "login Us";
      id.classList.add("display");
      userName.textContent = `${find1.fullName}`;
      userName.classList.remove("display");
      agroMartId.textContent = `${find1.id}`;
      userRoll.textContent = `${find1.roll}`;
      login.textContent = "login out";
      a = 1;
      currentLogin = find1.fullName;
      localStorage.setItem("send", find1.fullName);
      localStorage.setItem("send1", userIdLogin);
      localStorage.setItem("send2", 0);
      displayCart();
      location.reload(true);
    } else {
      alert("Plz check your Agro Mart Id");
    }
  } else {
    localStorage.setItem("send2", 5);
    localStorage.setItem("send", "");
    localStorage.setItem("send1", "");
    location.reload(true);
  }
});

//recovert button display
agroMartId.addEventListener("click", function (e) {
  e.preventDefault();
  logIn.textContent = "Recovery";
  send.classList.remove("display");
  login.classList.add("display");
  id.classList.add("display");
  email.classList.remove("display");
  agroMartId.textContent = "";
});

//forget agro mart id send button action
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

//get key
const bin = document.querySelector(".scrol");
bin.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("fa-trash")) {
    const clicked = e.target.closest(".box");
    n = clicked.dataset.tra;

    cartDelete(n);
  }
  cartDelete("hi");
});

/////////////
const Data = new Date();
const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const fullDate = `${day}/${month + 1}/${year}`;
const randomNum = Math.floor(Math.random() * 9000) + 1000;
const checkout = document.querySelector(".checkout");

const userDeliveryData = function () {
  let userNameLocalStroage = localStorage.getItem("send");
  var newContactForm = deliveryDetailsDatabase.push();
  newContactForm.set({
    User: userNameLocalStroage,
    OrderProduct: currentLoginCart,
    OrderStatus: "ND",
    OrderTaken: "nt",
    ProductId: randomNum,
    Date: fullDate,
    Total: total,
    Adresss: adress[0],
  });
};
checkout.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(total);
  if (currentLoginCart.length === 0 || total < 100) {
    alert(
      "We regret to inform you that your order value is less than ₹100. Please note that our minimum order value is ₹100 and we are unable to process orders that do not meet this requirement."
    );
  } else {
    alert(
      "Thank you for your purchase! Your invoice will be available in the View Order Details section of your account and registered Email. We appreciate your business and hope you enjoy your new agriculture product."
    );
    userDeliveryData();
    deleteAllOrder();
  }
});

const deleteAllOrder = function () {
  //  console.log(currentLoginCart.length);
  currentLoginCart.forEach((mov) => {
    mov.key;
    const userId = mov.key;
    orderDetailsDatabase
      .child(userId)
      .remove()
      .then(() => {
        location.reload(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  });
};
//login conection//
//after removeing cart item and reasign value//
