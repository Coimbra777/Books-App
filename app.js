const express = require("express");
const livros = require("./livros");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/livros", livros);

app.get("/", (req, res) => {
  res.send("Olá... Bem vindo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em  http://localhost:${port}`);
});
