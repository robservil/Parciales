'use strict'
const models = require('../models')
const RestaurantCategory = models.RestaurantCategory

exports.indexRestaurantCategory = async function (req, res) {
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    res.json(restaurantCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.create = async function (req, res) {
  const newCategory = RestaurantCategory.build(req.body)
  try {
    const category = await newCategory.save()
    res.json(category)
  } catch (err) {
    res.status(500).send(err)
  }
}
