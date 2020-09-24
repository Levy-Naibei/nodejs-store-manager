const express = require('express')
const Product = require('../model/products');

// instance of express Router
const router = express.Router();

/**
 * @desc   fetch all products
 * @route  GET  /products
 */
router.get('/', (req, res) => {
    Product.find()
           .exec()
           .then(data => {
               if (data) {
                    res.status(200).json({
                    message:'All products from store!',
                    product: data
                });
               } else {
                   res.status(404).json({message: 'Store empty!'});
               }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
});

/**
 * @desc   Add a product
 * @route  POST  /products/add
 */
router.post('/', (req, res) => {
    const product = new Product ({
        // set the product's name and price( comes from the request)
        name: req.body.name,
        price: req.body.price
    });
    // save the product
    product.save((err, product) => {
        if(err) {
            res.send(err)
        }
        res.status(201).json({
            message:'Product successfully added to store!',
            product: product
        });
    });
});

/**
 * @desc   fetch a single product
 * @route  GET  /products/:id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.findById({_id: id})
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: 'No product with that ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
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
    const id = req.params.id
    Product.remove({_id: id}).exec()
            .then(result => {
                res.status(200).json({
                    message: 'Delete successful!',
                    result: result
                })
            })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

module.exports = router;