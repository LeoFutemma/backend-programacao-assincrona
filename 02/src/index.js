const express = require('express');
const pokemon = require('./controladores');

const app = express();

app.get('/pokemon', pokemon.listarOsPokemons);
app.get('/pokemon/:nome', pokemon.detalharUmPokemon);

app.listen(8000);