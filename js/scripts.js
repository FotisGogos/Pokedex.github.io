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

  function showModal(item) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

      // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
      }
    });
    
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
          hideModal();
      }
    });
  
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'height : ' + item.height;

    let myImage = document.createElement('img');
    myImage.classList.add('modal-img');
    myImage.setAttribute("src", item.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(myImage);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');


  }


  //Hide Modal Event Listeners

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    })
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
    showModal: showModal,
    hideModal: hideModal
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
  }); 
}); 





