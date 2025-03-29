// Definimos una "interfaz" para describir cómo es un objeto Pokémon básico.
// Cada Pokémon de la lista tiene un "name" (nombre) y una "url" (link a más datos).
interface PokemonBasicInfo {
  name: string;
  url: string;
}
// Esta es la estructura de la respuesta de la API que devuelve la lista de Pokémon.
// Solo nos interesa la propiedad "results", que es un array de Pokémon básicos.
interface PokemonAPIResponse {
    results: PokemonBasicInfo[];
  }

  // Creamos una función asíncrona para hacer la petición a la API.
// El tipo Promise<void> indica que la función es asíncrona y no devuelve ningún valor útil (solo hace algo).
async function fetchPokemonList(): Promise<void> {

  try {
    // Hacemos una solicitud HTTP GET a la API con fetch.
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    // Convertimos la respuesta a formato JSON.
    const data: PokemonAPIResponse = await response.json();



    //Seleccionamos el contenedor del HTML (TEST DOM1)
    // const container = document.getElementById("pokemon-container");
    // if (container) {
    //   container.innerHTML = "<p>Cargando Pokémon...</p>";
    // }
    // container.innerHTML = ""; // Limpia el mensaje de carga

     // Seleccionamos el contenedor del HTML
    const container = document.getElementById("pokemon-container");
    if (!container) return;

     container.innerHTML = ""; // Limpia el mensaje de carga

    for (const pokemon of data.results) {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();
    
      const name: string = details.name;
      const imageUrl: string = details.sprites.front_default;
    
      const card = document.createElement("div");
      card.className = "pokemon-card";
      card.innerHTML = `
        <h3>${name}</h3>
        <img src="${imageUrl}" alt="${name}" />
      `;
    
      container.appendChild(card);
    }
    




        // Mostramos los resultados por consola para ver qué hemos obtenido.
        console.log(data.results);
      } catch (error) {
        // Si algo sale mal (por ejemplo, si no hay internet), mostramos el error por consola.
        console.error("Error al obtener los Pokémon:", error);
      }
    }
    // Finalmente, llamamos a la función para que se ejecute.
fetchPokemonList();


