exports.up = function (knex) {
  return knex.schema.createTable("trucks", (tbl) => {
    tbl.increments("id");
    tbl.string("truck_name").notNullable();
    tbl.integer("truck_departure_time");
    tbl.integer("truck_arrival_time");
    tbl.string("truck_cuisine_type");
    tbl.string("truck_description");
    tbl.string("truck_photo");
    tbl
      .integer("operator_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("trucks");
};
