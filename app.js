const express = require("express");

const app = express();
const port = 3001;

const livros = require("./livros");

app.use("/livros", livros);

// Middleware
const log = (req, res, next) => {
  console.log(`...Acessado em ${new Date()}`);
  next();
};

app.get("/transfere", log, (req, res) => {
  res.send("Ok! Valor transferido com sucesso...!");
});

app.get("/", (req, res) => {
  res.send("Olá... Bem vindo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em  http://localhost:${port}`);
});
