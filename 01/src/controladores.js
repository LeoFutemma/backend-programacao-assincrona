const produtos = require('./bancodedados/produtos');
const { getStateFromZipcode } = require('utils-playground');

async function listarProdutos(req, res) {
  return res.send(produtos);
}


async function detalharProduto(req, res) {
  const { idProduto } = req.params;

  const produtoEncontrado = produtos.find((produto) => {
    return produto.id === Number(idProduto);
  })

  if (!produtoEncontrado) {
    return res.status(404).send("Produto não encontrado");
  }

  return res.json(produtoEncontrado);
}


async function calcularFrete(req, res) {
  const { idProduto, cep } = req.params;
  const fretePadrao = 0.12;
  const freteNordeste = 0.10;
  const freteSudeste = 0.15;
  let freteCalculado = 0;

  const uf = await getStateFromZipcode(cep);
  const produto = produtos.find((produto) => {
    return produto.id === Number(idProduto);
  })

  if (!produto) {
    return res.status(404).send("Produto não encontrado");
  }

  if (uf === "BA" || uf === "SE" || uf === "AL" || uf === "PE" || uf === "PB") {
    freteCalculado = produto.valor * freteNordeste;
  } else if (uf === "SP" || uf === "RJ") {
    freteCalculado = produto.valor * freteSudeste;
  } else {
    freteCalculado = produto.valor * fretePadrao;
  }

  const produtoCalculado = { produto, estado: uf, frete: freteCalculado }
  return res.json(produtoCalculado);
}

module.exports = { listarProdutos, detalharProduto, calcularFrete }