let pokemonRepository = (function () {
let pokemonList = [{name:  "Bulbasaur",  height: 0.7,  types:  ['grass', 'poison']},
                        {name:  "Squirtl",  height: 0.5,  types:  ['water']},
                        {name:  "Slowpoke", height: 1.2,  types: ['psychic', 'water']}];

  function add(item) {
    if(typeof item === 'object'){
      pokemonList.push(item);
    }else{
      console.log("Invalid Pokemon. Please give an object.")
    }
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name
    button.classList.add("button-class")
    addEventListenerToButton(button, pokemon)

    listPokemon.appendChild(button)
    pokemonList.appendChild(listPokemon)
  }

  function addEventListenerToButton(button, pokemon){
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonList = pokemonRepository.getAll()
pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + pokemon.height );
});

console.log(pokemonRepository.getAll())
pokemonRepository.add({name: "Mew", height: 1.3, types: [ "poison" ]});
console.log(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon)
}); 
