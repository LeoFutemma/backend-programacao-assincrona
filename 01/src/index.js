const express = require('express');
const controladores = require('./controladores');

const app = express();

app.get('/produtos', controladores.listarProdutos);
app.get('/produtos/:idProduto', controladores.detalharProduto);
app.get('/produtos/:idProduto/frete/:cep', controladores.calcularFrete);

app.listen(3000);