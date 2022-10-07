const router = require("express").Router();
const Pedido = require("../models/Pedidos");

router.post("/", async (req, res) => {
  let { nomeProduto, valor, cliente, quantidade, formaPagamento, observacao } =
    req.body;

  if (!nomeProduto) {
    res.status(422).json({ error: "Invalid nomeProduto" });
    return;
  } else {
    nomeProduto = nomeProduto.toLowerCase();
  }
  if (!valor) {
    res.status(422).json({ error: "Invalid valor" });
    return;
  }
  if (!cliente) {
    res.status(422).json({ error: "Invalid cliente" });
    return;
  } else {
    cliente = cliente.toLowerCase();
  }
  if (!quantidade) {
    res.status(422).json({ error: "Invalid quantidade" });
    return;
  }
  if (!formaPagamento) {
    res.status(422).json({ error: "Invalid formaPagamento" });
    return;
  } else {
    formaPagamento = formaPagamento.toLowerCase();
  }

  const pedido = {
    nomeProduto,
    valor,
    cliente,
    quantidade,
    formaPagamento,
    observacao,
  };

  try {
    await Pedido.create(pedido);
    res
      .status(201)
      .json({ message: "Pedido inserido no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Pedido.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/nome/:cliente", async (req, res) => {
  const clienteUrl = req.params.cliente.toLowerCase();
  console.log(clienteUrl);

  try {
    const cliente = await Pedido.findOne({ cliente: clienteUrl });

    if (!cliente) {
      res.status(422).json({ error: "Invalid cliente" });
      return;
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  let { nomeProduto, valor, cliente, quantidade, formaPagamento, observacao } =
    req.body;

  if (!nomeProduto) {
    res.status(422).json({ error: "Invalid nomeProduto" });
    return;
  } else {
    nomeProduto = nomeProduto.toLowerCase();
  }
  if (!valor) {
    res.status(422).json({ error: "Invalid valor" });
    return;
  }
  if (!cliente) {
    res.status(422).json({ error: "Invalid cliente" });
    return;
  } else {
    cliente = cliente.toLowerCase();
  }
  if (!quantidade) {
    res.status(422).json({ error: "Invalid quantidade" });
    return;
  }
  if (!formaPagamento) {
    res.status(422).json({ error: "Invalid formaPagamento" });
    return;
  } else {
    formaPagamento = formaPagamento.toLowerCase();
  }

  const pedido = {
    nomeProduto,
    valor,
    cliente,
    quantidade,
    formaPagamento,
    observacao,
  };

  try {
    const updatedPedido = await Pedido.updateOne({ _id: id }, pedido);

    if (updatedPedido.matchedCount === 0) {
      res.status(422).json({ error: "Invalid pedido" });
      return;
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
