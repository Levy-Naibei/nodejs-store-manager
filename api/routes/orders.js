const express = require('express')
const Order = require('../model/orders');
const Product = require('../model/products');
const checkJwt = require('../middleware/auth-setup');

// instance of express Router
const router = express.Router();

/**
 * @desc   fetch all orders or handles incoming GET requests to /orders
 * @route  GET  /orders
 */
router.get('/', checkJwt, (req, res) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(data => {
            const response = {
                count: data.length,
                orders: data.map(order => {
                    return {
                        product: order.product,
                        quantity: order.quantity,
                        _id: order._id,
                        request: {
                            type: 'GET',
                            url: `http://localhost:${process.env.PORT}/orders/${order._id}`
                        }
                    };
                })
            }
            if (data) {
                res.status(200).json({
                message:'All placed orders!',
                orders: response
            });
            } else {
                res.status(404).json({message: 'No orders placed!'});
            }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
});

/**
 * @desc   place an order
 * @route  POST  /orders
 * */
router.post('/', checkJwt, (req, res) => {
    Product.findById({_id: req.params.productId})
        .then(product => {
            // check whether the product exist
            if(!product) {
                return res.status(404),json({
                    message: 'Product not found!'
                })
            }
            const order = new Order({
                // set the order's productId and quantity( comes from the request)
                product: req.body.productId,
                quantity: req.body.quantity
            });
            // save order
            return order.save();
        })
        .select('product quantity _id')
        // .exec()
        .then(data => {
            res.status(201).json({
                message: 'Order placed successfully!',
                createdOrder: {
                    // body: {productId: ID, quantity: 'Number'} - POSTMAN
                    product: data.product,
                    quantity: data.quantity,
                    _id: data._id,
                    // request: {
                    //     type: 'GET',
                    //     url: `http://localhost:${process.env.PORT}/orders/${data._id}`
                    // }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});

/**
 * @desc   fetch a single order
 * @route  GET  /orders/:id
 */
router.get('/:id', checkJwt, (req, res) => {
    Order.findById({_id: req.params.id})
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json({
                    order: data,
                    // request: {
                    //     type: 'GET',
                    //     url: `http://localhost:${process.env.PORT}/orders`
                    // }
                });
            } else {
                res.status(404).json({message: 'No order with that ID!'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});

/**
 * @desc   delete a single order
 * @route  DELETE /orders/:id
 */
router.delete('/:id', checkJwt, (req, res) => {
    Order.deleteOne({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted successfully!',
                // request: {
                //     type: 'POST',
                //     url: `http://localhost:${process.env.PORT}/orders`,
                //     body: {productId: ID, quantity: 'Number'}
                // }
            })
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

module.exports = router;