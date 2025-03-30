// Interfaz para representar la información básica de un Pokémon
// Cada objeto contiene el nombre y la URL para obtener más detalles
interface PokemonBasicInfo {
  name: string;
  url: string;
}

// Interfaz que define la estructura esperada de la respuesta de la API
// Nos interesa principalmente la propiedad "results"
interface PokemonAPIResponse {
  results: PokemonBasicInfo[];
}

// Interfaz que tiene la info básica del tipo de Pokémon
interface PokemonType {
  name: string;
  url: string;
}

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const noResultsMessage = document.getElementById("no-results") as HTMLParagraphElement;

// Traducciones e iconos para implementar en los tipos de los botones asignando colores de hover
const typeTranslations: Record<string, { label: string; iconPath: string; hoverClass: string }> = {
  normal:    { label: "Normal",    hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Normal.svg" },
  fire:      { label: "Fuego",     hoverClass: "hover:bg-orange-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fire.svg" },
  water:     { label: "Agua",      hoverClass: "hover:bg-blue-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Water.svg" },
  grass:     { label: "Planta",    hoverClass: "hover:bg-green-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Grass.svg" },
  electric:  { label: "Eléctrico", hoverClass: "hover:bg-yellow-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Electric.svg" },
  ice:       { label: "Hielo",     hoverClass: "hover:bg-teal-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ice.svg" },
  fighting:  { label: "Lucha",     hoverClass: "hover:bg-pink-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fighting.svg" },
  poison:    { label: "Veneno",    hoverClass: "hover:bg-violet-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Poison.svg" },
  ground:    { label: "Tierra",    hoverClass: "hover:bg-amber-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ground.svg" },
  flying:    { label: "Volador",   hoverClass: "hover:bg-indigo-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Flying.svg" },
  psychic:   { label: "Psíquico",  hoverClass: "hover:bg-rose-200 ", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Psychic.svg" },
  bug:       { label: "Bicho",     hoverClass: "hover:bg-lime-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Bug.svg" },
  rock:      { label: "Roca",      hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Rock.svg" },
  ghost:     { label: "Fantasma",  hoverClass: "hover:bg-purple-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ghost.svg" },
  dark:      { label: "Siniestro", hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Dark.svg" },
  dragon:    { label: "Dragón",    hoverClass: "hover:bg-sky-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Dragon.svg" },
  steel:     { label: "Acero",     hoverClass: "hover:bg-teal-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Steel.svg" },
  fairy:     { label: "Hada",      hoverClass: "hover:bg-pink-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fairy.svg" }
};

// Variables para guardar la lista original y la lista actual mostrada
let allPokemon: PokemonBasicInfo[] = [];
let currentPokemonList: PokemonBasicInfo[] = [];

// Función asíncrona que renderiza la lista de pokémon pasada por parámetro como cards en el DOM
async function renderPokemonCards(pokemonList: PokemonBasicInfo[]): Promise<void> {
  const container = document.getElementById("pokemon-container");
  if (!container) return;

  // Limpiamos el contenido anterior del contenedor (por si recargamos)
  container.innerHTML = "";

  // Recorremos cada Pokémon de la lista básica
  for (const pokemon of pokemonList) {

    const detailsResponse = await fetch(pokemon.url);
    const details = await detailsResponse.json();

    // Extraemos el nombre y la imagen del Pokémon desde su detalle
    const name: string = details.name;
    const imageUrl: string | null = details.sprites.front_default;
    if (!imageUrl) continue;

      // Creamos dinámicamente una tarjeta con estilos de TailwindCSS
    const card = document.createElement("div");
    card.className = `
      bg-orange-100 border-2 border-purple-300 hover:border-indigo-400
      hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl
      w-44 p-4 flex flex-col items-center justify-between
      transition-all transform hover:scale-105
    `;

    // Insertamos la imagen y el nombre del Pokémon dentro de la tarjeta
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="w-24 h-24 object-contain mb-2">
      <h3 class="text-md font-bold text-gray-800 capitalize">${name}</h3>
    `;

    // Añadimos la tarjeta al contenedor principal en el DOM
    container.appendChild(card);
  }

  // Ocultamos el mensaje de no resultados si hay al menos un Pokémon
  // noResultsMessage.classList.toggle("hidden", pokemonList.length > 0);
}

// Función asíncrona que obtiene la lista de los primeros 151 Pokémon y los muestra en tarjetas dentro del contenedor HTML
async function fetchPokemonList(): Promise<void> {
  try {

     // Hacemos una petición GET a la PokeAPI, con los pokémons de 1ªGEN (151)
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data: PokemonAPIResponse = await response.json();

    allPokemon = data.results;
    currentPokemonList = data.results;

    await renderPokemonCards(currentPokemonList);
    searchInput.value = "";

  } catch (error) {
    // Manejamos posibles errores de red o respuesta incorrecta
    console.error("Error al obtener los Pokémon:", error);
  }
}

// Función asíncrona que obtendrá los tipos de pokémon para generar los botones
async function fetchPokemonTypes(): Promise<void> {
  try {

    // Hacemos una petición HTTP GET a la URL que devuelve todos los tipos de Pokémon
    const response = await fetch("https://pokeapi.co/api/v2/type");

    // Convertimos la respuesta en un objeto JavaScript (JSON)
    const data = await response.json();

    // Obtenemos el contenedor del DOM donde se insertarán los botones de tipo
    const typeContainer = document.getElementById("type-filter");

    // Si por algún motivo no se encuentra el contenedor (por ejemplo, error en el HTML), salimos de la función
    if (!typeContainer) return;

    // Limpiamos cualquier contenido anterior dentro del contenedor, por si ya había botones
    typeContainer.innerHTML = "";

    // Creamos el botón que sirve para reiniciar el filtro y mostrar todos los Pokémon
    const allButton = document.createElement("button");

    // Establecemos el texto del botón
    allButton.textContent = "Todos";

    // Aplicamos las clases de TailwindCSS para estilo y hover
    allButton.className = "px-3 py-1 rounded bg-orange-200 hover:bg-orange-300 text-sm capitalize font-semibold";

    // Añadimos el evento click para que, al pulsarlo, se recargue la lista completa de Pokémon
    allButton.addEventListener("click", () => fetchPokemonList());

    // Insertamos este botón al inicio del contenedor
    typeContainer.appendChild(allButton);

  // Iteramos sobre cada tipo recibido desde la API (data.results)
    for (const type of data.results) {

      // Filtramos manualmente los tipos "unknown" y "stellar", que no pertenecen a la 1ª generación
      if (type.name === "unknown" || type.name === "stellar") continue;

      // Creamos dinámicamente un botón HTML para ese tipo
      const button = document.createElement("button");

      // Obtenemos la traducción personalizada del tipo (nombre en ESP, icono y color de hover)
      const translation = typeTranslations[type.name];

      // Si el tipo no tiene traducción, usamos un hover por defecto
      const hover = translation?.hoverClass || "hover:bg-gray-400";

      // Aplicamos las clases para diseño responsive y estilos de TailwindCSS
      button.className = `
        px-6 py-3 m-1
        bg-gray-300 ${hover}
        text-lg font-semibold capitalize
        rounded-lg transition flex items-center gap-2 border border-gray-500
      `;

      // Si existe traducción para ese tipo, usamos icono + la etiqueta en ESP
      if (translation) {
        button.innerHTML = `
          <img src="${translation.iconPath}" alt="${type.name}" class="w-6 h-6 inline mr-2">
          ${translation.label}
        `;
      } else {
        // Si no hay traducción, mostramos el nombre tal como lo da la API
        button.textContent = type.name;
      }

      // Se llama a la función que filtra Pokémon por ese tipo
      button.addEventListener("click", () => fetchPokemonByType(type.name));

      // Insertamos el botón en el contenedor de tipos
      typeContainer.appendChild(button);
    }
  } catch (error) {

    console.error("Error al obtener los tipos:", error);
  }


  searchInput.value = "";

  // Ocultamos el mensaje de "no encontrado" cuando se cambia de tipo
  noResultsMessage.classList.add("hidden");
}

// Función asíncrona que mostrará el Pokémon que coincida con el tipo marcado
async function fetchPokemonByType(typeName: string): Promise<void> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    const data = await response.json();

    const filteredList: PokemonBasicInfo[] = [];

    for (const entry of data.pokemon) {
      const pokemonInfo = entry.pokemon;
      const idMatch = pokemonInfo.url.match(/\/pokemon\/(\d+)\//);
      const id = idMatch ? parseInt(idMatch[1]) : 0;
      if (id > 151) continue;

      filteredList.push(pokemonInfo);
    }

    currentPokemonList = filteredList;
    await renderPokemonCards(filteredList);
    searchInput.value = "";
  } catch (error) {
    console.error("Error al obtener Pokémon del tipo:", error);
  }
}

// NUEVA ESTRUCTURA BUSCADOR
searchInput.addEventListener("input", async () => {
  const query = searchInput.value.toLowerCase();

  const filtered = currentPokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query)
  );

  // Mostrar u ocultar mensaje de error
  if (filtered.length === 0) {
    noResultsMessage.classList.remove("hidden");
  } else {
    noResultsMessage.classList.add("hidden");
  }

  await renderPokemonCards(filtered);
});


// Funciones de inicio agrupadas
async function init(): Promise<void> {
  await fetchPokemonList();
  await fetchPokemonTypes();
}

init();
