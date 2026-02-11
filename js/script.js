// URL base da API
const BASE_URL = "https://rickandmortyapi.com/api";

// Pegando elementos do DOM
const input = document.getElementById("nameInput");
const button = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const statusText = document.getElementById("status");


// Função genérica para buscar dados
async function fetchData(endpoint, filters = {}) {
  
  // Criando URL dinâmica
  const url = new URL(`${BASE_URL}/${endpoint}`);

  // Adicionando query params
  Object.keys(filters).forEach(key => {
    url.searchParams.append(key, filters[key]);
  });

  try {
    // Mostra loading
    statusText.textContent = "Carregando...";

    // Faz requisição
    const response = await fetch(url);

    // Verifica se deu erro HTTP
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    // Converte resposta para JSON
    const data = await response.json();

    statusText.textContent = "";
    return data;

  } catch (error) {
    statusText.textContent = "Erro ao buscar dados.";
    console.error(error);
    return null;
  }
}


// Função para renderizar personagens
function renderCharacters(characters) {

  // Limpa resultados anteriores
  resultsDiv.innerHTML = "";

  characters.forEach(character => {
    
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" width="150" />
      <p>Status: ${character.status}</p>
      <hr>
    `;

    resultsDiv.appendChild(card);
  });
}


// Evento de clique
button.addEventListener("click", async () => {

  const name = input.value.trim();

  if (!name) {
    alert("Digite um nome primeiro.");
    return;
  }

  const data = await fetchData("character", { name });

  if (data && data.results) {
    renderCharacters(data.results);
  }
});
