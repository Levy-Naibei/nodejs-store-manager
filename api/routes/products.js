const express = require('express');
const multer = require('multer');
const checkJwt = require('../middleware/auth-setup');
const productController = require('../controller/products');

// instance of express Router
const router = express.Router();

// define how to upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// filter according to type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// initialize multer; upload max is 3MB
const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 3,
    fileFilter: fileFilter
});

/**
 * @desc   fetch all products
 * @route  GET  /products
 */
router.get('/', productController.fetch_all_products);

/**
 * @desc   Add a product
 * @route  POST  /products/add
 */
router.post('/',
    checkJwt,
    upload.single('productPic'),
    productController.create_product
);

/**
 * @desc   fetch a single product
 * @route  GET  /products/:id
 */
router.get('/:id', checkJwt, productController.fetch_single_product);

/**
 * @desc   update a single product
 * @route  PATCH  /products/:id
 */
router.patch('/:id', checkJwt, productController.update_product);

/**
 * @desc   delete a single product
 * @route  DELETE /products/:id
 */
router.delete('/:id', checkJwt, productController.delete_product);

module.exports = router;