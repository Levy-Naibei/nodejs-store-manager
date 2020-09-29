const express = require('express')
const Product = require('../model/products');
const multer = require('multer');

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

// initialize multer;p upload max is 3MB
const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 3,
    fileFilter: fileFilter
});

// instance of express Router
const router = express.Router();

/**
 * @desc   fetch all products
 * @route  GET  /products
 */
router.get('/', (req, res) => {
    Product.find()
        .select('_id name price productPic')
        .exec()
        .then(data => {
            const response = {
                count: data.length,
                products: data.map(product => {
                    return {
                        name: product.name,
                        price: product.price,
                        productPic: product.productPic,
                        _id: product._id,
                        request: {
                            type: 'GET',
                            url: `http://localhost:${process.env.PORT}/products/${product._id}`
                        }
                    };
                })
            }
            if (data) {
                res.status(200).json({
                message:'All products from store!',
                product: response
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
router.post('/', upload.single('productPic'), (req, res) => {
    console.log(req.file);
    const product = new Product({
        // set the product's name and price( comes from the request)
        name: req.body.name,
        price: req.body.price,
        productPic: req.file.path
    });
    // save the product and return response
    product.save()
        .then(data => {
            res.status(201).json({
                message: 'Product added successfully',
                product: {
                    name: data.name,
                    price: data.price,
                    productPic: data.productPic,
                    _id: data._id,
                    // request: {
                    //     type: 'GET',
                    //     url: `http://localhost:${process.env.PORT}/products/${data._id}`
                    // }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

/**
 * @desc   fetch a single product
 * @route  GET  /products/:id
 */
router.get('/:id', (req, res) => {
    Product.findById({_id: req.params.id})
        .select('_id name price productPic')
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json({
                    product: data,
                    // request: {
                    //     type: 'GET',
                    //     url: `http://localhost:${process.env.PORT}/products`
                    // }
                });
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
    const updatedProduct = {};
    for (const prod of req.body) {
        updatedProduct[prod.prodName] = prod.value
    }

    Product.update({_id: req.params.id}, {$set: updatedProduct})
        .exec()
        .then(data => {
            res.status(200).json({
                message: 'Product updated successfully!',
                request: {
                    type: 'GET',
                    url: `http:localhost:${process.env.PORT}/products/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

/**
 * @desc   delete a single product
 * @route  DELETE /products/:id
 */
router.delete('/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted successful!',
                request: {
                    type: 'POST',
                    url: `http://localhost:${process.env.PORT}/products/`,
                    body: {name: 'String', price: 'Number'}
                }
            })
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

module.exports = router;