// Interfaz para representar la información básica de un Pokémon.
// Cada objeto contiene el nombre y la URL para obtener más detalles.
interface PokemonBasicInfo {
  name: string;
  url: string;
}

// Interfaz que define la estructura esperada de la respuesta de la API.
// Nos interesa principalmente la propiedad "results".
interface PokemonAPIResponse {
  results: PokemonBasicInfo[];
}

// Función asíncrona que obtiene la lista de los primeros 20 Pokémon y los muestra en tarjetas dentro del contenedor HTML.
async function fetchPokemonList(): Promise<void> {
  try {
    // Hacemos una petición GET a la PokeAPI.
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data: PokemonAPIResponse = await response.json();

    // Seleccionamos el contenedor del DOM donde se mostrarán las tarjetas.
    const container = document.getElementById("pokemon-container");
    if (!container) return;

    // Limpiamos el contenido anterior del contenedor (por si recargamos).
    container.innerHTML = "";

    // Recorremos cada Pokémon de la lista básica.
    for (const pokemon of data.results) {
      // Hacemos una nueva petición para obtener los detalles de ese Pokémon.
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      // Extraemos el nombre y la imagen del Pokémon desde su detalle.
      const name: string = details.name;
      const imageUrl: string = details.sprites.front_default;

      // Creamos dinámicamente una tarjeta con estilos de TailwindCSS.
      const card = document.createElement("div");
      card.className = `
        bg-orange-100 border-2 border-purple-300 hover:border-indigo-400
        hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl
        w-44 p-4 flex flex-col items-center justify-between
        transition-all transform hover:scale-105
      `;

      // Insertamos la imagen y el nombre del Pokémon dentro de la tarjeta.
      card.innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="w-24 h-24 object-contain mb-2">
        <h3 class="text-md font-bold text-gray-800 capitalize">${name}</h3>
      `;

      // Añadimos la tarjeta al contenedor principal en el DOM.
      container.appendChild(card);
    }

    // Mostramos los resultados por consola para depuración.
    console.log(data.results);
  } catch (error) {
    // Manejamos posibles errores de red o respuesta incorrecta.
    console.error("Error al obtener los Pokémon:", error);
  }
}

// Llamamos a la función principal para iniciar el proceso.
fetchPokemonList();
