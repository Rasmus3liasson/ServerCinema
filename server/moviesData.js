import fetch from "node-fetch";

const movieInfo = "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

export async function displayMovies() {
  const res = await fetch(movieInfo);
  const movieData = await res.json();
  return movieData.data;
}
export async function displayMovie(id) {
  const res = await fetch(movieInfo + "/" + id);
  const movieData = await res.json();

  return movieData.data;
}
