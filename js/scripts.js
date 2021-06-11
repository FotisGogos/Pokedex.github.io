//lists and names of which of Pokemon
let  pokemonList = [{name:  "Bulbasaur",  height: 0.7,  types:  ['grass', 'poison']},
                    {name:  "Squirtl",  height: 0.5,  types:  ['water']},
                    {name:  "Slowpoke", height: 1.2,  types: ['psychic', 'water']}];

console.log(pokemonList);
//ends here

document.write("<br>")
for (let  i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
      document.write("<p style='text-align:center'>" +  pokemonList[i] ["name"] + " " + "(height:" + " " + pokemonList[i].height + ") - " + "Wow thas big!")
      document.createElement ("center")

  }
  else {
    document.write("<p style='text-align:center'>" +  pokemonList[i] ["name"] + " " + "(height:" + " " + pokemonList[i].height + ")"  )
    document.createElement ("center")

  }
}
