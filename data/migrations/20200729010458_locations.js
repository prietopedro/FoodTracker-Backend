exports.up = function (knex) {
  return knex.schema.createTable("truck_locations", (tbl) => {
    tbl.string("location_zip_code").notNullable();
    tbl.string("location_city").notNullable();
    tbl.string("location_address").notNullable();
    tbl.string("location_state").notNullable();
    tbl.float("longitude");
    tbl.float("latitude");
    tbl
      .integer("truck_id")
      .unsigned()
      .references("id")
      .inTable("trucks")
      .notNullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("truck_locations");
};
