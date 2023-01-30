import request from "supertest";
import { displayMovies } from "../server/moviesData";

import app from "../server/server";

test("show status code 404", async () => {
  const response = await request(app).get("/movie");

  expect(response.status).toEqual(404);
});

test("Show correct title of movie", async () => {
  const moviesData = await displayMovies();

  for (let j = 0; j < moviesData.length; j++) {
    const response = await request(app)
      .get("/movies/" + moviesData[j].id)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);

    expect(
      response.text.includes(`${moviesData[j].attributes.title}`)
    ).toBeTruthy();
  }
});

test("home page shows pictures of movies", async () => {
  const response = await request(app)
    .get("/")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  expect(
    response.text.includes("https://m.media-amazon.com/images/")
  ).toBeTruthy();
});

test("Encanto page returns Encanto info", async () => {
  const response = await request(app)
    .get("/movies/2")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  expect(response.text.includes("Encanto")).toBeTruthy();
  expect(response.text.includes("Shawshank")).toBeFalsy();
  expect(response.status).toEqual(200);
});
