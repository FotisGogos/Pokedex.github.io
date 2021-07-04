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
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button")
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button)
    pokemonList.appendChild(listItem)
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
    item.imageUrlFront = details.sprites.front_default;
    item.imageUrlBack = details.sprites.back_default;
    item.weight = details.weight;
    item.height = details.height;
    item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
  }).catch(function (e) {
    console.error(e);
  });
}

// Show details of pokemon 
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
      showModal(pokemon);
  })
}
// Show modal 
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }
  
    function getAll () {
      return pokemonList;
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
  }); 
}); 





