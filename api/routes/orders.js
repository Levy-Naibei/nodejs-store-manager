const express = require('express');
const checkJwt = require('../middleware/auth-setup');
const orderController = require('../controller/orders');


// instance of express Router
const router = express.Router();

/**
 * @desc   fetch all orders or 
 * handles incoming GET requests to /orders endpoint
 * @route  GET  /orders
 */
router.get('/', checkJwt, orderController.fetch_all_orders);

/**
 * @desc   place an order by productID and quantity
 * @route  POST  /orders
 * */
router.post('/', checkJwt, orderController.place_order);

/**
 * @desc   fetch a single order
 * @route  GET  /orders/:id
 */
router.get('/:id', checkJwt, orderController.fetch_single_order);

/**
 * @desc   delete a single order
 * @route  DELETE /orders/:id
 */
router.delete('/:id', checkJwt, orderController.delete_placed_order);

module.exports = router;