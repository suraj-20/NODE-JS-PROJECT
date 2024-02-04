const MealType = require("../models/mealType");

module.exports.mealTypes = async (req, res) => {
  const { mealName, mealImageURL } = req.body;

  if (!mealName || !mealImageURL) {
    return res.status(404).json({ msg: "All Fields are required.." });
  }

  const result = await MealType.create({
    mealName,
    mealImageURL,
  });

  return res.status(200).json({ msg: "Meal Tpye added succesfull.", result });
};

module.exports.handleDeleteMealType = async (req, res) => {
  const deletedMealType = await MealType.findByIdAndDelete(req.params.id);

  return res.json({ msg: "Deleted Successfully", deletedMealType });
};
