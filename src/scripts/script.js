const API_URL = `${CONFIG.api_base_url}/discover/movie?sort_by=popularity.desc&api_key=${CONFIG.API_KEY}&language=pt-BR`;
const SEARCH_API = `${CONFIG.api_base_url}/search/movie?api_key=${CONFIG.API_KEY}&language=pt-BR&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getMovies = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      showMovies(data.results);
    } else {
      main.innerHTML = `<h2 style="text-align:center; width:100%">Nenhum filme encontrado</h2>`;
    }
  } catch (error) {
    console.error("Erro ao buscar filme: ", error);
  }
};

const showMovies = (movie) => {
  main.innerHTML = "";

  movie.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    if (!poster_path) return;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
    <a href="movie.html?id=${movie.id}">
        <img src = "${CONFIG.img_base_url + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">
            ${vote_average.toFixed(1)}
            </span>
        </div>
        <div class="overview">
            <h3>Sinopse</h3>
            ${overview || "Sinopse indisponível"}
        </div>
    </a>
    `;

    main.appendChild(movieElement);
  });
};

const getClassByRate = (vote) => {
  if (vote >= 8) return "green";
  if (vote >= 5) return "orange";
  return "red";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

getMovies(API_URL);
