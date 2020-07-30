const createMenuItemRequirements = async (req, res, next) => {
  try {
    const required = ["menu_item_name"];
    for (requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    if (req.user.id !== req.truck.operator_id) {
      return res
        .status(400)
        .json({ error: "Must be the owner to add a menu item" });
    }
    req.foodItem = {
      menu_item_name: req.body.menu_item_name,
      menu_item_description: req.body.menu_item_description || null,
      menu_item_photo: req.body.menu_item_photo || null,
      menu_item_price: req.body.menu_item_price || null,
      truck_id: req.truck.id,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

module.exports = createMenuItemRequirements;
