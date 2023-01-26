import request from "supertest";
import { displayMovie, displayMovies } from "../js/moviesData";

import app from "../js/server";

test("show right title", async () => {
  const movie = displayMovies();

  const response = await request(app)
    .get("/movies:id")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  expect(response.includes());
});

test("home page shows list of movies", async () => {
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
});
