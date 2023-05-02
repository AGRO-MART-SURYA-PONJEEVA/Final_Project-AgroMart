"use strict";

//API DATABASE//

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

let alreadyUser = [];
formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let lowername=element.val().FullName;
    lowername=lowername.toLowerCase();
    lowername=lowername.split(" ");
    const user = {
      fullName: lowername[0],
      mobileNumber: element.val().Mobile,
      email: element.val().Email,
    };
    // console.log(name);
    alreadyUser.push(user);
  });
});

const phoneInputField = document.querySelector(".mobile");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["in", "co", "us", "de"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

//container_display//
const page1 = document.querySelector(".form_container");
const page2 = document.querySelector(".form_container_2");
const page3 = document.querySelector(".id_display");

//input select//
//page 1//
const fullName = document.querySelector(".fullname");
const email = document.querySelector(".email");
const mobile = document.querySelector(".mobile");
const radio = document.querySelector(".radio");
const password = document.querySelector(".password");
const conPassword = document.querySelector(".conpassword");
const title = document.querySelector(".header_title");
const note = document.querySelector(".note");
const idText = document.querySelector(".id_text");
// page 2
const pincode = document.querySelector(".pincode");
const state = document.querySelector(".state");
const city = document.querySelector(".city");
const house = document.querySelector(".house");
const road = document.querySelector(".road");
const landmark = document.querySelector(".landmark");

//button select//
const nextPage1 = document.querySelector(".next_page");
const nextPage2 = document.querySelector(".next_page_2");
const ratio1 = document.querySelector(".farmer");
const ratio2 = document.querySelector(".customer");
const work = document.querySelector(".work");
const home = document.querySelector(".home");
//error message
const errorMessage1 = document.querySelector(".error_message_name");
const errorMessage2 = document.querySelector(".error_message_email");
const errorMessage3 = document.querySelector(".error_message_mobile");
const errorMessage4 = document.querySelector(".error_message_radio");
const errorMessage5 = document.querySelector(".error_message_password");
const errorMessage6 = document.querySelector(".error_message_conpassword");
const errorMessage7 = document.querySelector(".error_message_pincode");
const errorMessage8 = document.querySelector(".error_message_state");
const errorMessage9 = document.querySelector(".error_message_city");
const errorMessage10 = document.querySelector(".error_message_house");
const errorMessage11 = document.querySelector(".error_message_road");
const errorMessage12 = document.querySelector(".error_message_landmark");

// global Input
let userDataArray = [];
let role = "";
let type = "";
let b = 0;
//addEventListener
// page1
const check = function (fullName, email, mobileNumberget) {
  let a = 0;
  fullName = fullName.split(" ");
  let firstName = fullName[0].toLowerCase();
  const find1 = alreadyUser.find((mov) => mov?.fullName === firstName);
  const find2 = alreadyUser.find((mov) => mov?.email === email);
  const find3 = alreadyUser.find((mov) => mov?.mobileNumber === mobileNumberget);
  
  if(find1===undefined)
  {
   a++;
   errorMessage1.classList.add('display');
  }
  else{
  errorMessage1.textContent="Name already have been taken,try another";
  errorMessage1.classList.remove('display');
  }
  if(find2===undefined)
  {
    errorMessage2.classList.add('display');
   a++;
  }
  else{
  errorMessage2.textContent="Email already have been taken try another";
  errorMessage2.classList.remove('display');
}
  
  if(find3===undefined)
  {
    errorMessage3.classList.add('display');
   a++;
  }
  else{
  errorMessage3.textContent="Mobile Number already have been taken try another";
  errorMessage3.classList.remove('display');
  }
  
  
  return a;
};

nextPage1.addEventListener("click", function (e) {
  let fullNameget = fullName.value;
  const emailget = email.value;
  const mobileget = mobile.value;
  const passwordget = password.value;
  const conpasswordget = conPassword.value;
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
        errorMessage2.textContent = "Email Not Valid";
        errorMessage3.textContent = "Mobile Number Not Valid";
        errorMessage2.classList.remove("display");
        errorMessage3.classList.remove("display");
      }
    }
    if (
      passwordget.length === 4 &&
      conpasswordget.length === 4 &&
      passwordget === conpasswordget
    ) {
      errorMessage5.classList.add("display");
      errorMessage6.classList.add("display");
      a++;
    } else {
      errorMessage5.textContent = "Passwords do not match. Please try again.";
      errorMessage6.textContent = "Passwords do not match. Please try again.";
      errorMessage5.classList.remove("display");
      errorMessage6.classList.remove("display");
      a--;
    }
  } else {
    errorMessage1.classList.remove("display");
    errorMessage2.classList.remove("display");
    errorMessage3.classList.remove("display");
    errorMessage3.classList.remove("display");
    errorMessage5.classList.remove("display");
    errorMessage6.classList.remove("display");
    // a=0;
  }

  if (a === 4) {
    userDataArray.push(fullNameget);
    userDataArray.push(emailget);
    userDataArray.push(mobileget);
    userDataArray.push(passwordget);
    page1.classList.add("display");
    page2.classList.remove("display");
  }
});
ratio1.addEventListener("click", function () {
  role = "Farmer";
});
ratio2.addEventListener("click", function () {
  role = "Customer";
});

