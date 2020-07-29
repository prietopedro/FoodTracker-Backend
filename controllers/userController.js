const User = require("../models/User");
var jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const user = await User.insert(req.body);
    var token = jwt.sign(
      { id: user.id, user_role: user.user_role },
      process.env.SECRET_JWT
    );
    delete user.password;
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const loginUser = (req, res) => {
  try {
    var token = jwt.sign(
      { id: req.user.id, user_role: req.user.user_role },
      process.env.SECRET_JWT
    );
    delete req.user.password;
    return res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
const getUser = (req, res) => {
  delete req.user.password;
  return res.status(200).json(req.user);
};
const editUser = async (req, res) => {
  try {
    const edit = {
      username: req.body.username || req.user.username,
      user_email: req.body.user_email || req.user.user_email,
      user_first_name: req.body.user_first_name || req.user.user_first_name,
      user_last_name: req.body.user_last_name || req.user.user_last_name,
      avatar_url: req.body.avatar_url || req.user.avatar_url,
    };
    const user = await User.update(edit, req.user.id);
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.remove(req.user.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser,
  deleteUser,
};
