const { listarPokemons, detalharPokemon } = require('utils-playground');

async function listarOsPokemons(req, res) {
  const pokemon = await listarPokemons();

  return res.json(pokemon.results);
}


async function detalharUmPokemon(req, res) {
  const { nome } = req.params;
  const { id, name, height, weight, base_experience, forms, abilities, species } = await detalharPokemon(nome);

  const pokemonEncontrado = { id, name, height, weight, base_experience, forms, abilities, species }

  return res.json(pokemonEncontrado);
}

module.exports = { listarOsPokemons, detalharUmPokemon }