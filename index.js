require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors");

const PedidosRoutes = require("./routes/PedidosRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/pedidos", PedidosRoutes);

app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    "mongodb+srv://" +
      DB_USER +
      ":" +
      DB_PASSWORD +
      "@cluster0.ft2n9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectamos ao mongo!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
