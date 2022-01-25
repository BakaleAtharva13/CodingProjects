// Getting All The Elements

const form = document.querySelector("form"),
statusTxt = document.querySelector(".button-area span");

form.onsubmit = (e) => {
  e.preventDefault() // Preventing Form From Submitting
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";

  let xhr = new XMLHttpRequest(); // Creating New XML Object
  xhr.open("POST", "message.php", true) // Sending Post Request To PHP File
  xhr.onload = () => { // Once Ajax Is Loaded
    if (xhr.readyState == 4 && xhr.status == 200) { // If Ajax Response Is 200 & Ready Status Is 4 Means There Is No Error
      let response = xhr.response; // Storing Ajax Response In A Response Variable
      // Error Response Will Be In Red
      if(response.indexOf("Email & Password Field Is Required.") != -1 || response.indexOf("Enter A Valid Email Address") || response.indexOf("Sorry, Failed To Send Your Message!")) {
        statusTxt.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display="none"
        }, 3000);
      }
      statusTxt.innerText = response;
    }
  }
  let formData = new FormData(form); // Creating A New FormData Obj. This Obj Is Used To Send Form Data.
  xhr.send(formData); // Sending Form Data
}
