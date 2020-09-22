const express = require('express')
const router = express.Router();

/**
 * @desc   fetch all orders
 * @route  GET  /products
 */
router.get('/', (req, res) => {
    res.send('Fetch all orders from store!');
});

/**
 * @desc   add an order
 * @route  POST /orders/add
 */
router.post('/add', (req, res) => {
    
    res.send('Order successfully added to store!');
});

/**
 * @desc   fetch a single order
 * @route  GET /orders/:id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.send('Order with that ID does not exist');
    } else {
        res.send('Fetch a single Order from store!')
    }
});

/**
 * @desc   delete an order
 * @route  DELETE /orders/:id
 */
router.delete('/:id', (req, res) => {
    const order = req.params.id
    if(!order){
        res.send('Order does not exist!');
    }
    res.send('Order successfully deleted!');
});

module.exports = router;