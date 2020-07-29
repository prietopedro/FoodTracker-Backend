const editTruckRequirements = (req, res, next) => {
  req.truckData = {
    truck_name: req.body.truck_name || req.truck.truck_name,
    truck_departure_time:
      req.body.truck_departure_time || req.truck.truck_departure_time,
    truck_arrival_time:
      req.body.truck_arrival_time || req.truck.truck_arrival_time,
    truck_cuisine_type:
      req.body.truck_cuisine_type || req.truck.truck_cuisine_type,
    truck_description:
      req.body.truck_description || req.truck.truck_description,
    truck_photo: req.body.truck_photo || req.truck.truck_photo,
    price_range: req.body.price_range || req.truck.price_range,
  };
  req.locationData = {
    location_zip_code:
      req.body.location_zip_code || req.truck.location_zip_code,
    location_city: req.body.location_city || req.truck.location_city,
    location_address: req.body.location_address || req.truck.location_address,
    location_state: req.body.location_state || req.truck.location_state,
    latitude: req.body.latitude || req.truck.latitude,
    longitude: req.body.longitude || req.truck.longitude,
  };
  next();
};

module.exports = editTruckRequirements;
