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
// Creamos una función asíncrona para hacer la petición a la API.
// El tipo Promise<void> indica que la función es asíncrona y no devuelve ningún valor útil (solo hace algo).
function fetchPokemonList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hacemos una solicitud HTTP GET a la API con fetch.
            const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            // Convertimos la respuesta a formato JSON.
            const data = yield response.json();
            //Seleccionamos el contenedor del HTML (TEST DOM1)
            // const container = document.getElementById("pokemon-container");
            // if (container) {
            //   container.innerHTML = "<p>Cargando Pokémon...</p>";
            // }
            // container.innerHTML = ""; // Limpia el mensaje de carga
            // Seleccionamos el contenedor del HTML
            const container = document.getElementById("pokemon-container");
            if (!container)
                return;
            container.innerHTML = ""; // Limpia el mensaje de carga
            for (const pokemon of data.results) {
                const detailsResponse = yield fetch(pokemon.url);
                const details = yield detailsResponse.json();
                const name = details.name;
                const imageUrl = details.sprites.front_default;
                const card = document.createElement("div");
                //1. Le aplico estilos de Tailwind
                card.className = `
      bg-orange-100 border-2 border-purple-300 hover:border-indigo-400
      hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl
      w-44 p-4 flex flex-col items-center justify-between
      transition-all transform hover:scale-105
    `;
                // card.innerHTML = `
                //   <h3>${name}</h3>
                //   <img src="${imageUrl}" alt="${name}" />
                // `;
                //2. Le aplico estilos de Tailwind
                card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="w-24 h-24 object-contain mb-2">
      <h3 class="text-md font-bold text-gray-800 capitalize">${name}</h3>`;
                container.appendChild(card);
            }
            // Mostramos los resultados por consola para ver qué hemos obtenido.
            console.log(data.results);
        }
        catch (error) {
            // Si algo sale mal (por ejemplo, si no hay internet), mostramos el error por consola.
            console.error("Error al obtener los Pokémon:", error);
        }
    });
}
// Finalmente, llamamos a la función para que se ejecute.
fetchPokemonList();
