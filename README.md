# 🎬 CineVerse - Explorador de Filmes e Streaming

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)
![Badge HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Badge JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 💻 Sobre o Projeto

O **CineVerse** é uma aplicação web interativa desenvolvida para facilitar a descoberta de filmes e series. Diferente de listas estáticas, o projeto consome a API do **TMDB (The Movie Database)** para trazer dados em tempo real sobre lançamentos, sinopses, notas e, principalmente, **onde assistir (streaming)** no Brasil.

O objetivo principal foi consolidar conhecimentos em **JavaScript Vanilla (ES6+)**, manipulação avançada do DOM e consumo de APIs REST sem o uso de frameworks, demonstrando domínio da base da programação web.

---

## 📸 Screenshots

|           Tela Inicial (Catálogo)            |
| :------------------------------------------: |
| ![Home CineVerse](src/assets/print-home.png) |
| _Visualização em Grid com hover interativo_  |

|                  Detalhes do Filme                  |
| :-------------------------------------------------: |
| ![Detalhes CineVerse](src/assets/print-details.png) |
|    _Informações completas e links de streaming_     |

---

## ✨ Funcionalidades

- 🚀 **Catálogo Atualizado:** Exibe filmes que estão disponíveis em serviços de streaming (Netflix, Prime, Disney+) no Brasil.
- 🔍 **Busca em Tempo Real:** Sistema de pesquisa integrado à API.
- 📄 **Página de Detalhes:** Roteamento dinâmico via URL parameters (`?id=123`) para exibir informações profundas do filme.
- 📺 **Onde Assistir:** Integração com _Watch Providers_ para mostrar em qual streaming o filme está disponível.
- 📱 **Design Responsivo:** Layout fluido utilizando **CSS Grid** e **Flexbox**, adaptável para Mobile e Desktop.
- ✨ **UI/UX Moderno:** Efeito "Glassmorphism", transições suaves e tratamento de erros visuais.

---

## 🛠 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica.
- **CSS3:** Variáveis CSS (`var(--color)`), Grid Layout, Flexbox e Media Queries.
- **JavaScript (ES6+):**
  - `fetch` API com `async/await`.
  - Manipulação do DOM.
  - Módulos e organização de código.
  - Tratamento de erros (`try/catch`).

---

## 🚀 Como rodar o projeto

### Pré-requisitos

Você precisará de uma chave de API do [TMDB](https://www.themoviedb.org/documentation/api) (é gratuita).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/cineverse.git
   ```

2. **Configure a API:**
   Crie um arquivo chamado src/scripts/config.js e adicione sua chave:
   ```bash
   const CONFIG = {
    API_KEY: 'SUA_CHAVE_AQUI',
    api_base_url: 'https://api.themoviedb.org/3',
    img_base_url: 'https://image.tmdb.org/t/p/w1280'
};
   ```
   
