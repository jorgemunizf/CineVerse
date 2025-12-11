const API_URL = `${CONFIG.api_base_url}/discover/movie?sort_by=popularity.desc&api_key=${CONFIG.API_KEY}&language=pt-BR`;
const SEARCH_API = `${CONFIG.api_base_url}/search/movie?api_key=${CONFIG.API_KEY}&query="`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getMovies = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("4. Resposta COMPLETA da API: ", data);

    if (data.results) {
      showMovies(data.results);
    } else {
      // Se entrar aqui, é porque a API deu erro (ex: chave inválida)
      console.error("ERRO DA API:", data);

      // Mostra o erro na tela para você saber o que houve
      const errorMsg = data.status_message || "Erro desconhecido na API";
      document.getElementById(
        "main"
      ).innerHTML = `<h2 style="color:red; text-align:center">Erro da API: ${errorMsg}</h2>`;
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
    <img src = "${CONFIG.img_base_url + poster_path}" alt="${title}">
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">
    ${vote_average}
    </span>
    </div>
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
    window.location.reload;
  }
});
