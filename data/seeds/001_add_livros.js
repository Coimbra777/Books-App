/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("livros")
    .del()
    .then(function () {
      return knex("livros").insert([
        {
          titulo: "Código Limpo: habilidades práticas do Agile Software",
          autor: "Robert Martin",
          ano: 2012,
          foto: "https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675",
        },
        {
          titulo: "Refatoração",
          autor: "Martin Fowler",
          ano: 1999,
          foto: "https://www.amazon.com.br/codificador-limpo-conduta-programadores-profissionais/dp/8576086476",
        },
        {
          titulo:
            "O codificador limpo: um código de conduta para programadores profissionais",
          autor: "Martin Fowler",
          ano: 2008,
          foto: "https://www.amazon.com.br/Refatora%C3%A7%C3%A3o-Aperfei%C3%A7oando-Design-C%C3%B3digos-Existentes/dp/8575227246",
        },
      ]);
    });
};
