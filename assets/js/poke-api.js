const pokeApi = {}

function getPokeApiModels(pokemonDetails) {
    const pokemon = new Pokemon()

    pokemon.name = pokemonDetails.name
    pokemon.number = pokemonDetails.order

    const types = pokemonDetails.types.map((typesSlot) => typesSlot.type.name)
    const [type] = types

    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()).then(getPokeApiModels)
}

pokeApi.getPokemons = (offset = 0, limit = 25) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
            .then((detailsPokemon) => Promise.all(detailsPokemon))
}