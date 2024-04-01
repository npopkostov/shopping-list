// fetch("https://randomuser.me/api/")
//   .then((response) => {
//     response.json();
//   })
//   .then((data) => {
//     const test = data;
//     console.log(test);
//   });
const generateUser = document.getElementById("generate");
let img = document.querySelector("img");

const data = document.querySelectorAll(".text-xl");

data.forEach((data) => {
  if (data.textContent.includes("Name")) {
    data.id = "name";
  } else if (data.textContent.includes("Email")) {
    data.id = "email";
  } else if (data.textContent.includes("Phone")) {
    data.id = "phone";
  } else if (data.textContent.includes("Location")) {
    data.id = "location";
  } else if (data.textContent.includes("Age")) {
    data.id = "age";
  }
});

generateNewUser = function () {
  console.log("click");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://randomuser.me/api/");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      const data = JSON.parse(this.responseText);

      let name = document.getElementById("name");
      name.innerHTML = `<span class="font-bold">Name: </span>${data.results[0].name.first} ${data.results[0].name.last}
      </p>`;

      let email = document.getElementById("email");
      email.innerHTML = `<p class="text-xl">
      <span class="font-bold">Email: </span> ${data.results[0].email}
    </p>`;

      let phone = document.getElementById("phone");
      phone.innerHTML = `<p class="text-xl">
    <span class="font-bold">Phone: </span> ${data.results[0].phone}
  </p>`;

      let location = document.getElementById("location");
      location.innerHTML = `<p class="text-xl">
<span class="font-bold">Location: </span> ${data.results[0].location.country}
</p>`;

      let age = document.getElementById("age");
      age.innerHTML = `<p class="text-xl">
<span class="font-bold">Age: </span> ${data.results[0].dob.age}
</p>`;

      if (data.results[0].gender === "male") {
        document.body.style.backgroundColor = "#9DD9F3";
      } else if (data.results[0].gender === "female") {
        document.body.style.backgroundColor = "#D9544D";
      }
      img.src = `${data.results[0].picture.large}`;
    }
  };

  xhr.send();
};

generate = function () {};

generateUser.addEventListener("click", generateNewUser);
