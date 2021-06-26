let pokemonRepository = (function () {
  let pokemonList = [];
  // API link
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

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
      // Load list of pokemons without details 
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Load list of pokemons with details 

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addEventListenerToButton(button, pokemon){
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
  }); 
}); 
