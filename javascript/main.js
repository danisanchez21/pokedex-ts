"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Traducciones e iconos para implementar en los tipos de los botones
const typeTranslations = {
    normal: { label: "Normal", hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Normal.svg" },
    fire: { label: "Fuego", hoverClass: "hover:bg-orange-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fire.svg" },
    water: { label: "Agua", hoverClass: "hover:bg-blue-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Water.svg" },
    grass: { label: "Planta", hoverClass: "hover:bg-green-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Grass.svg" },
    electric: { label: "Eléctrico", hoverClass: "hover:bg-yellow-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Electric.svg" },
    ice: { label: "Hielo", hoverClass: "hover:bg-teal-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ice.svg" },
    fighting: { label: "Lucha", hoverClass: "hover:bg-pink-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fighting.svg" },
    poison: { label: "Veneno", hoverClass: "hover:bg-violet-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Poison.svg" },
    ground: { label: "Tierra", hoverClass: "hover:bg-amber-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ground.svg" },
    flying: { label: "Volador", hoverClass: "hover:bg-indigo-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Flying.svg" },
    psychic: { label: "Psíquico", hoverClass: "hover:bg-rose-200 ", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Psychic.svg" },
    bug: { label: "Bicho", hoverClass: "hover:bg-lime-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Bug.svg" },
    rock: { label: "Roca", hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Rock.svg" },
    ghost: { label: "Fantasma", hoverClass: "hover:bg-purple-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Ghost.svg" },
    dark: { label: "Siniestro", hoverClass: "hover:bg-stone-300", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Dark.svg" },
    dragon: { label: "Dragón", hoverClass: "hover:bg-sky-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Dragon.svg" },
    steel: { label: "Acero", hoverClass: "hover:bg-teal-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Steel.svg" },
    fairy: { label: "Hada", hoverClass: "hover:bg-pink-200", iconPath: "./assets/images/icons/Pokemon_Type_Icon_Fairy.svg" }
};
// Función asíncrona que obtiene la lista de los primeros 20 Pokémon y los muestra en tarjetas dentro del contenedor HTML
function fetchPokemonList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hacemos una petición GET a la PokeAPI, con los pokémons de 1ªGEN (151)
            const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            const data = yield response.json();
            // Seleccionamos el contenedor del DOM donde se mostrarán las tarjetas
            const container = document.getElementById("pokemon-container");
            if (!container)
                return;
            // Limpiamos el contenido anterior del contenedor (por si recargamos)
            container.innerHTML = "";
            // Recorremos cada Pokémon de la lista básica
            for (const pokemon of data.results) {
                // Hacemos una nueva petición para obtener los detalles de ese Pokémon
                const detailsResponse = yield fetch(pokemon.url);
                const details = yield detailsResponse.json();
                // Extraemos el nombre y la imagen del Pokémon desde su detalle
                const name = details.name;
                const imageUrl = details.sprites.front_default;
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
            // Mostramos los resultados por consola para depuración
            console.log(data.results);
        }
        catch (error) {
            // Manejamos posibles errores de red o respuesta incorrecta
            console.error("Error al obtener los Pokémon:", error);
        }
    });
}
// Función asíncrona que obtendrá los tipos de pokémon para los botones
function fetchPokemonTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://pokeapi.co/api/v2/type");
            const data = yield response.json();
            // Seleccionamos el contenedor del DOM donde se mostrarán las tarjetas
            const typeContainer = document.getElementById("type-filter");
            if (!typeContainer)
                return;
            typeContainer.innerHTML = ""; //Limpio contenido HTML botones
            // Botón "Todos"
            const allButton = document.createElement("button");
            allButton.textContent = "Todos";
            allButton.className = "px-3 py-1 rounded bg-orange-200 hover:bg-orange-300 text-sm capitalize font-semibold";
            allButton.addEventListener("click", () => {
                fetchPokemonList();
            });
            typeContainer.appendChild(allButton);
            for (const type of data.results) {
                //Creamons un filtro interno para NO mostrar los tipos "Unknown" y "Stellar"
                if (type.name === "unknown" || type.name === "stellar")
                    continue;
                const button = document.createElement("button");
                // Traducción con el icono
                const translation = typeTranslations[type.name];
                const hover = (translation === null || translation === void 0 ? void 0 : translation.hoverClass) || "hover:bg-gray-400";
                // Clases del botón con hover individual
                button.className = `
        px-6 py-3 m-1
        bg-gray-300 ${hover}
        text-lg font-semibold capitalize
        rounded-lg transition flex items-center gap-2 border border-gray-500
      `;
                if (translation) {
                    button.innerHTML = `
          <img src="${translation.iconPath}" alt="${type.name}" class="w-6 h-6 inline mr-2">
          ${translation.label}
        `;
                }
                else {
                    button.textContent = type.name;
                }
                button.addEventListener("click", () => {
                    fetchPokemonByType(type.name);
                });
                //Insertamos el botón en el DOM
                typeContainer.appendChild(button);
            }
        }
        catch (error) {
            console.error("Error al obtener los tipos:", error);
        }
    });
}
// Función asíncrona que mostrará el Pokémon que coincida con el tipo marcado
function fetchPokemonByType(typeName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hacemos una nueva petición para obtener los detalles de ese Pokémon
            const response = yield fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
            const data = yield response.json();
            const container = document.getElementById("pokemon-container");
            if (!container)
                return;
            // Limpiamos el contenido anterior del contenedor (por si recargamos)
            container.innerHTML = "";
            // Recorremos cada Pokémon de la lista básica
            for (const entry of data.pokemon) {
                const pokemonInfo = entry.pokemon;
                // Limitar a los primeros 151 Pokémon (Gen 1)
                const idMatch = pokemonInfo.url.match(/\/pokemon\/(\d+)\//);
                const id = idMatch ? parseInt(idMatch[1]) : 0;
                if (id > 151)
                    continue;
                // Hacemos una nueva petición para obtener los detalles de ese Pokémon
                const detailsResponse = yield fetch(pokemonInfo.url);
                const details = yield detailsResponse.json();
                // Extraemos el nombre y la imagen del Pokémon desde su detalle
                const name = details.name;
                const imageUrl = details.sprites.front_default;
                if (!imageUrl)
                    continue;
                // Creamos dinámicamente una tarjeta con estilos de TailwindCSS
                const card = document.createElement("div");
                card.className = `
        bg-orange-100 border-2 border-purple-300 hover:border-indigo-400
        hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl
        w-44 p-4 flex flex-col items-center justify-between
        transition-all transform hover:scale-105
      `;
                // Insertamos la imagen y el nombre del Pokémon dentro de la card
                card.innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="w-24 h-24 object-contain mb-2">
        <h3 class="text-md font-bold text-gray-800 capitalize">${name}</h3>
      `;
                //Insertamos card en el DOM
                container.appendChild(card);
            }
        }
        catch (error) {
            console.error("Error al obtener Pokémon del tipo:", error);
        }
    });
}
// Llamamos a las funciones iniciales
fetchPokemonList();
fetchPokemonTypes();
