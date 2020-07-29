const createTruckRequirements = async (req, res, next) => {
  try {
    const required = [
      "truck_name",
      "truck_departure_time",
      "truck_arrival_time",
      "location_zip_code",
      "location_city",
      "location_address",
      "location_state",
    ];
    for (requiredField of required) {
      if (!req.body[requiredField]) {
        return res
          .status(400)
          .json({ error: `${requiredField} is a requiredField` });
      }
    }
    if (req.user.user_role !== "operator") {
      return res.status(400).json({ error: "User must be an operator" });
    }
    req.truckData = {
      truck_name: req.body.truck_name.toLowerCase(),
      truck_departure_time: req.body.truck_departure_time,
      truck_arrival_time: req.body.truck_arrival_time,
      truck_cuisine_type: req.body.truck_cuisine_type.toLowerCase() || null,
      truck_description: req.body.truck_description.toLowerCase() || null,
      truck_photo: req.body.truck_photo || null,
      operator_id: req.user.id,
    };
    req.locationData = {
      location_zip_code: req.body.location_zip_code,
      location_city: req.body.location_city.toLowerCase(),
      location_address: req.body.location_address.toLowerCase(),
      location_state: req.body.location_state.toLowerCase(),
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

module.exports = createTruckRequirements;
