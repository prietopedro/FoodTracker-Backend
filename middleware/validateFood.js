const Truck = require("../models/Truck");
const FoodItem = require("../models/FoodItem");

const validateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await FoodItem.findById(id);
    if (!food)
      return res.status(400).json({ error: "Food not found with that id" });
    const truck = await Truck.findById(food.truck_id);
    req.truck = truck;
    req.food = food;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

module.exports = validateFood;
