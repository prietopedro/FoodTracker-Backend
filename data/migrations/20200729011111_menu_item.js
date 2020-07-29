exports.up = function (knex) {
  return knex.schema.createTable("menu_item", (tbl) => {
    tbl.increments("id");
    tbl.string("menu_item_name").notNullable();
    tbl.string("menu_item_description");
    tbl.string("menu_item_photo");
    tbl.integer("menu_item_price");
    tbl
      .integer("truck_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("menu_item");
};
