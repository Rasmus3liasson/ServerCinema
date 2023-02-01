import express from "express";

import { marked } from "marked";
import { displayMovie, displayMovies } from "./moviesData.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

// serv ejs

app.get("/movies/:id", async (req, res) => {
  const movieID = await displayMovie(req.params.id);

  if (movieID) {
    const card = `<div class="movieInfo">
    <div class="text"><h1>${movieID.attributes.title}</h1>
      ${marked.parse(movieID.attributes.intro)}</div>
      <img class="cards" src="${movieID.attributes.image.url}" alt="${
      movieID.attributes.imdbId
    }"></div>
  <div class="movie-info-button">
  <button><a href="/">Tillbaka till filmerna</a></button>
  <button><a href="/booking">Boka film</a></button>
  </div>
    `;
    res.render("movieInfo", { change: card });
  } else if (!movieID) {
    res.status(404).render("error", {
      change: "Denna film kunde inte hittas status 404!",
    });
  }
});

app.get("/", async (req, res) => {
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<ul>
    <li><a href="/movies/${moviePicture.id}"><img class="picture-container cards" src="${moviePicture.attributes.image.url}" alt="${moviePicture.attributes.imdbId}"></a></li>
  </ul>`;
  });

  res.render("layout", {
    change: cards.join("\n"),
  });
});

app.get("/about", async (req, res) => {
  res.render("about");
});
app.get("/bistro-menu", async (req, res) => {
  res.render("bistro-menu");
});
app.get("/booking", async (req, res) => {
  res.render("booking");
});
app.get("/giftCard", async (req, res) => {
  res.render("giftCard");
});
app.get("/matiné", async (req, res) => {
  res.render("matine");
});
app.get("/newsletter", async (req, res) => {
  res.render("newsletter");
});
app.get("/openingHours", async (req, res) => {
  res.render("openingHours");
});
app.get("/premiereFriday", async (req, res) => {
  res.render("premierFriday");
});
app.get("/ticket-info", async (req, res) => {
  res.render("ticketInfo");
});
app.get("/upcoming", async (req, res) => {
  res.render("upcoming");
});
app.get("/wholeProgramPage", async (req, res) => {
  res.render("wholeProgram");
});

// status 404 if "id" don't exist.

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
