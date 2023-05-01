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
var formdb1 = firebase.database().ref("USER DATABASE");
var formdb = firebase.database().ref("Global_Product_Details");
var orderDetailsDatabase = firebase.database().ref("Global_order_details");
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
let i = 0;
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
    let quantityLive = element.val().Quantity;
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
      quantityLiveGet: quantityLive,
      url: [],
    };
    userProduct.push(prodectDetails);
  });
  linkGet();
  // console.log(userProduct);
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
  row.innerHTML = "";
  userProduct.forEach(function (mov, i) {
    const q =
      Number(mov.quantityLiveGet) > 0
        ? mov.quantityLiveGet + "/Kg"
        : "Out of stock";
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
      <span class="qty_name">${q}</span>
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
    <button class="buy" data-set="${i}">Add to cart</button>
  </div>
  <div>
    <p class="ex">Expiry Date:${mov.ex_data}</p>
  </div>
</div>
`;
    row.insertAdjacentHTML("afterbegin", html);
  });
};
///////////////////////////////////////////////

const userName = document.querySelector(".name");
const pinCode = document.querySelector(".pincode");

let funa = localStorage.getItem("send");
let alreadyUser = [];
formdb1.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let ids = element.val().PermanentedId;
    ids = ids.toLowerCase();
    const user = {
      fullName: element.val().FullName,
      mobile: element.val().Mobile,
      pincocde: element.val().Pincode,
      house: element.val().House,
      road: element.val().Road,
      landmark: element.val().Landmark,
    };
    alreadyUser.push(user);
  });
  getData();
  console.log(alreadyUser);
});
const getData = function () {
  const find1 = alreadyUser.find((mov) => mov?.fullName === funa);
  userName.textContent = `${find1.fullName}`;
  pinCode.textContent = `${find1.pincocde}`;
};
//Add Cart//
const getOrderDetails = document.querySelector(".getOrderDetails");
const addCartButton = document.querySelector(".product_display");
const kg = document.querySelector(".kg");
const x = document.querySelector(".fa-xmark");
const confirmButton = document.querySelector(".con_btn");
const priceUpdate = document.querySelector(".price_up");
const orderType = document.querySelector(".order_type");
var database = firebase.database();
// key get
let key = [];
let tr = "";
const updateData = function () {
  formdb.on("value", function (snapshot) {
    snapshot.forEach(function (element) {
      key.push(element.key);
    });
  });
};

const takeOrder = function (o, kg, ot) {
  let orderDetails = userProduct[o];
  const totalKg = Number(orderDetails.quantityLiveGet);
  const totalamount = Number(orderDetails.price);
  const find1 = alreadyUser.find((mov) => mov?.fullName === funa);
  if (find1 !== undefined) {
    if (kg <= totalKg && kg !== 0) {
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      priceUpdate.textContent = `₹${kg * totalamount}`;
      const farmerAddress = `${orderDetails.farmerName}-${orderDetails.city}-${orderDetails.mobileNumber}`;
      const customberAddress = `${find1.fullName}-${find1.house}-${
        find1.road
      }-${find1.landmark}-${find1.mobile}-${orderDetails.productName}-${kg}-${
        kg * totalamount
      }-${ot}-${randomNum}`;
      var newContactForm = orderDetailsDatabase.push();
      newContactForm.set({
        FarmerAddress: farmerAddress,
        CustomberAddress: customberAddress,
      });

      var newData = {
        Quantity: `${Math.abs(kg - orderDetails.quantityLiveGet)}`,
      };
      updateData();
      updateDataLive(key[o], newData);
      alert(
        `Your order is confirmed and cannot be cancelled.\n Total Amount:${
          kg * totalamount
        }`
      );
      location.reload(true);
    } else {
      alert(" :( Out of Stock... :( ");
      // location.reload(true);
      tr = true;
      c = 0;
    }
  } else {
    alert("Plz Login...");
  }
};

const updateDataLive = function (key, newData) {
  console.log(key);
  database
    .ref("Global_Product_Details/" + key)
    .update(newData)
    .then(function () {
      console.log("Data updated successfully!");
    })
    .catch(function (error) {
      console.error("Error updating data: ", error);
    });
};

let n,
  c = 0;

addCartButton.addEventListener("click", function (e) {
  const clicked = e.target.closest(".buy");
  n = clicked.dataset.set;
  getOrderDetails.classList.remove("display");
  c = 0;
});
x.addEventListener("click", () => getOrderDetails.classList.add("display"));
confirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (tr === true) {
    c = 0;
  }
  const kgGet = Number(kg.value);
  const orType = orderType.value;
  if (c === 0 && orType !== "") {
    takeOrder(n, kgGet, orType);
    c = 1;
  } else {
    alert("your order Already Submit ,plz checkout.");
  }
});
