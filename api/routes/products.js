const express = require('express')
const router = express.Router();

/**
 * @desc   fetch all products
 * @route  GET  /products
 */
router.get('/', (req, res) => {
    res.send('Fetch all products from store!');
});

/**
 * @desc   Add a product
 * @route  POST  /products/add
 */
router.post('/add', (req, res) => {
    
    res.send('Product successfully added to store!');
});

/**
 * @desc   fetch a single product
 * @route  GET  /products/:id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.send('Product with that ID does not exist');
    } else {
        res.send('Fetch a single product from store!')
    }
});

/**
 * @desc   update a single product
 * @route  PATCH  /products/:id
 */
router.patch('/:id', (req, res) => {
    const product = req.params.id;
    if(!product){
        res.send('Product does not exist!');
    }
    res.send('Product successfully updated!');
});

/**
 * @desc   delete a single product
 * @route  DELETE /products/:id
 */
router.delete('/:id', (req, res) => {
    const product = req.params.id
    if(!product){
        res.send('Product does not exist!');
    }
    res.send('Product successfully deleted!');
});

module.exports = router;