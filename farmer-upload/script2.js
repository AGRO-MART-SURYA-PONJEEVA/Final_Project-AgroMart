"use strict";

//Api Concetion
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

//
//////////////////////////////////////////////////
//image section//
const imageInput = document.querySelector(".file-input");
const imageSrc = document.querySelector(".image-display");
const imageSrc1 = document.querySelector(".image-display1");
const imageSrc2 = document.querySelector(".image-display2");
const imageSrc3 = document.querySelector(".image-display3");
const publish = document.querySelector(".btn_p");
const box = document.querySelectorAll(".box");
const no = document.querySelectorAll(".no");

imageInput.addEventListener("click", function () {
  no.forEach((mov) => {
    mov.style.marginLeft = "0px";
    mov.style.color = "green";
    mov.textContent = "Publish...";
  });
});
////////////////////////////////////
let file1;
let file2;
let file3;
let file4;
//////////////////////////////////
publish.addEventListener("click", function () {
   file1 = imageInput.files[0];
   file2 = imageInput.files[1];
   file3 = imageInput.files[2];
   file4 = imageInput.files[3];
  if (
    file1 !== undefined &&
    file2 !== undefined &&
    file3 !== undefined &&
    file4 !== undefined
  ) {
    const imageUrl1 = URL.createObjectURL(file1);
    const imageUrl2 = URL.createObjectURL(file2);
    const imageUrl3 = URL.createObjectURL(file3);
    const imageUrl4 = URL.createObjectURL(file4);
    imageSrc.src = imageUrl1;
    imageSrc1.src = imageUrl2;
    imageSrc2.src = imageUrl3;
    imageSrc3.src = imageUrl4;
    box.forEach((mov) => {
      // console.log(mov);
      mov.style.padding = "0px";
    });
    no.forEach((mov) => {
      mov.textContent = "";
    });
  } else {
    alert("Plz select four Image!...");
  }
});
////////////////////////////////////////////////////
//getting data//
//input filed//
const randomNum = Math.floor(Math.random() * 9000) + 1000;
console.log(randomNum);
const tick = document.querySelector(".tick");
const tick1 = document.querySelector(".tick1");
const category = document.querySelector(".category");
const email = document.querySelector(".email");
const otp = document.querySelector(".otp");
const agID = document.querySelector(".agID");
const city = document.querySelector(".city");
const mobile = document.querySelector(".mobil");

const nameF = document.querySelector(".nameF");
const quantity = document.querySelector(".quantity");
const expiryDate = document.querySelector(".expiryDate");
const price = document.querySelector(".price");
const textarea = document.querySelector(".textarea");
// button
const submit = document.querySelector(".submit");
const verify = document.querySelector(".verify");
let otpVerfication = "";
////////////////
submit.addEventListener("click", function (e) {
  e.preventDefault();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullDate = `${day}/${month + 1}/${year}`;
  const cate = category.value;
  const emai = email.value;
  const ot = otp.value;
  const farmerName = agID.value;
  const cit = city.value;
  const mob = mobile.value;
  const productName = nameF.value;
  const qun = quantity.value;
  const exda = expiryDate.value;
  const pr = price.value;
  const text = textarea.value;
  // console.log(mob);
  if (otpVerfication === true) {
    if (
      farmerName !== "" &&
      emai !== "" &&
      mob !== "" &&
      cit !== "" &&
      productName !== "" &&
      cate !== "" &&
      qun !== "" &&
      exda !== "" &&
      pr !== "" &&
      text !== ""
    ) {
      // console.log(mob);
      const nameImage = `${farmerName}-${emai}-${mob}-${cit}-${productName}-${cate}-${qun}-${exda}-${pr}-${fullDate}-${text}-${randomNum}`;
      var newContactForm = formdb.push();
      newContactForm.set({
        ProductDetails: nameImage,
        Quantity: qun,
      });

      const ref = firebase.storage().ref();
      const name = farmerName + "-" + randomNum + "-";
      ref.child(name + "1").put(file1);
      ref.child(name + "2").put(file2);
      ref.child(name + "3").put(file3);
      ref.child(name + "4").put(file4);
      alert("Your product upload successfully");
    } else {
      alert("Plz Enter all the details for product update in webpage");
    }
  }
  else{
    alert("Plz verify You");
  }
  // console.log(file1);
});
/////////////////////////////////////////////////////
let s = "";
otp.addEventListener("keydown", function (e) {
  let a = e.key.charCodeAt(0);
  if (a >= 48 && a <= 57 && s.length < 4) {
    s = s + e.key;
  }
  if (s.length === 4) {
    if (Number(s) === randomNum) {
      tick.style.opacity = "1";
      tick1.style.opacity = "0";
      otpVerfication = true;
    } else {
      tick1.style.opacity = "1";
      tick.style.opacity = "0";
      otpVerfication = false;
    }
  } else {
    tick1.style.opacity = "1";
    tick.style.opacity = "0";
    otpVerfication = false;
  }
  if (e.key === "Backspace") {
    s = s.slice(0, s.length - 1);
    if (Number(s) === randomNum) {
      tick.style.opacity = "1";
      tick1.style.opacity = "0";
      otpVerfication = true;
    } else {
      tick1.style.opacity = "1";
      tick.style.opacity = "0";
      otpVerfication = false;
    }
  }
});
const otpSend = function (email) {
  Email.send({
    SecureToken: "b80dbf98-7248-44a9-a66e-f4e0fd05d4be",
    To: email,
    From: "customerservicein2023@gmail.com",
    Subject: "OTP Verification",
    Body: ` <p style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;font-size: 16px;">Welcome to our Agro Mart Product Upload Page! We are excited to announce the arrival of new products that you have been uploaded for customber shopping pleasure. To ensure secure transactions, Your one time otp is ${randomNum}. Thank you for choosing us as your go-to online shopping destination. Happy shopping! </p> <br/>
      <p style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;font-size: 17px;">எங்கள் அக்ரோ மார்ட் தயாரிப்பு பதிவேற்றப் பக்கத்திற்கு வரவேற்கிறோம்! வாடிக்கையாளர் ஷாப்பிங் மகிழ்ச்சிக்காக நீங்கள் பதிவேற்றிய புதிய தயாரிப்புகளின் வருகையை அறிவிப்பதில் நாங்கள் மகிழ்ச்சியடைகிறோம். பாதுகாப்பான பரிவர்த்தனைகளை உறுதிசெய்ய, உங்களின் ஒரு முறை OTP ${randomNum}. உங்களின் ஆன்லைன் ஷாப்பிங் இடமாக எங்களைத் தேர்ந்தெடுத்ததற்கு நன்றி. மகிழ்ச்சியான ஷாப்பிங்!</p>
      `,
  }).then((message) => alert("OTP Send successfully..."));
};
verify.addEventListener("click", function (e) {
  const emai = email.value;
  otpSend(emai);
});
// console.log(randomNum);
/////////////////////////////////
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

