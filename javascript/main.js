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
// Función asíncrona que obtiene la lista de los primeros 20 Pokémon y los muestra en tarjetas dentro del contenedor HTML
function fetchPokemonList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hacemos una petición GET a la PokeAPI
            const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
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
            typeContainer.innerHTML = ""; //Limpio contenido HTML del contenedor
            for (const type of data.results) {
                const button = document.createElement("button");
                button.textContent = type.name;
                button.className = "px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm capitalize";
                // Event Listener (Click --> Buscará por tipo seleccionado)
                button.addEventListener("click", () => {
                    fetchPokemonByType(type.name);
                });
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
                // Insertamos la imagen y el nombre del Pokémon dentro de la tarjeta
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
