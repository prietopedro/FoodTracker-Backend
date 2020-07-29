const express = require("express");
const TruckController = require("../controllers/truckController");
const validateTruck = require("../middleware/validateTruck");
const createTruckRequirements = require("../middleware/createTruckRequirements");
const editTruckRequirements = require("../middleware/editTruckRequirements");
const createMenuItemRequirements = require("../middleware/createMenuItemRequirements");

const router = express.Router();

router.post("/", [createTruckRequirements], TruckController.addTruck);
router.get("/", TruckController.getTrucks);
router.get("/:id", [validateTruck], TruckController.getTruckById);
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
  TruckController.rateTruck
);
module.exports = router;
