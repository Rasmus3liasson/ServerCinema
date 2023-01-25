import express from "express";

import { marked } from "marked";
import { displayMovie, displayMovies } from "../js/moviesData.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

/* app.engine(
  "ejs",
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
); */

/* async function moviesShow(req, res) {
  const file = await fs.readFile("index.html");
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<a href="/movies/${moviePicture.id}"><img class="picture-container cards" src="${moviePicture.attributes.image.url}" alt="${moviePicture.attributes.imdbId}"></a>`;
  });

  const page = file.toString().replace("%Hej%", cards.join("\n"));

  res.type("html");
  res.send(page);
} */

/* async function staticFiles(res, htmlFile) {
  const file = await fs.readFile("./pages/" + htmlFile);

  res.type("html");
  res.send(file);
} */

app.get("/movies/:id", async (req, res) => {
  const movieID = await displayMovie(req.params.id);
  /*  if (movieID) {
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
  }  */

  if (movieID) {
    const card = `<h1>${movieID.attributes.title}</h1>
    <h3>${movieID.attributes.intro}</h3>
    <img class="cards" src="${movieID.attributes.image.url}" alt="${movieID.attributes.imdbId}">
    
    `;
    res.render("movieInfo", { change: card });
  } else if (!movieID) {
    res.render("template", { change: "Denna film kunde inte hittas" });
  } else {
    res.status(404).end();
  }
});

/* app.get("/", moviesShow); */

app.get("/", async (req, res) => {
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<a href="/movies/${moviePicture.id}"><img class="picture-container cards" src="${moviePicture.attributes.image.url}" alt="${moviePicture.attributes.imdbId}"></a>`;
  });

  res.render("template", { change: cards.join("\n") });
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

app.use("/static", express.static("./static"));
app.use("/js", express.static("./js"));

app.listen(5080);
