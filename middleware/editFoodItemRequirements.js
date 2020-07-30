const editFoodItemRequirements = (req, res, next) => {
  req.foodItem = {
    menu_item_name: req.body.menu_item_name || req.food.menu_item_name,
    menu_item_description:
      req.body.menu_item_description || req.food.menu_item_description,
    menu_item_price: req.body.menu_item_price || req.menu_item_price,
    menu_item_photo: req.body.menu_item_photo || req.menu_item_photo,
  };
  next();
};

module.exports = editFoodItemRequirements;
