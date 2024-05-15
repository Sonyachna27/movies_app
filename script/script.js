const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJmNmNkMGE3MDBjMmE3OTk1NDkzZDBiZjIyODRkOSIsInN1YiI6IjY2MzhhNTE5ODEzY2I2MDEyMTg5ODFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q9GOGhPhrTgYjGwBrki4UNQ2ZhH5snqGCIxaFUlOMvI",
  },
};

let allMovies = [];
let numberPage = 1;

const loadPage = (page) => {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key={322f6cd0a700c2a7995493d0bf2284d9}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      allMovies = [...allMovies, ...movies];

      createNewMovieCard(movies);
    })
    .catch((err) => console.error(err));
};

const movieContainer = document.getElementById("movie-list");

function createNewMovieCard(movies) {
  movies.forEach((movie) => {
    const createMovieCard = document.createElement("div");
    createMovieCard.classList.add("movie");
    const movieCardTitle = document.createElement("div");
    movieCardTitle.classList.add("movie_title");
    movieCardTitle.textContent = movie.title;

    const movieCardDescription = document.createElement("div");
    movieCardDescription.classList.add("movie_descr");
    movieCardDescription.textContent = movie.overview;

    const playLink = document.createElement("a");
    playLink.classList.add("btn");
    playLink.dataset.movieId = movie.id;
    playLink.classList.add("play_btn");
    playLink.href = `http://127.0.0.1:5500/single-movie.html?movieId=${movie.id}`;
    playLink.textContent = "More...";

    const movieImageLink = document.createElement("a");
    movieImageLink.href = "#";
    movieImageLink.classList.add("movie_image");

    const movieImage = document.createElement("img");

    movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieImage.alt = movie.title;

    movieImageLink.appendChild(movieImage);
    createMovieCard.appendChild(movieCardTitle);
    createMovieCard.appendChild(movieCardDescription);

    createMovieCard.appendChild(movieImageLink);
    createMovieCard.appendChild(playLink);

    movieContainer.appendChild(createMovieCard);

    playLink.addEventListener("click", (event) => {
      const selectedMovieId = playLink.dataset.movieId;
      showMovieInfo(selectedMovieId)
        .then(() => {
          window.location.href = `https://sonyachna27.github.io/movies_app/single-movie.html?movieId=${selectedMovieId}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
}

const loadMore = document.querySelector(".loadMore");
if (loadMore) {
  loadMore.addEventListener("click", () => {
    numberPage++;
    loadPage(numberPage);
  });

  loadPage(numberPage);
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get("movieId");

if (movieId != null) {
  const showMovieInfo = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key={322f6cd0a700c2a7995493d0bf2284d9}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const filmData = data;
        createNewMovie(filmData);
      })
      .catch((err) => console.error(err));
  };

  const singleMoveWrap = document.getElementById("movie-page");
  function createNewMovie(filmData) {
    const createMovieWrap = document.createElement("div");
    createMovieWrap.classList.add("single-movie");

    const movieTitle = document.createElement("h1");
    movieTitle.textContent = filmData.title;

    const movieOverview = document.createElement("p");
    movieOverview.textContent = filmData.overview;
    const genresList = document.createElement("ul");
    const genresName = filmData.genres;
    genresName.forEach((genre) => {
      let genresItem = document.createElement("li");
      let genresItemLink = document.createElement("a");
      genresItemLink.textContent = genre.name;
      genresItem.appendChild(genresItemLink);
      genresList.appendChild(genresItem);
    });

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${filmData.poster_path}`;
    moviePoster.alt = filmData.title;

    createMovieWrap.appendChild(movieTitle);
    createMovieWrap.appendChild(genresList);

    createMovieWrap.appendChild(moviePoster);
    createMovieWrap.appendChild(movieOverview);

    singleMoveWrap.appendChild(createMovieWrap);
  }

  const showVideoMovie = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key={322f6cd0a700c2a7995493d0bf2284d9}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const videos = data.results;
        let videoKey;
        if (videos.length > 0) {
          const findId = () => {
            for (let i = 0; i < videos.length; i++) {
              if (videos[i].name == "Official Teaser") {
                videoKey = videos[i].key;
                return;
              }
            }
            videoKey = videos[0].key;
          };
          findId();

          const videoUrl = `https://www.youtube.be/watch?v=${videoKey}`;

          createVideoPlayer(videoUrl);
        } else {
          console.error("Відео не знайдено");
        }
      })
      .catch((err) => console.error(err));
  };

  const createVideoPlayer = (videoUrl) => {
    const createVideoPlayer = document.createElement("div");
    const createYoutubeLink = document.createElement("a");
    createYoutubeLink.classList.add("link");
    createYoutubeLink.href = videoUrl;
    createYoutubeLink.textContent = "Watch on You Tube";
    createVideoPlayer.appendChild(createYoutubeLink);
    singleMoveWrap.appendChild(createVideoPlayer);
  };

  showMovieInfo(movieId);
  showVideoMovie(movieId);
}
