const btn = document.getElementById("joke-btn");

function getNewJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.chucknorris.io/jokes/random");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const joke = document.getElementById("joke");
      joke.innerHTML = `${data.value}`;
    }
  };
  xhr.send();
}

btn.addEventListener("click", getNewJoke);
