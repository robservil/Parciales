const { check } = require('express-validator')
const models = require('../../models')
const RestaurantCategory = models.RestaurantCategory

module.exports = {
  create: [
    check('name')
      .exists()
      .isString()
      .isLength({ min: 1, max: 50 })
      .trim()
      .custom(async (value) => {
        const otraCategoria = await RestaurantCategory.findOne({ where: { name: value } })
        if (otraCategoria) {
          throw new Error('La categoria ' + value + ' ya existe')
        }
      })
  ]
}
