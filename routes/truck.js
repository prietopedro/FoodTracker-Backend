const express = require("express");
const TruckController = require("../controllers/truckController");
const validateTruck = require("../middleware/validateTruck");
const validateToken = require("../middleware/validateToken");
const createTruckRequirements = require("../middleware/createTruckRequirements");
const editTruckRequirements = require("../middleware/editTruckRequirements");
const createMenuItemRequirements = require("../middleware/createMenuItemRequirements");
const validateFood = require("../middleware/validateFood");
const editFoodItemRequirements = require("../middleware/editFoodItemRequirements");

const router = express.Router();

router.get("/", TruckController.getTrucks);
router.get("/:id", [validateTruck], TruckController.getTruckById);
router.use(validateToken);
router.post("/", [createTruckRequirements], TruckController.addTruck);
router.put(
  "/:id",
  [validateTruck, editTruckRequirements],
  TruckController.editTruck
);
router.delete("/:id", [validateTruck], TruckController.deleteTruck);

router.post("/favorites/:id", [validateTruck], TruckController.addToFavorites);
router.delete(
  "/favorites/:id",
  [validateTruck],
  TruckController.removeFromFavorites
);
router.post("/ratings/:id", [validateTruck], TruckController.rateTruck);
router.post(
  "/food/:id",
  [validateTruck, createMenuItemRequirements],
  TruckController.addFoodToTruck
);
router.put(
  "/food/:id",
  [validateFood, editFoodItemRequirements],
  TruckController.editFood
);
router.delete("/food/:id", [validateFood], TruckController.deleteFood);
module.exports = router;
