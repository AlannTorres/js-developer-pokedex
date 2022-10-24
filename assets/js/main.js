const pokemonList = document.getElementById("pokemonlist")
const buttonLoMo = document.getElementById("loreMoreBtn")

const maxRecods = 151
const limit = 5
let offset = 0

function loreMoreItens(offset, limit) {
    function convertPokemonsToList(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonsToList).join(" ")
        pokemonList.innerHTML += newHtml
    })
}

loreMoreItens(offset, limit)

buttonLoMo.addEventListener('click', () => {
    offset += limit
    const qtRecords = offset + limit

    if (qtRecords >= maxRecods) {
        const newLimit = maxRecods - offset
        loreMoreItens(offset, newLimit)

        buttonLoMo.parentElement.removeChild(buttonLoMo)
    } else {
        loreMoreItens(offset, limit)
    }
})
