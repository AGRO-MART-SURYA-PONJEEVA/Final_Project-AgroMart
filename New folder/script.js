"use strict";
let loginName = localStorage.getItem("send");
loginName=loginName.toLocaleLowerCase().split(" ");
loginName=loginName[0];
if(loginName==="")
{
  alert("plz Login")
}
//API Connection//
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
var formdb1 = firebase.database().ref("USER DATABASE");
var formdb = firebase.database().ref("Global_Product_Details");
//API Connection//

// JavaScript code for dynamically populating the product table

// Example data (you can replace it with your own)
const products = [
  // {
  //     id:1234,
  //     name: "Apples",
  //     quantity: 100,
  //     expiryDate: "2023-06-30",
  //     profit: 500
  // },
  // {
  //     id:1234,
  //     name: "Oranges",
  //     quantity: 80,
  //     expiryDate: "2023-05-25",
  //     profit: 400
  // },
  // {
  //     id:1234,
  //     name: "Tomatoes",
  //     quantity: 50,
  //     expiryDate: "2023-05-20",
  //     profit: 300
  // }
];

//getting data//
let userProduct = [];
let grandTotal = 0;
const tot = document.querySelector(".tot");
const n = document.querySelector(".n");
const i = document.querySelector(".i");
const m = document.querySelector(".m");
formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let userData = element.val().ProductDetails.split("-");
    let quantityLive = element.val().Quantity;
    const prodectDetails = {
      farmerName: userData[0],
      mobileNumber: userData[2],
      name: userData[4],
      quantity: userData[6],
      ex_data: userData[7],
      price: userData[8],
      date: userData[9],
      id: userData[11],
      quantityLiveGet: quantityLive,
    };
    userProduct.push(prodectDetails);
  });

  userProduct.forEach((mov) => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const date = new Date();

    let name = mov.farmerName.toLowerCase().split(" ");

    if (name[0] === loginName) {
      const data = {
        id: mov.id,
        name: mov.name,
        quantity: `AVL:${mov.quantityLiveGet}/T:${mov.quantity}`,
        price: mov.price,
        expiryDate: `${
          date.getDate() + randomNumber
        }/${date.getMonth()}/${date.getFullYear()}`,
        profit: `${(mov.quantity - mov.quantityLiveGet) * mov.price}`,
      };
      products.push(data);
      grandTotal =
        grandTotal + Number((mov.quantity - mov.quantityLiveGet) * mov.price);
        n.textContent=`Farmer Name : ${mov.farmerName}`;
        i.textContent=`ID : ....`;
        m.textContent=`Mobile Number : ${mov.mobileNumber}`
    }
    tot.textContent = `Total Profit : ₹${grandTotal}`;
   
  });

  display();
});

//getting data//

// Get the product table body element
const display = function () {
  const productTableBody = document.getElementById("productTable");

  // Function to generate a row for each product
  function generateProductRow(product) {
    const row = document.createElement("tr");

    const productId = document.createElement("td");
    productId.textContent = product.id;
    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = product.quantity;
    const price = document.createElement("td");
    price.textContent = product.price;

    const expiryCell = document.createElement("td");
    expiryCell.textContent = product.expiryDate;

    const profitCell = document.createElement("td");
    profitCell.textContent = product.profit;

    row.appendChild(productId);
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(price);
    row.appendChild(expiryCell);
    row.appendChild(profitCell);

    return row;
  }

  // Generate product rows and add them to the table

  products.forEach((product) => {
    const row = generateProductRow(product);
    productTableBody.appendChild(row);
  });
};

// script.js

const profileLink = document.getElementById("profileLink");
const profilePopup = document.getElementById("profilePopup");
const closeButton = document.getElementById("closeButton");

profileLink.addEventListener("click", () => {
  profilePopup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  profilePopup.style.display = "none";
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