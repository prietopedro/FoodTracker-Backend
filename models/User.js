const db = require("../data/config");

const findById = (id) => {
  return db("users").where({ id }).first();
};

const findByEmail = (user_email) => {
  return db("users").where({ user_email }).first();
};
const findByUsername = (username) => {
  return db("users").where({ username }).first();
};

const insert = async (user) => {
  const id = await db("users").insert(user).returning("id");
  console.log(id);
  return findById(id.id);
};
const update = async (user, id) => {
  await db("users").update(user).where({ id }).select("*");
  return findById(id);
};

const remove = (id) => {
  return db("users").delete().where({ id });
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove,
};
