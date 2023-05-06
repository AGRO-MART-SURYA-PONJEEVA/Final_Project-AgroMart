"use strict";
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
var deliveryDetailsDatabase = firebase
  .database()
  .ref("Global_delivery_details");
// var CustomberAdressFi = firebase.database().ref("Global_order_details");

//pdf converter//
function convertHTMLtoPDF() {
  const { jsPDF } = window.jspdf;

  var doc = new jsPDF("p", "mm", [1000, 1000]);
  var pdfjs = document.querySelector(".wrapper");

  doc.html(pdfjs, {
    callback: function (doc) {
      doc.save("order Invoice(Agro Mart).pdf");
    },
    x: 12,
    y: 12,
  });
}
///////////
//global//

//   fullOrderDetails
let fullOrderDetails = [];
let adresss = [];
//getting data
deliveryDetailsDatabase.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    const user = {
      userName: element.val().User,
      date: element.val().Date,
      productId: element.val().ProductId,
      total: element.val().Total,
      orderStatus: element.val().OrderStatus,
      cart: element.val().OrderProduct,
      adresss:element.val().Adresss,
    };
    fullOrderDetails.push(user);
  });
    getCurrentCart();

    // console.log(fullOrderDetails);
});

//current Login//
let currentUser = localStorage.getItem("send");
let currentUserId = localStorage.getItem("send1");
let viewOrderDetails = [];
let viewAdressDetails = [];
//not Login//
if(currentUser==="")
{
  alert("We noticed that you are not logged in to your account. Please note that in order to access certain features of our website or to complete your purchase, you need to be logged in.\nTo log in, please click on the Log In button on the top right corner of the screen and enter your username and password. If you do not have an account yet, please click on Register to create one.")
}
//
//class//
const displayName = document.querySelector(".name_text");
const displayId = document.querySelector(".name_id");

//view order Update//
//arrange current User item//
const getCurrentCart = function () {
  fullOrderDetails.forEach((mov) => {
    if (currentUser === mov.userName) {
      viewOrderDetails.push(mov);
      viewAdressDetails.push(mov.adresss);
    }

  });

  displayName.textContent = currentUser;
  displayId.textContent = currentUserId;
  viewOrderDisplay();
};

//display view order//
const row = document.querySelector("tbody");
const col = document.querySelector(".col");
const viewOrderDisplay = function () {
  row.innerHTML = "";
  viewOrderDetails.forEach((mov, i) => {
    const statusMes = mov?.orderStatus === "ND" ? "Pending" : "delivered";
    const statusCol = mov?.orderStatus === "ND" ? "red" : "green";

    const html = `
    <tr>
    <td>${mov.date}</td>
    <td>${mov.productId}</td>
    <td>${mov.cart.length}</td>
    <td>₹${mov.total}</td>
    <td style="color: ${statusCol};">${statusMes}</td>
    <td><button class="view-invoice-button" data-set="${i}">View Invoice</button></td>
    <td><button class="view-invoice-button1" data-set="${i}">Download Invoice</button></td>
  </tr>            
    `;
    row.insertAdjacentHTML("afterbegin", html);
  });
};
//view invoice//
//class//
const UsernameInvoice = document.querySelector(".user");
const invoiceId = document.querySelector(".idd");
const date = document.querySelector(".data_dis");
const price = document.querySelector(".price1");
const subtotal = document.querySelector(".st");
const grandTotal = document.querySelector(".g_t");
const deleveryCharge = document.querySelector(".del_ch");
const totalProduct = document.querySelector(".totao_pro");
const addressInvoice1 = document.querySelector(".address1");
const addressInvoice2 = document.querySelector(".address2");
const addressInvoice3 = document.querySelector(".address3");
const addressInvoice4 = document.querySelector(".address4");
const rowItem = document.querySelector(".table_body");
const invoice=document.querySelector(".wrapper");
const body=document.querySelector(".fa-xmark");

//image
const unDelivered1=document.querySelector(".penimg");
const unDelivered2=document.querySelector(".pen");
const delivered=document.querySelector(".del");
// button
let n;
const view=document.querySelector(".view");
view.addEventListener("click",function(e)
{
e.preventDefault();
if(e.target.classList.contains("view-invoice-button1"))
{
    const clicked = e.target.closest(".view-invoice-button1");
    n = clicked.dataset.set;
    viewOrderInvoice(n);
    viewOrderListInvoice(n);
    invoice.classList.remove("display");
    invoice.style.marginTop="0%";
    convertHTMLtoPDF();
    setTimeout(() => {
      invoice.classList.add("display");
      }, 20);
    // invoice.classList.add("display");
}
else
{
  if(e.target.closest(".view-invoice-button")){
    const clicked = e.target.closest(".view-invoice-button");
      n = clicked.dataset.set;
      invoice.classList.remove("display");
      viewOrderInvoice(n);
      viewOrderListInvoice(n);
      invoice.style.marginTop="50%";
      console.log("ok8888");
      body.style.opacity="1";
  }
}
if(viewOrderDetails[n].orderStatus==="D")
{
  delivered.classList.remove("display");
  unDelivered1.classList.add("display");
  unDelivered2.classList.add("display");

}
else{
    delivered.classList.add("display");
  unDelivered1.classList.remove("display");
  unDelivered2.classList.remove("display");
}

// console.log(viewOrderDetails[n].orderStatus);
})
body.addEventListener("click",function(e)
{
    e.preventDefault();
    body.style.opacity="0";
    invoice.classList.add("display");
    location.reload(true);
})
const viewOrderInvoice = function (n) {
  const data = viewOrderDetails[n];
  const addressData = viewAdressDetails[0];
  UsernameInvoice.textContent = currentUser;
  invoiceId.textContent = "#" + data.productId;
  date.textContent = data.date;
  price.textContent = data.total;
  subtotal.textContent = data.total;
  totalProduct.textContent = data.cart.length;
  deleveryCharge.textContent = `₹${data.cart.length * 10}`;
  grandTotal.textContent = `₹${data.total + data.cart.length * 10}`;
  addressInvoice1.textContent = addressData[1];
  addressInvoice2.textContent = addressData[2];
  addressInvoice3.textContent = addressData[3];
  addressInvoice4.textContent = addressData[4];
  
};
let i=0;

const viewOrderListInvoice = function (n) {
  rowItem.innerHTML = "";
  // console.log(i++);
  const data = viewOrderDetails[n];
  const cartItem = data.cart;
  // console.log(cartItem);
  cartItem.forEach((mov,i) => {
    const html = `
    <div class="row">
    <div class="col col_no">
      <p>0${i+1}</p>
    </div>
    <div class="col col_des">
      <p class="bold">${mov.product}</p>
      <p style="color:green;">Agro Mart Assured</p>
    </div>
    <div class="col col_price">
      <p><img src="/orderdetails/image/rupee-indian.png" alt="" class="rupee1">${mov.price/mov.qty}</p>
    </div>
    <div class="col col_qty">
      <p>${mov.qty}</p>
    </div>
    <div class="col col_total">
      <p><img src="/orderdetails/image/rupee-indian.png" alt="" class="rupee1">${mov.price}</p>
    </div>
  </div>
    `;
    rowItem.insertAdjacentHTML("beforebegin", html);
  });
};
