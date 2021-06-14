function printPokemonList(list) {
  document.write("<br>")
  for (let  i = 0; i < list.length; i++) {
    if (list[i].height > 1) {
        document.write("<p style='text-align:center'>" +  list[i] ["name"] + " " + "(height:" + " " + list[i].height + ") - " + "Wow thas big!")
        document.createElement ("center")

    }
    else {
      document.write("<p style='text-align:center'>" +  list[i] ["name"] + " " + "(height:" + " " + list[i].height + ")"  )
      document.createElement ("center")

    }
  }
}

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

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonList = pokemonRepository.getAll()
pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + pokemon.height );
});

console.log(pokemonRepository.getAll())
pokemonRepository.add({name: "Mew", height: 1.3, types: [ "poison" ]});
console.log(pokemonRepository.getAll())
pokemonRepository.add("asd");
console.log(pokemonRepository.getAll())
