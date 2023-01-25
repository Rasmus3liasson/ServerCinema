import express from "express";
import fs from "fs/promises";
import fetch from "node-fetch";

const app = express();

const movieInfo = "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

async function file(req, res) {
  const file = await fs.readFile("index.html");
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<a href="/movies/${moviePicture.id}"><img class="picture-container cards" src="${moviePicture.attributes.image.url}" alt="${moviePicture.attributes.imdbId}"></a>`;
  });

  const page = file.toString().replace("%Hej%", cards.join("\n"));

  res.type("html");
  res.send(page);
}

async function displayMovies() {
  const res = await fetch(movieInfo);
  const movieData = await res.json();
  return movieData.data;
}
async function displayMovie(id) {
  const res = await fetch(movieInfo + "/" + id);
  const movieData = await res.json();

  return movieData.data;
}

app.get("/movies/:id", async (req, res) => {
  const movieID = await displayMovie(req.params.id);
  if (movieID) {
    const file = await fs.readFile("./pages/card.html");
    const card = `<h1>${movieID.attributes.title}</h1>
    <h3>${movieID.attributes.intro}</h3>
    <img class="cards" src="${movieID.attributes.image.url}" alt="${movieID.attributes.imdbId}">
    
    `;
    const page = file.toString().replace("%Card%", card);
    res.type("html");
    res.send(page);
  } else if (!movieID) {
    res.status(404).end();
  }
});

app.get("/", file);

async function staticFiles(res, htmlFile) {
  const file = await fs.readFile("./pages/" + htmlFile);

  res.type("html");
  res.send(file);
}

app.get("/pages/about", async (req, res) => {
  await staticFiles(res, "about.html");
});
app.get("/pages/bistro-menu", async (req, res) => {
  await staticFiles(res, "bistro-menu.html");
});
app.get("/pages/booking", async (req, res) => {
  await staticFiles(res, "booking.html");
});
app.get("/pages/giftCard", async (req, res) => {
  await staticFiles(res, "giftCard.html");
});
app.get("/pages/matiné", async (req, res) => {
  await staticFiles(res, "matiné.html");
});
app.get("/pages/newsletter", async (req, res) => {
  await staticFiles(res, "newsletter.html");
});
app.get("/pages/openingHours", async (req, res) => {
  await staticFiles(res, "openingHours.html");
});
app.get("/pages/premiereFriday", async (req, res) => {
  await staticFiles(res, "premiereFriday.html");
});
app.get("/pages/ticket-info", async (req, res) => {
  await staticFiles(res, "ticket-info.html");
});
app.get("/pages/upcoming", async (req, res) => {
  await staticFiles(res, "upcoming.html");
});
app.get("/pages/wholeProgramPage", async (req, res) => {
  await staticFiles(res, "wholeProgramPage.html");
});

app.use("/static", express.static("./static"));

app.listen(5080);
