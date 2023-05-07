"use strict";
/////////////////////////////////////////////////////////////////////////////////////
//Api conection//
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
//Api conection//

/////////////////////////////////////////////////////////////////////////////////////
//nav bar//
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarItems = document.querySelectorAll(".navbar-item");
navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});
navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarMenu.classList.remove("active");
    navbarToggle.classList.remove("active");
  });
});
/////////////////////////////////////////////////////////////////////////////////////
//product display//
let n;
let c = 0;
const review = function () {
  let preveiwContainer = document.querySelector(".products-preview");
  let previewBox = preveiwContainer.querySelectorAll(".preview");

  document
    .querySelectorAll(".products-container .product")
    .forEach((product) => {
      product.onclick = () => {
        preveiwContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        n = name.charAt(2);
        c = 0;
        previewBox.forEach((preview) => {
          let target = preview.getAttribute("data-target");
          if (name == target) {
            preview.classList.add("active");
          }
        });
      };
    });

  previewBox.forEach((close) => {
    close.querySelector(".fa-times").onclick = () => {
      close.classList.remove("active");
      preveiwContainer.style.display = "none";
    };
  });
};
const loading = document.querySelector(".loading");
setTimeout(() => {
  review();
  loading.classList.add("display");
}, 2000);
////////////////////////////////////////////////////////////////////////////////////
//my code//
//slider code /////////////////////////////
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

//slider code end////////////////////////////////////
//to get all the details from data base//
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
});

//link arrange//
const linkGet = function () {
  link.forEach((mov) => {
    const urlList = mov.split("-");
    const find1 = userProduct.find((mov) => mov?.productId === urlList[3]);
    find1.url.push(mov);
  });
  displayProduct();
  imageAnimation(userProduct.length);
};

//display//

const productsContainer = document.querySelector(".products-container");

const displayProduct = function () {
  productsContainer.innerHTML = "";
  userProduct.forEach(function (mov, i) {
    const q =
      Number(mov.quantityLiveGet) > 0
        ? mov.quantityLiveGet + "/Kg"
        : "Out of stock";
    const html = `
    <div class="product" data-name="p-${i + 1}">
    <div class="slider${i} slider">
    <img src="${mov.url[0]}" alt="${mov.productName}" class="img_slide img${i}">
    <img src="${mov.url[1]}" alt="${mov.productName}" class="img_slide img${i}">
    <img src="${mov.url[2]}" alt="${mov.productName}" class="img_slide img${i}">
    <img src="${mov.url[3]}" alt="${mov.productName}" class="img_slide img${i}">
    <button class="prev${i}"></button>
    <button class="next${i}"></button>
  </div>
    <h3>${mov.productName}</h3>
    <div class="price">${q}</div>
    <div class="price">Product ID :${mov.productId}</div>
 </div>
    `;
    productsContainer.insertAdjacentHTML("afterbegin", html);
  });
  productsPreviewDisplay();
};

//preview//
const productsPreview = document.querySelector(".products-preview");

const productsPreviewDisplay = function () {
  productsPreview.innerHTML = "";

  userProduct.forEach(function (mov, i) {
    const randomNumber = Math.floor(Math.random() * 4);
    const q =
      Number(mov.quantityLiveGet) > 0
        ? mov.quantityLiveGet + "/Kg"
        : "Out of stock";
    const color = Number(mov.quantityLiveGet) > 0 ? "#444" : "red";
    const html = `
    
    <div class="preview" data-target="p-${i + 1}">
      <i class="fas fa-times"></i>
      <img src="${mov.url[randomNumber]}" alt="${
      mov.productName
    }" class="img_pre">
      <h3>${mov.productName}</h3>
      <div class="stars">
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star-half-alt"></i>
         <span>( 250 )</span>
      </div>
      <p>Farmer Name : ${mov.farmerName} City : ${
      mov.city
    } &nbsp; Mobile No : ${mov.mobileNumber}</p>
      
      <div class="price">₹${mov.price}-/Kg</div>
      <div class="buttons">
      <input type="number" class="buy kg_${
        i + 1
      }" placeholder="Available Qty : ${q}" style="background: ${color};">
         <a href="#" class="cart">add to cart</a>
      </div>
   </div>

    `;
    productsPreview.insertAdjacentHTML("afterbegin", html);
  });
};

//user login//
const currentUser = document.querySelector(".name");
const userId = document.querySelector(".id");
let funa = localStorage.getItem("send");
////
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
      id: element.val().PermanentedId,
    };
    alreadyUser.push(user);
  });
  getData();
  // console.log(alreadyUser);
});
const getData = function () {
  const find1 = alreadyUser.find((mov) => mov?.fullName === funa);
  if (find1 === undefined) {
    alert(
      "We noticed that you are not logged in to your account. Please note that in order to access certain features of our website or to complete your purchase, you need to be logged in.\nTo log in, please click on the Log In button on the top right corner of the screen and enter your username and password. If you do not have an account yet, please click on Register to create one."
    );
  }
  currentUser.textContent = `${find1.fullName}`;
  userId.textContent = `${find1.id}`;
};
//take order//
var database = firebase.database();
let key = [];
let tr = "";

const updateData = function () {
  formdb.on("value", function (snapshot) {
    snapshot.forEach(function (element) {
      key.push(element.key);
    });
  });
};

const takeOrder = function (o, kg) {
  let orderDetails = userProduct[o];
  console.log(orderDetails.quantityLiveGet);
  const totalKg = Number(orderDetails.quantityLiveGet);
  const totalamount = Number(orderDetails.price);
  const find1 = alreadyUser.find((mov) => mov?.fullName === funa);
  if (find1 !== undefined) {
    if (kg <= totalKg && kg !== 0) {
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const farmerAddress = `${orderDetails.farmerName}-${orderDetails.city}-${orderDetails.mobileNumber}`;
      const customberAddress = `${find1.fullName}-${find1.house}-${
        find1.road
      }-${find1.landmark}-${find1.mobile}-${orderDetails.productName}-${kg}-${
        kg * totalamount
      }-${"delivery"}-${randomNum}`;
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
      alert(`Your order is confirmed :)\n Total Amount:${kg * totalamount}`);
      location.reload(true);
    } else {
      alert(" :( Out of Stock... :( ");
      // location.reload(true);
      c = 0;
    }
  } else {
    alert("Plz Login...");
  }
};

const updateDataLive = function (key, newData) {
  // console.log(key);
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

setTimeout(() => {
  const takeOrderButton = document.querySelectorAll(".cart");

  takeOrderButton.forEach((mov) => {
    mov.addEventListener("click", function (e) {
      e.preventDefault();
      const kg = document.querySelector(`.kg_${n}`).value;
      if (c === 0) {
        if (kg !== "") {
          takeOrder(n - 1, kg);
          // alert("ok");
          c = 1;
        } else {
          alert("Enter Kg");
        }
      } else {
        alert("your order Already Submit ,plz checkout.");
      }
    });
  });
}, 2000);
