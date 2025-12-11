const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const movieContent = document.getElementById("movie-content");

if (!movieId) {
  alert("ERRO: Sem ID na URL!");
}

async function showDetails() {
  try {
    // 1. Busca dados
    const movieRes = await fetch(
      `${CONFIG.api_base_url}/movie/${movieId}?api_key=${CONFIG.API_KEY}&language=pt-BR`
    );
    const movie = await movieRes.json();

    const providerRes = await fetch(
      `${CONFIG.api_base_url}/movie/${movieId}/watch/providers?api_key=${CONFIG.API_KEY}`
    );
    const providerData = await providerRes.json();
    const brProviders =
      providerData.results && providerData.results.BR
        ? providerData.results.BR
        : null;

    // 2. Chama a renderização
    renderDetails(movie, brProviders);
  } catch (error) {
    console.error("Erro no Fetch:", error);
    movieContent.innerHTML = `<p style="color:red">Erro de conexão: ${error.message}</p>`;
  }
}

function renderDetails(movie, providers) {
  console.log("Iniciando renderização...", movie);

  try {
    if (movie.backdrop_path) {
      document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('${CONFIG.img_base_url}${movie.backdrop_path}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }

    // Gêneros
    let genresHtml = "Sem gênero";
    if (movie.genres && Array.isArray(movie.genres)) {
      genresHtml = movie.genres.map((g) => `<span>${g.name}</span>`).join("");
    }

    // Streaming
    let streamingsHtml = "<p>Não encontrado em streamings no Brasil.</p>";
    if (providers && providers.flatrate) {
      streamingsHtml = providers.flatrate
        .map(
          (p) =>
            `<img src="https://image.tmdb.org/t/p/w200${p.logo_path}" class="provider-logo" title="${p.provider_name}">`
        )
        .join("");
    }

    // Data
    let dataLancamento = "Data desconhecida";
    if (movie.release_date) {
      dataLancamento = movie.release_date.split("-").reverse().join("/");
    }

    // Nota
    let notaFilme = movie.vote_average
      ? Number(movie.vote_average).toFixed(1)
      : "0.0";

    console.log("Dados preparados. Criando HTML...");

    movieContent.innerHTML = `
            <div class="movie-poster">
                <img src="${
                  movie.poster_path
                    ? CONFIG.img_base_url + movie.poster_path
                    : ""
                }" alt="${movie.title}">
            </div>
            <div class="movie-details">
                <h1>${movie.title}</h1>
                <p class="tagline">"${movie.tagline || ""}"</p>
                
                <div class="genres">${genresHtml}</div>
                
                <h3>Sinopse</h3>
                <p>${movie.overview || "Sem sinopse."}</p>

                <div class="providers">
                    <h3>📺 Onde Assistir:</h3>
                    <div class="providers-list">${streamingsHtml}</div>
                </div>
                
                <div class="meta-info">
                    <p>⭐ <strong>Nota:</strong> ${notaFilme}</p>
                    <p>📅 <strong>Lançamento:</strong> ${dataLancamento}</p>
                </div>
            </div>
        `;
  } catch (renderError) {
    console.error("ERRO NA RENDERIZAÇÃO:", renderError);
    movieContent.innerHTML = `<h2 style="color:red">Erro visual: ${renderError.message}</h2>`;
  }
}

showDetails();
