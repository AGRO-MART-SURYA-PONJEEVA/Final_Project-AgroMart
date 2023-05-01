"use strict";
//Api connection//

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

//Api connection//

const form = document.querySelector("form"),
  nextBtn = form.querySelector(".nextBtn"),
  backBtn = form.querySelector(".backBtn"),
  allInput = form.querySelectorAll(".first input");

// nextBtn.addEventListener("click", () => {
//   form.classList.add("secActive");
// });

backBtn.addEventListener("click", () => form.classList.remove("secActive"));
const phoneInputField = document.querySelector(".mobile");
const phoneInputField1 = document.querySelector(".mobile1");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["in"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
const phoneInput1 = window.intlTelInput(phoneInputField1, {
  preferredCountries: ["in"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
//login conection//

//get the data from api//

let alreadyUser = [];
formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let lowername = element.val().FullName;
    lowername = lowername.toLowerCase();
    lowername = lowername.split(" ");
    const user = {
      fullName: lowername[0],
      mobileNumber: element.val().Mobile,
      email: element.val().Email,
    };
    // console.log(name);
    alreadyUser.push(user);
  });
});

const fullName = document.querySelector(".fullname");
const email = document.querySelector(".email");
const mobile = document.querySelector(".mobile");
const radio = document.querySelector(".radio");
const password = document.querySelector(".password");
const conPassword = document.querySelector(".conpassword");

const pincode = document.querySelector(".pincode");
const state = document.querySelector(".state");
const city = document.querySelector(".city");
const house = document.querySelector(".house");
const road = document.querySelector(".road");
const address=document.querySelector(".add");

//button//


// global Input
let userDataArray = [];
let role = "";
let type = "";
let b = 0;
//function//
const check = function (fullName, email, mobileNumberget) {
  let a = 0;
  fullName = fullName.split(" ");
  let firstName = fullName[0].toLowerCase();
  const find1 = alreadyUser.find((mov) => mov?.fullName === firstName);
  const find2 = alreadyUser.find((mov) => mov?.email === email);
  const find3 = alreadyUser.find(
    (mov) => mov?.mobileNumber === mobileNumberget
  );

  if (find1 === undefined) {
    a++;
  } else {
    alert("Name already have been taken,try another");
  }
  if (find2 === undefined) {
    a++;
  } else {
    alert("Email already have been taken try another");
  }
  if (find3 === undefined) {
    a++;
  } else {
    alert("Mobile Number already have been taken try another");
  }
  return a;
};

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let fullNameget = fullName.value;
  const emailget = email.value;
  const mobileget = mobile.value;
  const passwordget = password.value;
  const conpasswordget = conPassword.value;
  role=radio.value;
  //to validate//
  let a = 0;
  userDataArray = [];
  if (fullNameget != "" || emailget != "" || mobileget != "") {
    if (alreadyUser.length === 0) {
      a = 3;
    } else {
      if (
        emailget.includes("@") &&
        emailget.includes(".com") &&
        mobileget.length === 10
      ) {
        a = check(fullNameget, emailget, mobileget);
      } else {
        alert("Email Not Valid");
        alert("Mobile Number Not Valid");
      }
    }
    if (
      passwordget.length === 4 &&
      conpasswordget.length === 4 &&
      passwordget === conpasswordget
    ) {
      a++;
    } else {
      alert("Passwords does not match. Please try again.");
      a--;
    }
  } else {
    alert("Plz fill the required details...");
  }

  if (a === 4) {
    userDataArray.push(fullNameget);
    userDataArray.push(emailget);
    userDataArray.push(mobileget);
    userDataArray.push(passwordget);
    form.classList.add("secActive");
  }
});
//get the data from api//
const sumbit=document.querySelector(".sumbit");
sumbit.addEventListener("click",function(e)
{
  e.preventDefault();

  let a = 0;
  const pincodeget = pincode.value;
  const stateget = state.value;
  const cityget = city.value;
  const houseget = house.value;
  const roadget = road.value;
    type=address.value;
  if (pincodeget.length < 6) {
    a--;
    alert("check all the details");
  } else {
    a++;
  }
  if (stateget === "") {
    a--;
    alert("check all the details");
  } else {
    a++;
  }
  if (cityget === "") {
    a--;
    alert("check all the details");
  } else {
    a++;
  }
  if (houseget === "") {
    a--;
    alert("check all the details");
  } else {
    a++;
  }
  if (roadget === "") {
    a--;
    alert("check all the details");
  } else {
    a++;
  }

  if (a === 5) {
    userDataArray.push(pincodeget);
    userDataArray.push(stateget);
    userDataArray.push(cityget);
    userDataArray.push(houseget);
    userDataArray.push(roadget);
    userData();
    alert("Thank you");
  }

})
const userData = function () {
  if (role === "") {
    role = "NULL";
  }
  if (type === "") {
    type = "NULL";
  }
  userDataArray.push(role);
  userDataArray.push(type);
  let firstName = userDataArray[0].split(" ");
  const fullId =
    firstName[0] + "-" + userDataArray[3] + "-" + userDataArray[9].charAt(0);
  userDataArray.push(fullId);
  var newContactForm = formdb.push();
  newContactForm.set({
    FullName: userDataArray[0],
    Email: userDataArray[1],
    Mobile: userDataArray[2],
    password: userDataArray[3],
    Pincode: userDataArray[4],
    State: "Tamil Nadu",
    City: userDataArray[6],
    House: userDataArray[7],
    Road: userDataArray[8],
    Landmark:"NULL",
    Roll: userDataArray[9],
    AddressType: userDataArray[10],
    PermanentedId: userDataArray[11],
  });
  alert(`Your Agro Mart ID: ${fullId} \n Plz note this :)`);
};
//login conection//
