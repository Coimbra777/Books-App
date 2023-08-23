const express = require("express");
const router = express.Router();

const dbKnex = require("./data/db_config");

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

module.exports = router;

// método post
router.post("/", async (req, res) => {
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
  } catch {
    res.status(400).json({ msg: error.message });
  }
});

// método put
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { preco } = req.body;

  try {
    await dbKnex("livros").update({ preco }).where("id", id);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// método delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("livros").del().where({ id });
    res.status(201).json();
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

// filtro por título
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

const cors = require("cors");
router.use(cors());
