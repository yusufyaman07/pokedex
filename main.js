const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

const pokeContainer = document.getElementById("pokeContainer");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const pokemon_count = 151;

// Search Function
const searchPokemon = () => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".pokemon");

  pokemonCards.forEach((card) => {
    const name = card.querySelector(".poke-name").textContent.toLowerCase();
    if (name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// * Search button and input events
searchBtn.addEventListener("click", searchPokemon);
searchInput.addEventListener("input", searchPokemon);

// * Fetch Pokemon data
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = pokemonBg;

  const pokemonInnerHTML = `
    <div class="image-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        pokemon.id
      }.png" 
           alt="${pokemon.name}">
    </div>
    <div class="poke-info">
      <span class="poke-id">#${pokemonId}</span>
      <h3 class="poke-name">${pokemon.name}</h3>
      <div class="poke-stats">
        <div class="poke-stat">
          <i class="fas fa-bolt"></i>
          <span>${pokemon.base_experience} Exp</span>
        </div>
        <div class="poke-stat">
          <i class="fas fa-weight-hanging"></i>
          <span>${pokemon.weight / 10} kg</span>
        </div>
      </div>
      <div class="poke-type">
        <i class="fas fa-tag"></i>
        <span>${pokemonType}</span>
      </div>
    </div>
  `;

  pokemonDiv.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();
