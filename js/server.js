import express from "express";
import fs from "fs/promises";
import fetch from "node-fetch";

const app = express();

const movieInfo = "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

async function displayMovies() {
  const res = await fetch(movieInfo);
  const movieData = await res.json();
  return movieData.data;
}

app.get("/", async (req, res) => {
  const file = await fs.readFile("index.html");
  const data = await displayMovies();
  const cards = data.map((moviePicture) => {
    return `<img class="cards" src="${moviePicture.attributes.image.url}" alt="">`;
  });

  const page = file.toString().replace("%Hej%", cards.join("\n"));

  res.type("html");
  res.send(page);
});

/* app.get("/", async (req, res) => {
  const file = await fs.readFile("index.html");

  const text = file.toString().replace("%Hej%", "najs");

  res.type("html");
  res.send(text);
}); */

app.use("/static", express.static("./static"));

app.listen(5080);
