import express from "express";

import { marked } from "marked";
import { displayMovie, displayMovies } from "../js/moviesData.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/movies/:id", async (req, res) => {
  const movieID = await displayMovie(req.params.id);

  if (movieID) {
    const card = `<div class="movieInfo">
    <div class="text"><h1>${movieID.attributes.title}</h1>
      <h3>${marked.parse(movieID.attributes.intro)}</h3></div>
      <img class="cards" src="${movieID.attributes.image.url}" alt="${
      movieID.attributes.imdbId
    }"></div>
  <div class="movie-info-button">
  <button><a href="/">Tillbaka till filmerna</a></button>
  </div>
    `;
    res.render("movieInfo", { change: card });
  } else if (!movieID) {
    res.status(404).render("error", {
      change: "Denna film kunde inte hittas",
    });
  }
});

app.get("/", async (req, res) => {
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<a href="/movies/${moviePicture.id}"><img class="picture-container cards" src="${moviePicture.attributes.image.url}" alt="${moviePicture.attributes.imdbId}"></a>`;
  });

  res.render("layout", { change: cards.join("\n") });
});

app.get("/pages/about", async (req, res) => {
  res.render("about");
});
app.get("/pages/bistro-menu", async (req, res) => {
  res.render("bistro-menu");
});
app.get("/pages/booking", async (req, res) => {
  res.render("booking");
});
app.get("/pages/giftCard", async (req, res) => {
  res.render("giftCard");
});
app.get("/pages/matiné", async (req, res) => {
  res.render("matine");
});
app.get("/pages/newsletter", async (req, res) => {
  res.render("newsletter");
});
app.get("/pages/openingHours", async (req, res) => {
  res.render("openingHours");
});
app.get("/pages/premiereFriday", async (req, res) => {
  res.render("premierFriday");
});
app.get("/pages/ticket-info", async (req, res) => {
  res.render("ticketInfo");
});
app.get("/pages/upcoming", async (req, res) => {
  res.render("upcoming");
});
app.get("/pages/wholeProgramPage", async (req, res) => {
  res.render("wholeProgram");
});

app.get("/:movies", async (req, res) => {
  const pagePath = req.params.movies;
  if (pagePath != "movies/") {
    res.status(404).end();
  }
});

app.use("/static", express.static("./static"));
app.use("/js", express.static("./js"));

app.listen(5080);

export default app;
