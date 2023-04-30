"use strict";
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

imageInput.addEventListener("click",function(){
  no.forEach((mov) => {
    mov.style.marginLeft="0px";
    mov.style.color="green";
    mov.textContent="Publish..."
  });
})
publish.addEventListener("click", function () {
  const file1 = imageInput.files[0];
  const file2 = imageInput.files[1];
  const file3 = imageInput.files[2];
  const file4 = imageInput.files[3];
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
      console.log(mov);
      mov.style.padding = "0px";
    });
    no.forEach((mov) => {
      mov.textContent=""
    });
  }
  else
  {
    alert("Plz select four Image!...");
  }
});
