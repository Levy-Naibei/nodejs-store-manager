const Product = require('../model/products');

/**
 * @desc    fetch all products from store
 */
exports.fetch_all_products = (req, res) => {
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
            if (!data) {
                res.status(404).json({message: 'Store empty!'});
            
            } else {
                res.status(200).json({
                    message:'All products from store!',
                    product: response
                });
            }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}

/**
 * @desc    create a product
 */
exports.create_product = (req, res) => {
    console.log(req.file);
    const product = new Product({
        // set the product's image, name and price( comes from the request)
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
}

/**
 * @desc    fetch a single product
 */
exports.fetch_single_product = (req, res) => {
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
}

/**
 * @desc    update a product
 */
exports.update_product = (req, res) => {
    const updatedProduct = {};
    for (let prod of req.body) {
        updatedProduct[prod.propName] = prod.value;
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
}

/**
 * @desc    delete a product
 */
exports.delete_product = (req, res) => {
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
}
