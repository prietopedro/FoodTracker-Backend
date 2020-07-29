exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username").unique().notNullable();
    tbl.string("password").notNullable();
    tbl.string("user_email").unique().notNullable();
    tbl.string("user_first_name").notNullable();
    tbl.string("user_last_name").notNullable();
    tbl.string("user_role").notNullable();
    tbl.string("avatar_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
