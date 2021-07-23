const BASE_API = "https://pokeapi.co/api/v2";

class Api {
    async getRegion(){
      const response = await fetch(`${BASE_API}/region`);
      const responseData = await response.json();
      if (!response.ok) {
        console.log("error",err);
        return err
      }
      return responseData.results;
    }

    async getPokemonByRegion(region){
      const regionData = await fetch(region.url);
      const dataResponse = await regionData.json();
      let tempArr = [];

    const mainGeneration = await fetch(`${dataResponse['main_generation']?.url}`);
    const mainGenerationResData = await mainGeneration.json();

    const pokemonSpecie = await Promise.all(
      mainGenerationResData['pokemon_species']?.map(async (entry) => {
        const pokemonSpecie = await fetch(entry?.url);
        const pokemonSpecieResData = await pokemonSpecie.json();

        return {
          description: pokemonSpecieResData['flavor_text_entries']?.find(
            (entry) => entry.language.name === 'en',
          )['flavor_text'],
          id: pokemonSpecieResData.id,
          name: pokemonSpecieResData.name,
        };
      }),
    );

    tempArr = pokemonSpecie;

    const finalPokemonData = await Promise.all(
      tempArr.map(async (pokemon) => {
        const pokemonData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        );
        const pokemonResData = await pokemonData.json();

        return pokemon.id === pokemonResData.id
          ? {
              ...pokemon,
              image: pokemonResData.sprites['front_default'],
              types: pokemonResData.types,
            }
          : pokemon;
      }),
    );
      return finalPokemonData.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
}

export default new Api();
