/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("livros", (tabel) => {
    tabel.increments();
    tabel.string("titulo", 80).notNullable();
    tabel.string("autor", 60).notNullable();
    tabel.integer("ano", 4).notNullable();
    tabel.string("foto", 100).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("livros");
};
