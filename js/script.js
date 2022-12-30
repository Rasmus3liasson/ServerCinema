// adding cards to frontpage
let movies;

let div = document.querySelector(".picture-container");
let li;
let movieTitle = document.querySelector(".title");

async function displayCards() {
  let res = await fetch("src/movies.json");
  let data = await res.json();

  li = data.movies;

  li.forEach(function (movieAll) {
    let img = document.createElement("img");
    img.setAttribute("src", movieAll.posterImageUrl);
    img.setAttribute("alt", "Hej");
    img.classList.add("cards");
    div.append(img);
    console.log(img);

    //display info when click
    img.addEventListener("click", function () {
      for (i = 0; i < li4; i++) {
        hej.innerText = JSON.stringify(movieAll.genre);
        hej.innerText = JSON.stringify(movieAll.genre);
      }
    });
  });
}
displayCards();
