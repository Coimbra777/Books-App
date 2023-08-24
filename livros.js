const express = require("express");
const router = express.Router();
const dbKnex = require("./data/db_config");

// Rota para listar todos os livros (GET)
router.get("/", async (req, res) => {
  try {
    const livros = await dbKnex("livros").orderBy("id", "desc");
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// Rota para criar um novo livro (POST)
router.post("/", async (req, res) => {
  console.log(req.body);
  const { titulo, autor, ano, foto } = req.body;

  if (!titulo || !autor || !ano || !foto) {
    res.status(400).json({
      msg: "Enviar título, autor, ano, foto",
    });
    return;
  }

  try {
    const novo = await dbKnex("livros").insert({
      titulo,
      autor,
      ano,
      foto,
    });
    res.status(201).json({ id: novo[0] });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Rota para atualizar o ano de um livro (PUT)
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { ano } = req.body;

  try {
    await dbKnex("livros").update({ ano }).where("id", id);
    res.status(200).json(); // 204 significa No Content
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// Rota para excluir um livro (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("livros").del().where({ id });
    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// Rota para filtrar livros por título ou autor (GET)
router.get("/filtro/:palavra", async (req, res) => {
  const palavra = req.params.palavra;
  try {
    const livros = await dbKnex("livros")
      .where("titulo", "like", `%${palavra}%`)
      .orWhere("autor", "like", `%${palavra}%`);

    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

module.exports = router;
