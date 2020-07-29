const db = require("../data/config");

const findById = (id) => {
  return db("trucks as t")
    .where({ id })
    .join("truck_locations as tl", "tl.truck_id", "=", "t.id")
    .first();
};

const find = (params) => {
  const query = db("trucks as t").join(
    "truck_locations as tl",
    "t.id",
    "=",
    "tl.truck_id"
  );
  if (params.isOpen === "true") {
    const date = new Date();
    const minutes = date.getHours() * 60 + date.getMinutes();
    query
      .where("t.truck_arrival_time", "<", minutes)
      .andWhere("t.truck_departure_time", ">", minutes);
  }
  if (params.operatorId) {
    console.log("RUNNING");
    query.where("t.operator_id", +params.operatorId);
  }
  if (params.location)
    query
      .where("tl.location_city", params.location)
      .orWhere("tl.location_zip_code", params.location)
      .orWhere("tl.location_address", params.location)
      .orWhere("tl.location_state", params.location);
  return query;
};

const insert = async (truckData, location) => {
  const [truck_id] = await db("trucks").insert(truckData);
  await db("truck_locations").insert({ ...location, truck_id });
  return findById(truck_id);
};

const update = async (truckData, location, id) => {
  await db("trucks").update(truckData).where({ id });
  await db("truck_locations").update(location).where({ truck_id: id });
  return findById(id);
};

const remove = (id) => {
  return db("trucks").delete().where({ id });
};

module.exports = {
  findById,
  find,
  update,
  insert,
  remove,
};
