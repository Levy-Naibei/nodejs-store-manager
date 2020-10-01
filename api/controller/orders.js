const Product = require('../model/products');
const Order = require('../model/orders');

/**
 * @desc    placing order(s) routes
 */
 exports.fetch_all_orders = (req, res) => {
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
}

/**
 * @desc    place an order
 */
exports.place_order = (req, res) => {
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
}

/**
 * @desc    fetch a single placed order
 */
exports.fetch_single_order = (req, res) => {
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
}

/**
 * @desc    delete a placed order
 */
exports.delete_placed_order = (req, res) => {
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
}