//page_2//
nextPage2.addEventListener("click", function (e) {
  let a = 0;
  const pincodeget = pincode.value;
  const stateget = state.value;
  const cityget = city.value;
  const houseget = house.value;
  const roadget = road.value;
  const landmarkget = landmark.value;
  if (pincodeget.length < 6) {
    errorMessage7.classList.remove("display");
    a--;
  } else {
    errorMessage7.classList.add("display");
    a++;
  }
  if (stateget === "") {
    errorMessage8.classList.remove("display");
    a--;
  } else {
    errorMessage8.classList.add("display");
    a++;
  }
  if (cityget === "") {
    errorMessage9.classList.remove("display");
    a--;
  } else {
    errorMessage9.classList.add("display");
    a++;
  }
  if (houseget === "") {
    errorMessage10.classList.remove("display");
    a--;
  } else {
    errorMessage10.classList.add("display");
    a++;
  }
  if (roadget === "") {
    errorMessage11.classList.remove("display");
    a--;
  } else {
    errorMessage11.classList.add("display");
    a++;
  }
  if (landmarkget === "") {
    errorMessage12.classList.remove("display");
    a--;
  } else {
    errorMessage12.classList.add("display");
    a++;
  }
  if (a === 6) {
    userDataArray.push(pincodeget);
    userDataArray.push(stateget);
    userDataArray.push(cityget);
    userDataArray.push(houseget);
    userDataArray.push(roadget);
    userDataArray.push(landmarkget);
    userData();
    page2.classList.add("display");
    title.textContent = "congratulations";
    note.textContent = "";

    let firstName = userDataArray[0].split(" ");
    idText.textContent =
      firstName[0] + "-" + userDataArray[3] + "-" + userDataArray[10].charAt(0);
    page3.classList.remove("display");
  }
});
work.addEventListener("click", function (e) {
  e.preventDefault();
  type = "work";
});
home.addEventListener("click", function () {
  type = "home";
});
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
    firstName[0] + "-" + userDataArray[3] + "-" + userDataArray[10].charAt(0);
  userDataArray.push(fullId);
  // console.log(userDataArray);
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
    Landmark: userDataArray[9],
    Roll: userDataArray[10],
    AddressType: userDataArray[11],
    PermanentedId: userDataArray[12],
  });
  
};
// ['RAJASURYA R', 'techmacos2020@gmail.com', '9840864118', '1111', '637215', 'tn', 'Nilagiri', '1', '1', '1', 'customer', 'home']
