const express = require("express");

const app = express();
const port = 3001;

const livros = require("./livros");

app.use("/livros", livros);

// Middleware para análise do corpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
function log(req, res, next) {
  console.log(`...Acessado em ${new Date()}`);
  next();
}

app.get("/transfere", log, (req, res) => {
  res.send("Ok! Valor transferido com sucesso...!");
});

app.get("/", (req, res) => {
  res.send("Olá... Bem vindo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em  http://localhost:${port}`);
});
