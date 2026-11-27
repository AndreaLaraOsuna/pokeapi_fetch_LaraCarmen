
window.onload = () => {
    let botonBuscar = document.getElementById('buscar');
    botonBuscar.onclick = onClickBuscar;
}

function buscarPokemon(nombreNum, callback) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombreNum}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(pokemon => callback(pokemon))
        .catch(error => {
            let messageError = document.createElement("p");

            messageError.innerText = "No se pudo obtener";
            document.body.appendChild(messageError);
        });
}

function onClickBuscar(evento) {
    let buscador = document.getElementsByName('buscador')[0];
    let textoABuscar = buscador.value;

    if (textoABuscar.trim() !== "") {
        buscarPokemon(textoABuscar.trim(), mostrarPokemon);
    }
}

function mostrarPokemon(pokemon) {
    let nombrePokemonElement = document.getElementsByTagName("h2")[0];
    let imgPokemonElement = document.getElementsByTagName("img")[0];
    let dataPokemonElement = document.getElementById("pokemon-data");

    nombrePokemonElement.innerText = pokemon.name;

    imgPokemonElement.src = pokemon.sprites.front_default === null
        ? "https://placehold.co/600x400"
        : pokemon.sprites.front_default;

    dataPokemonElement.innerHTML = `
        <div class='data'><span>Altura:</span>${pokemon.height}</div>
        <div class='data'><span>Peso:</span>${pokemon.weight}</div>
    `;
}
