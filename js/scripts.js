let pokemonRepository = (function () {

    modalContainer.innerHTML = '';

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let modal = document.createElement('div');
    modal.classList.add('modal');


    let pokName = document.createElement('h1');
    pokName.innerHTML = pokemon.name ('pokName');

    let pokHeight = document.createElement ('p');
    pokHeight.innerHTML = pokemon.height ('pokHeight');

    let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');

    let pokImage = document.createElement('img');
    pokImage.classList.add('pokImage');

    let pokType = document.createElement('p');
    pokType.classList.add('poktype');

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal();
    });
  
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

  function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  }


  //Hide Modal Event Listeners

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
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
      item.types = details.types.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addEventListenerToButton(button, pokemon){
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
        pokName.innerHTML = pokemon.name.toUpperCase();
        pokHeight.innerHTML = 'Height: ' + pokemon.height;
        pokType.innerHTML = 'Type: ' + pokemon.types.toUpperCase();
        pokImage.src = pokemon.imageUrl;
        modalClose.innerHTML = "Close";
        showModal();
        });
    };
  

    function getAll () {
      return pokemonList;
    }

  // Append items 
    modal.appendChild();
     modal.appendChild(pokName);
     modal.appendChild(pokHeight);
     modal.appendChild(pokType);
     modal.appendChild(imageContainer);
     imageContainer.appendChild(pokImage);

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
    
  };
}();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
  }); 
}); 





