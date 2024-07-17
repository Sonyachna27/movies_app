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
		createMovieCard.innerHTML = `

		<div class="movie_title">${movie.title}</div>
		<div class="movie_descr">${movie.overview}</div>
		<a href="#" class="movie_image">
		<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
		</a>
		<a class="btn play_btn" data-movie-id="${movie.id}" href="./single-movie.html?movieId=${movie.id}">More...</a>`
    movieContainer.appendChild(createMovieCard);

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
		function createGenresList(genresName) {
			const genresList = document.createElement('ul');
			genresName.forEach((genre) => {
				const createGenresItem = document.createElement('li');
				const createGenresItemLink = document.createElement('a');
				createGenresItemLink.innerText = genre.name;
				createGenresItem.appendChild(createGenresItemLink);
				createGenresItem.appendChild(createGenresItemLink);
				genresList.appendChild(createGenresItem);
			});
			return genresList; 
		}
	
		const createMovieWrap = document.createElement("div");
		createMovieWrap.classList.add("single-movie");
	
		const genresName = filmData.genres;
		const genresList = createGenresList(genresName);
	
		createMovieWrap.innerHTML = `
			<h1>${filmData.title}</h1>
			<p>${filmData.overview}</p>
			<img src="https://image.tmdb.org/t/p/w500/${filmData.poster_path}" alt="test" />
		`;
	
		createMovieWrap.appendChild(genresList);
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
    createYoutubeLink.textContent = "Watch preview on  YouTube";
    createVideoPlayer.appendChild(createYoutubeLink);
    singleMoveWrap.appendChild(createVideoPlayer);
  };

  showMovieInfo(movieId);
  showVideoMovie(movieId);
}
