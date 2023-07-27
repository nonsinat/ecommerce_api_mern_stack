const express = require('express')
const {createProduct,getAllProduct,getOneProduct,productPhoto,deleteProduct,updateProduct,productFilter} = require('../controllers/product_controller')
const router = express.Router()

router.route('/create-product').post(createProduct)
router.route('/get-all-product').get(getAllProduct)
router.route('/get-one-product/:id').get(getOneProduct)
router.route('/product-photo/:pid').get(productPhoto)
router.route('/delete-product/:id').get(deleteProduct)
router.route('/update-product/:pid').put(updateProduct)
router.route('/product-filter').post(productFilter)

module.exports = router; 