const express = require('express');
const {deleteCategory,createProduct,updateCategory,getAllCategory,getOneCategory} = require('../controllers/category_controller')
const router = express.Router();

router.route('/create-category').post(createProduct)
router.route('/update-category/:id').put(updateCategory)
router.route('/get-all-category').get(getAllCategory)
router.route('/get-single-category/:slug').get(getOneCategory)
router.route('/delete-category/:id').delete(deleteCategory)

module.exports = router;