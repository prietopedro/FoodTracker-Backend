const Truck = require("../models/Truck");
const UserFavoriteTruck = require("../models/UserFavoriteTruck");
const TruckRating = require("../models/TruckRating");
const addTruckRatings = require("../utils/addTruckRatings");
const addMenuItems = require("../utils/addMenuItems");
const FoodItem = require("../models/FoodItem");

const addTruck = async (req, res) => {
  try {
    const truck = await Truck.insert(req.truckData, req.locationData);
    const user_id = req.user ? req.user.id : null;
    await addTruckRatings([truck], user_id);
    await addMenuItems([truck]);
    return res.status(201).json(truck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const getTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find(req.query);
    const user_id = req.user ? req.user.id : null;
    await addTruckRatings(trucks, user_id);
    await addMenuItems(trucks);
    return res.status(200).json(trucks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const getTruckById = async (req, res) => {
  try {
    await addTruckRatings([req.truck], req.user.id);
    await addMenuItems([req.truck]);
    return res.status(200).json(req.truck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const editTruck = async (req, res) => {
  try {
    if (req.user.id !== req.truck.operator_id)
      return res
        .status(403)
        .json({ error: "Can not edit a truck not owned by you" });
    const updatedTruck = await Truck.update(
      req.truckData,
      req.locationData,
      req.truck.id
    );
    await addTruckRatings([updatedTruck], req.user.id);
    await addMenuItems([updatedTruck]);
    return res.status(200).json(updatedTruck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
const deleteTruck = async (req, res) => {
  try {
    if (req.user.id !== req.truck.operator_id)
      return res
        .status(403)
        .json({ error: "Can not delete a truck not owned by you" });
    await Truck.remove(req.truck.id);
    return res.status(200).json({ message: "Truck deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const addToFavorites = async (req, res) => {
  const favorite = await UserFavoriteTruck.find(req.truck.id, req.user.id);
  if (favorite)
    return res.status(400).json({ error: "Truck already in favorites" });
  await UserFavoriteTruck.insert(req.truck.id, req.user.id);
  const truck = await Truck.findById(req.truck.id);
  await addTruckRatings([truck], req.user.id);
  await addMenuItems([truck]);
  return res.status(201).json(truck);
};

const removeFromFavorites = async (req, res) => {
  const favorite = await UserFavoriteTruck.find(req.truck.id, req.user.id);
  if (!favorite)
    return res.status(400).json({ error: "Truck not in favorites" });
  await UserFavoriteTruck.remove(req.truck.id, req.user.id);
  return res.status(200).json({ message: "Removed" });
};

const rateTruck = async (req, res) => {
  try {
    if (!req.body.rating)
      return res.status(400).json({ error: "Rating field required" });
    const alreadyFavorited = await TruckRating.find(req.user.id, req.truck.id);
    if (alreadyFavorited)
      await TruckRating.update(req.user.id, req.truck.id, req.body.rating);
    else await TruckRating.insert(req.user.id, req.truck.id, req.body.rating);
    const truck = await Truck.findById(req.truck.id);
    await addTruckRatings([truck], req.user.id);
    await addMenuItems([truck]);
    return res.status(200).json(truck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const addFoodToTruck = async (req, res) => {
  try {
    const item = await FoodItem.insert(req.foodItem);
    return res.status(201).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const editFood = async (req, res) => {
  try {
    if (req.truck.operator_id !== req.user.id)
      return res.status(400).json({ error: "Must be owner to delete food" });
    await FoodItem.update(req.foodItem, req.food.id);
    const food = await FoodItem.findById(req.food.id);
    return res.status(200).json(food);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

const deleteFood = async (req, res) => {
  try {
    if (req.truck.operator_id !== req.user.id)
      return res.status(400).json({ error: "Must be owner to delete food" });
    await FoodItem.remove(req.food.id);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server mafunctioning" });
  }
};

module.exports = {
  addTruck,
  getTrucks,
  getTruckById,
  editTruck,
  deleteTruck,
  addToFavorites,
  removeFromFavorites,
  rateTruck,
  addFoodToTruck,
  deleteFood,
  editFood,
};
