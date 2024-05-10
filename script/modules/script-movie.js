// import { options } from "./script-home";

// const loadPage = (page) => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key={322f6cd0a700c2a7995493d0bf2284d9}`,
//     options
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const movie = data.results;
//       console.log(movie);
//       //   allMovies = [...allMovies, ...movies];

//       //   createNewMovieCard(movies);
//     })
//     .catch((err) => console.error(err));
// };

// function createNewMovieCard(movies) {
//   const movieContainer = document.getElementById("movie-list");
//   movies.forEach((movie) => {
//     const createMovieCard = document.createElement("div");
//     createMovieCard.classList.add("movie");
//     const movieCardTitle = document.createElement("div");
//     movieCardTitle.classList.add("movie_title");
//     movieCardTitle.textContent = movie.title;

//     const movieCardDescription = document.createElement("div");
//     movieCardDescription.classList.add("movie_descr");
//     movieCardDescription.textContent = movie.overview;

//     const playLink = document.createElement("a");
//     playLink.classList.add("btn");
//     playLink.classList.add("play_btn");
//     playLink.href = "#";
//     playLink.textContent = "Play";

//     const movieImageLink = document.createElement("a");
//     movieImageLink.href = "#";
//     movieImageLink.classList.add("movie_image");

//     const movieImage = document.createElement("img");

//     movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
//     movieImage.alt = movie.title;
//     movieImageLink.appendChild(movieImage);
//     createMovieCard.appendChild(movieCardTitle);
//     createMovieCard.appendChild(movieCardDescription);

//     createMovieCard.appendChild(movieImageLink);
//     createMovieCard.appendChild(playLink);

//     movieContainer.appendChild(createMovieCard);
//   });
// }
// loadPage(numberPage);

// const loadMore = document.querySelector(".loadMore");

// loadMore.addEventListener("click", () => {
//   numberPage++;
//   loadPage(numberPage);
// });
