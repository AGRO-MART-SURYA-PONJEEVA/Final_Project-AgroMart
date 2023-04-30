"use strict";
//API Conection----------------------//
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
const storage = firebase.storage();
const storageRef = storage.ref();
var formdb = firebase.database().ref("Global_Product_Details");
//API Conection----------------------//
//search button//

const searchInput = document.querySelector(
  '.search-container input[type="text"]'
);
const searchResults = document.querySelector(".search-results");
const customItems = [
  "rice",
  "wheat",
  "Carrots",
  "Potato.",
  "Tomato",
  "Onions",
  "Cauliflower",
  "Beetroot",
  "Ginger",
  "Green peas",
];

searchInput.addEventListener("input", function (e) {
  // Get user input
  const userInput = this.value.toLowerCase();

  // Filter search results based on user input
  const filteredResults = customItems.filter(function (item) {
    return item.toLowerCase().includes(userInput);
  });

  // Show filtered search results
  searchResults.innerHTML = "";
  filteredResults.forEach(function (result) {
    const resultLink = document.createElement("a");
    resultLink.textContent = result;
    resultLink.addEventListener("click", function () {
      searchInput.value = result;
      searchResults.style.display = "none";
    });
    searchResults.appendChild(resultLink);
  });

  // Hide search result box if there are no results
  if (filteredResults.length === 0) {
    searchResults.style.display = "none";
  } else {
    searchResults.style.display = "block";
  }
});

////////////////

///
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
///
//side_nav_bar
const box1 = document.querySelector(".box_1");

const box1List = document.querySelector(".box_1_list");

const up = document.querySelector(".up");

const down = document.querySelector(".down");

const text = document.querySelector(".text");
const lan = document.querySelector("#google_translate_element");
const span = document.querySelector(".span");
let a = 0;
box1.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("span") ||
    e.target.classList.contains("radio")
  ) {
    const clicked = e.target.closest(".input");
    const radio = document.querySelector(`.btn_${clicked.dataset.set}`);
    radio.click();
  }
  if (a === 0) {
    box1.style.height = "270px";

    up.style.opacity = "0";
    down.style.opacity = "1";
    box1List.classList.remove("display");
    a = 1;
  } else {
    box1.style.height = "50px";
    up.style.opacity = "1";
    down.style.opacity = "0";
    box1List.classList.add("display");
    a = 0;
  }
  if (e.target.classList.contains("span")) {
    const clicked = e.target.closest(".input");
    let n = clicked.dataset.set;
    let arr = ["null", "Relevance", "Price Low to High", "Price High to Low"];
    text.textContent = arr[n];
  }
});
lan.addEventListener("click", function () {
  box1.style.height = "100%";
  span.style.fontSize = "15px";
});
//////////////////////
// slider
let i=0;
const imageAnimation = function (a) {
  
  for (i = 0; i < a; i++) {
    const slider = document.querySelector(`.slider${i}`);

    const images = slider.querySelectorAll(`.img${i}`);
    const prevBtn = slider.querySelector(`.prev${i}`);
    const nextBtn = slider.querySelector(`.next${i}`);
    let activeIndex = 0;
    images[activeIndex].classList.add("active");
    const tick = function () {
      images[activeIndex].classList.remove("active");
      activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      images[activeIndex].classList.add("active");
    };
    setInterval(tick, 3000);
  }
};

const slider = document.querySelector(".slider");
const images = slider.querySelectorAll("img");
const prevBtn = slider.querySelector(".prev");
const nextBtn = slider.querySelector(".next");
let activeIndex = 0;
images[activeIndex].classList.add("active");
const tick = function () {
  images[activeIndex].classList.remove("active");
  activeIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
  images[activeIndex].classList.add("active");
};
setInterval(tick, 3000);
///////////////
////
//to get image url ;

let arr = [];
let userProduct = [];
let link = [];

storageRef
  .listAll()
  .then(function (result) {
    result.items.forEach(function (item) {
      item.getDownloadURL().then(function (url) {
        link.push(url);
      });
    });
  })
  .catch(function (error) {
    console.error(error);
  });

formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let userData = element.val().ProductDetails.split("-");
    const prodectDetails = {
      farmerName: userData[0],
      mobileNumber: userData[2],
      city: userData[3],
      productName: userData[4],
      productCat: userData[5],
      quantity: userData[6],
      ex_data: userData[7],
      price: userData[8],
      data: userData[9],
      productId: userData[11],
      url: [],
    };
    userProduct.push(prodectDetails);
  });
  linkGet();
});

//link arrange//
const linkGet = function () {
  link.forEach((mov) => {
    const urlList = mov.split("-");
    const find1 = userProduct.find((mov) => mov?.productId === urlList[3]);
    find1.url.push(mov);
  });
  // console.log(userProduct);
  displayProduct();
  imageAnimation(userProduct.length);
};

//show//

const row = document.querySelector(".product_display");
const displayProduct = function () {
  row.innerHTML="";
  userProduct.forEach(function (mov, i) {
    const html = `<div class="box_item_display">
  <div class="slider${i} slider">
    <img src="${mov.url[0]}" alt="" class="img_slide img${i}">
    <img src="${mov.url[1]}" alt="" class="img_slide img${i}">
    <img src="${mov.url[2]}" alt="" class="img_slide img${i}">
    <img src="${mov.url[3]}" alt="" class="img_slide img${i}">
    <button class="prev${i}"></button>
    <button class="next${i}"></button>
  </div>
  
  <div class="image_details">
    <p class="text_name">
      Product Name <span class="col">:</span>
      <span class="pro_name">${mov.productName}</span>
    </p>
    <p class="text_name">
      Farmer Name <span class="col1">:</span>
      <span class="far_name">${mov.farmerName}</span>
    </p>
    <p class="text_name">
      City <span class="col3">:</span>
      <span class="city_name">${mov.city}</span>
    </p>
    <p class="text_name">
      Mobile No <span class="col4">:</span>
      <span class="mob_name">${mov.mobileNumber}</span>
    </p>
    <p class="text_name">
      Total Qty<br />Available <span class="col5">:</span>
      <span class="qty_name">${mov.quantity}/Kg</span>
    </p>
  </div>
  <div class="box_add">
    <p class="price">₹${mov.price}-/Kg</p>
    <div class="a_p">
      <p class="star_rat">
        <span class="rating">★★★★★</span
        ><span class="count">(1000)</span>
      </p>
      <p class="count1">Agro Mart Assured</p>
      <p class="del">
        <i class="fa-solid fa-truck"></i> Fast Delivery(1-2 Days)
      </p>
      <p class="id"><span>Product ID : </span><span>${mov.productId}</span></p>
    </div>
  </div>
  <div>
    <button class="buy">Buy Now</button>
  </div>
  <div>
    <p class="ex">Expiry Date:${mov.ex_data}</p>
  </div>
</div>
`;
    row.insertAdjacentHTML("afterbegin", html);
  });
};
