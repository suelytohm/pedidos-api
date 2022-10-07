const mongoose = require("mongoose");

const Pedido = mongoose.model("Pedido", {
  nomeProduto: String,
  valor: Number,
  cliente: String,
  quantidade: Number,
  formaPagamento: String,
  observacao: String,
});

module.exports = Pedido;
